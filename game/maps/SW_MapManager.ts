/** TODO LIST 
 * 1. Have a generic map manager with a simple gameobject as the target then make the sw version with the player passed and a game scene.
 * 2. See if we could have a global colliders (layerForeground1_collider, entrances_collider...) instead of making one per submap. This would divide the number of colliders up to 4
*/

import { SW_CST } from "~/game/SW_CST";
import SW_GameScene from "~/game/scenes/SW_GameScene";
import { SW_Player } from "~/game/characters/players/SW_Player";
import SW_Entrance from "~/game/gameObjects/SW_Entrance";
import { SW_TiledObjectProperties } from "~/game/SW_Utils";
import { SW_DIRECTIONS, SW_DIRECTION } from "~/game/characters/SW_CharacterMovementComponent";

const depthBackground = 1;
const depthPlayer = 2;
const depthForeground = 3;

export declare type SW_SubMapPlayerSpawnData = {
    position: Phaser.Math.Vector2,
    startDirection: SW_DIRECTION
}

export declare type SW_SubMapData = {
    subMapX: number;
    subMapY: number;

    /** The tiled sub map */
    subMap: Phaser.Tilemaps.Tilemap;

    /** Tileset to use for the tile assets */
    tileset: Phaser.Tilemaps.Tileset;

    /** All entrances to join a new map (ex: a door from a building, an path etc...) */
    entrances?: Phaser.Physics.Arcade.StaticGroup | undefined;

    /** Any object the player can interact with */
    interactableObjects?: Phaser.Physics.Arcade.StaticGroup | undefined;

    layerCollision?: Phaser.Tilemaps.TilemapLayer | undefined;
    layerGround?: Phaser.Tilemaps.TilemapLayer | undefined;
    layerBackground1?: Phaser.Tilemaps.TilemapLayer | undefined;
    layerBackground2?: Phaser.Tilemaps.TilemapLayer | undefined;
    layerForeground1?: Phaser.Tilemaps.TilemapLayer | undefined;
    layerForeground2?: Phaser.Tilemaps.TilemapLayer | undefined;

    layerCollision_collider?: Phaser.Physics.Arcade.Collider | undefined;
    entrances_collider?: Phaser.Physics.Arcade.Collider | undefined;
    interactableObjects_collider?: Phaser.Physics.Arcade.Collider | undefined;
};

export class SW_MapManager extends Phaser.Events.EventEmitter {
    private scene: SW_GameScene;

    private player: SW_Player;

    /** All the submaps that are spawned and visible for the target. This map is dynamically updated with the target position changes*/
    private spawnedSubMapDataMap: Map<string, SW_SubMapData>;

    /** All the submaps that are ready to be spawned but in the queue. Each update will spawn a part of the submpas until they are fully spawned. 
     * This prevent freezes in a frame since spawing tiles/images is not async */
    private spawnSubMapQueue: SW_SubMapData[] = [];

    /** All the submaps whose assets are preloading. Once their assets are loaded, the submap will be either spawned or added to the submapQueue */
    private preloadingSubMaps: string[];

    /** All the submap filenames that can be spawned in this world. */
    private subMapNamesMap: Map<string, string>;

    private prevLocalPercentMapX: number = 0;
    private prevLocalPercentMapY: number = 0;

    private currentLocalPercentMapX: number = 0;
    private currentLocalPercentMapY: number = 0;

    private currentSubMapX: number = 0;
    private currentSubMapY: number = 0;
  
    private subMapWidth: number = 1040;
    private subMapHeight: number = 880;
  
    private subMapMinX: number = 0;
    private subMapMinY: number = 0;
    private subMapMaxX: number = 0;
    private subMapMaxY: number = 0;

    private subMapThreshold: number = SW_CST.MAP.SUBMAP_THRESHOLD;

    private worldName: string;
    private previousWorldName: string;

    private _isInitialized: boolean = false;

    constructor (player: SW_Player, worldName: string, previousWorldName: string) {
        super();

        this.player = player;
        this.player.setDepth(depthPlayer);

        this.scene = player.scene as SW_GameScene;
        this.previousWorldName = previousWorldName;
        this.worldName = worldName;

        this.subMapNamesMap = new Map<string, string>();
        this.spawnedSubMapDataMap = new Map<string, SW_SubMapData>();
        this.preloadingSubMaps = [];
        this.spawnSubMapQueue = [];

        this.initWorld();
    }

    public isInitialized(): boolean {
        return this._isInitialized;
    }
    
    private initWorld(): void {
        this._isInitialized = false
        this.clear();

        if (this.worldName) {
            this.preloadWorldAssets();
        }
        else {
            this.subMapWidth = 0;
            this.subMapHeight = 0;
            this.subMapMaxX = 0;
            this.subMapMaxY = 0;
            console.error("SW_MapManager::initWorld - Invalid world data");
        }
    }

    private preloadWorldAssets(): void {
        if (this.scene.cache.json.exists(this.worldName)) {
            this.createWorld();
        }
        else {
            this.scene.load.once(`${Phaser.Loader.Events.FILE_KEY_COMPLETE}json-${this.worldName}`, this.createWorld, this);
            this.scene.load.json(`${this.worldName}`, `/game/assets/maps/${this.worldName}/${this.worldName}.world`);
            this.scene.load.start();
        }
    }

    private createWorld(): void {
        const isWorldValid = this.setupWorldMaps();
        if (isWorldValid) {
            this.once("playerPositionInitialized", this.onPlayerPositionInitialized);
            this.initPlayerPosition(this.previousWorldName);
        }
    }

    private onPlayerPositionInitialized(): void {
        this.initSubMaps();
        this.update();

        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        
        this.emit("initialized");
        this._isInitialized = true;
    }

    /** Read the submap names from the world file. Their names will be saved based on their map coordinatates.
     * So we can preload them when it's needed
     */
    private setupWorldMaps(): boolean {
        const worldData = this.scene.cache.json.get(this.worldName);
        const worldMaps = worldData ? worldData.maps : [];

        if (worldMaps.length <= 0) {
            console.error("SW_MapManager::setupWorldMaps - World provided but the data are invalid");
            this.subMapWidth = 0;
            this.subMapHeight = 0;
            this.subMapMaxX = 0;
            this.subMapMaxY = 0;
            return false;
        }

        this.subMapWidth = worldMaps[0].width; // Assumme that all submaps have the same dimensions
        this.subMapHeight = worldMaps[0].height; // Assumme that all submaps have the same dimensions
        this.subMapMinX = Infinity;
        this.subMapMinY = Infinity;
        this.subMapMaxX = -Infinity;
        this.subMapMaxY = -Infinity;

        for (const subMap of worldData.maps) {
            if ((subMap.width != this.subMapWidth) || (subMap.height != this.subMapHeight)) {
                console.error("SW_MapManager::setupWorldMaps - Submaps don't have the same dimensions!");
            }

            const subMapX = Math.floor(subMap.x / subMap.width);
            const subMapY = Math.floor(subMap.y / subMap.height);

            this.subMapMinX = Math.min(this.subMapMinX, subMapX);
            this.subMapMinY = Math.min(this.subMapMinY, subMapY);
            this.subMapMaxX = Math.max(this.subMapMaxX, subMapX);
            this.subMapMaxY = Math.max(this.subMapMaxY, subMapY);

            this.subMapNamesMap.set(this.getSubMapId(subMapX, subMapY), subMap.fileName);
        }

        this.scene.physics.world.setBounds(0, 0, this.subMapWidth * (this.subMapMaxX + 1), this.subMapHeight * (this.subMapMaxY + 1));
        return true;
    }

    private initSubMaps(): void {
        this.updatePlayerData();

        const shouldAsyncLoad = false;
        this.trySpawnSubMap(this.currentSubMapX, this.currentSubMapY, shouldAsyncLoad);

        if (this.isPlayerNearSubMapRight()) {
            this.trySpawnSubMapOnRight(shouldAsyncLoad);
        }
        else if (this.isPlayerNearSubMapLeft()) {
            this.trySpawnSubMapOnLeft(shouldAsyncLoad);
        }
        
        if (this.isPlayerNearSubMapBottom()) {
            this.trySpawnSubMapOnBottom(shouldAsyncLoad);
        }
        else if (this.isPlayerNearSubMapTop()) {
            this.trySpawnSubMapOnTop(shouldAsyncLoad);
        }
    }

    public initPlayerPosition(entranceName: string): void {
        this.once("playerSpawnPositionFound", () => { this.emit("playerPositionInitialized"); }, this);

        this.player.setPosition(0, 0);
        this.player.setDirection(SW_DIRECTIONS.Down);

        for (let i = 0; i <= this.subMapMaxX; ++i) {
            for (let j = 0; j <= this.subMapMaxY; ++j) {
                const subMapName = this.getSubMapName(i, j);
                if (!subMapName) {
                    console.warn(`SW_MapManager::initPlayerPosition - subMapName not found at (${i},${j})`);
                    continue;
                }
                this.scene.load.json(`${subMapName}`, `/game/assets/maps/${this.worldName}/${subMapName}`);
            }
        }

        this.scene.load.start();
        this.scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
            const clearPreloadJsonMaps = () => {
                for (let i = 0; i <= this.subMapMaxX; ++i) {
                    for (let j = 0; j <= this.subMapMaxY; ++j) {
                        const subMapName = this.getSubMapName(i, j);
                        if (subMapName) {
                            this.scene.cache.json.remove(subMapName);
                        }
                    }
                }
            };

            for (let i = 0; i <= this.subMapMaxX; ++i) {
                for (let j = 0; j <= this.subMapMaxY; ++j) {
                    const subMapName = this.getSubMapName(i, j);
                    if (!subMapName) {
                        console.warn(`SW_MapManager::initPlayerPosition - subMapName not found at (${i},${j})`);
                        continue;
                    }

                    const subMapDataJson = this.scene.cache.json.entries.get(subMapName);
                    if (!subMapDataJson) {
                        console.warn(`SW_MapManager::initPlayerPosition - subMapDataJson not associated to (${subMapName})`);
                        continue;
                    }

                    const layerWithEntrances = subMapDataJson.layers.find((layerData: any) => {
                        return layerData.name == "Characters";
                    });

                    if (!layerWithEntrances) {
                        continue;
                    }

                    for (const layerObject of layerWithEntrances.objects) {
                        if (layerObject.name == "Spawner") {
                            const propertyArray = layerObject.properties as SW_TiledObjectProperties[];

                            const worldNameProperty = propertyArray.find((objectProperties: SW_TiledObjectProperties) => {
                                return objectProperties.name == "worldName";
                            });

                            if (worldNameProperty && worldNameProperty.value == entranceName) {
                                const directionProperty = propertyArray.find((objectProperties: SW_TiledObjectProperties) => {
                                    return objectProperties.name == "startDirection";
                                });

                                const spawnX = (layerObject.x as number) + i * this.subMapWidth;
                                const spawnY = (layerObject.y as number) + j * this.subMapHeight;
                                const startDirection = directionProperty ? directionProperty.value : SW_DIRECTIONS.Down;

                                this.player.setPosition(spawnX, spawnY);
                                this.player.setDirection(startDirection);

                                clearPreloadJsonMaps();
                                this.emit("playerSpawnPositionFound");
                                return;
                            }
                        }
                    }
                }
            }
            clearPreloadJsonMaps();
        }, this);
    }

    private hasSubMap(subMapX: number, subMapY: number): boolean {
        const subMapId = this.getSubMapId(subMapX, subMapY);
        return this.spawnedSubMapDataMap.has(subMapId) || this.isPreloadingSubMap(subMapX, subMapY);
    }

    private isPreloadingSubMap(subMapX: number, subMapY: number): boolean {
        const subMapId = this.getSubMapId(subMapX, subMapY);
        const index = this.preloadingSubMaps.findIndex((id: string) => {
            return (id === subMapId);
        });
        return (index >= 0);
    }

    private isSubMapCoordValid(subMapX: number, subMapY: number): boolean {
        return (subMapX >= this.subMapMinX) && (subMapX <= this.subMapMaxX) && (subMapY >= this.subMapMinY) && (subMapY <= this.subMapMaxY);
    }

    private getSubMapName(subMapX: number, subMapY: number): string | undefined {
        const subMapId = this.getSubMapId(subMapX, subMapY);
        return this.subMapNamesMap.get(subMapId);
    }

    private getSubMapId(subMapX: number, subMapY: number): string {
        return `${subMapX}_${subMapY}`;
    }

    private trySpawnSubMap(subMapX: number, subMapY: number, shouldAsyncSpawn: boolean = true): void {
        if (!this.isSubMapCoordValid(subMapX, subMapY) || this.hasSubMap(subMapX, subMapY)) {
            return;
        }

        const subMapName = this.getSubMapName(subMapX, subMapY);
        if (!subMapName) {
            console.warn("SW_MapManager::trySpawnSubMap - subMapName not found");
            return;
        }

        if (this.scene.cache.tilemap.exists(subMapName)) {
            this.spawnSubMap(subMapName, subMapX, subMapY, shouldAsyncSpawn);
        }
        else {
            const subMapId = this.getSubMapId(subMapX, subMapY); 
            this.preloadingSubMaps.push(subMapId);

            this.scene.load.tilemapTiledJSON(`${subMapName}`, `/game/assets/maps/${this.worldName}/${subMapName}`);
            this.scene.load.start();
            this.scene.load.once(`${Phaser.Loader.Events.FILE_KEY_COMPLETE}tilemapJSON-${subMapName}`, (key: string, type: string, data: any) => {
                this.onTilemapJsonLoaded(subMapX, subMapY, shouldAsyncSpawn);
            }, this);
        }
    }

    private onTilemapJsonLoaded(subMapX: number, subMapY: number, shouldAsyncSpawn: boolean): void {
        if (!this.isPreloadingSubMap(subMapX, subMapY)) {
            return;
        }

        const subMapName = this.getSubMapName(subMapX, subMapY);
        if (!subMapName) {
            console.warn("SW_MapManager::onTilemapJsonLoaded - subMapName not found");
            return;
        }

        this.removeFromPreloadingDataMap(subMapX, subMapY);

        const tileset = this.scene.cache.tilemap.get(subMapName).data.tilesets[0]; // Assume there is only one tileset per submap
        const tilesetName = tileset.name;

        if (this.scene.textures.exists(tilesetName)) {
            this.spawnSubMap(subMapName, subMapX, subMapY, shouldAsyncSpawn);
        }
        else {
            this.scene.load.image(`${tilesetName}`, `/game/assets/maps/${this.worldName}/${tileset.image}`);
            this.scene.load.start();
            this.scene.load.once(`${Phaser.Loader.Events.FILE_KEY_COMPLETE}image-${tilesetName}`, (key: string, type: string, data: any) => {
                this.spawnSubMap(subMapName, subMapX, subMapY, shouldAsyncSpawn);
            });
        }
    }

    private spawnSubMap(subMapName: string, subMapX: number, subMapY: number, shouldAsyncSpawn: boolean = true): void {
        const subMap = this.scene.add.tilemap(subMapName);
        const tilesetName = subMap.tilesets[0].name; // Assume there is only one tileset per submap

        const subMapData = {
            subMapX: subMapX,
            subMapY: subMapY,
            subMap: subMap,
            tileset: subMap.addTilesetImage(tilesetName, tilesetName) as Phaser.Tilemaps.Tileset,
        } as SW_SubMapData;

        if (shouldAsyncSpawn) {
            Phaser.Utils.Array.AddAt(this.spawnSubMapQueue, subMapData, 0);
        }
        else {
            this.spawnSubMapSynchrounously(subMapData)
        }
        
        const subMapId = this.getSubMapId(subMapX, subMapY);
        this.spawnedSubMapDataMap.set(subMapId, subMapData);
    }

    private spawnSubMapSynchrounously(subMapData: SW_SubMapData): void {
        const offsetX = subMapData.subMapX * this.subMapWidth;
        const offsetY = subMapData.subMapY * this.subMapHeight;
        const tileset = subMapData.tileset;

        subMapData.layerCollision = subMapData.subMap.createLayer("LayerCollision", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
        subMapData.layerCollision.setCollisionByProperty({collides: true});
        subMapData.layerCollision_collider = this.scene.physics.add.collider(this.player, subMapData.layerCollision);
        subMapData.layerCollision.setDepth(-9999);

        subMapData.layerGround = subMapData.subMap.createLayer("Layer1", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
        subMapData.layerGround.setDepth(depthBackground);

        subMapData.layerBackground1 =  subMapData.subMap.createLayer("Layer2", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
        subMapData.layerBackground1.setDepth(depthBackground);

        subMapData.layerBackground2 =  subMapData.subMap.createLayer("Layer3", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
        subMapData.layerBackground2.setDepth(depthBackground);
        
        subMapData.layerForeground1 =  subMapData.subMap.createLayer("Layer4", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
        subMapData.layerForeground1.setDepth(depthForeground);
        
        subMapData.layerForeground2 =  subMapData.subMap.createLayer("Layer5", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
        subMapData.layerForeground2.setDepth(depthForeground);
        
        subMapData.entrances = this.createEntrances(subMapData, offsetX, offsetY);
        // @ts-ignore - onPlayerEnter has the right parameter types
        subMapData.entrances_collider = this.scene.physics.add.overlap(this.player, subMapData.entrances, this.scene.onPlayerEnter, this.scene.canPlayerEnter, this.scene);
        
        subMapData.interactableObjects = this.scene.createInteractableObjects(subMapData, offsetX, offsetY);
        // @ts-ignore - onPlayerOverlapInteractable has the right parameter types
        subMapData.interactableObjects_collider = this.scene.physics.add.overlap(this.player.getInteractableComp(), subMapData.interactableObjects, this.scene.onPlayerOverlapInteractable, undefined, this);
    }

    private trySpawnSubMapOnRight(shouldAsyncSpawn: boolean = true): void {
        const rightSubMapX = this.currentSubMapX + 1; 
        const downSubMapY = this.currentSubMapY + 1;
        const upSubMapY = this.currentSubMapY - 1;

        this.trySpawnSubMap(rightSubMapX, this.currentSubMapY, shouldAsyncSpawn);

        if (this.hasSubMap(this.currentSubMapX, downSubMapY)) {
            this.trySpawnSubMap(rightSubMapX, downSubMapY, shouldAsyncSpawn);
        }
        else if (this.hasSubMap(this.currentSubMapX, upSubMapY)) {
            this.trySpawnSubMap(rightSubMapX, upSubMapY, shouldAsyncSpawn);
        }
    }

    private trySpawnSubMapOnLeft(shouldAsyncSpawn: boolean = true): void {
        const leftSubMapX = this.currentSubMapX - 1;
        const downSubMapY = this.currentSubMapY + 1;
        const upSubMapY = this.currentSubMapY - 1;

        this.trySpawnSubMap(leftSubMapX, this.currentSubMapY, shouldAsyncSpawn);

        if (this.hasSubMap(this.currentSubMapX, downSubMapY)) {
            this.trySpawnSubMap(leftSubMapX, downSubMapY, shouldAsyncSpawn);
        }
        else if (this.hasSubMap(this.currentSubMapX, upSubMapY)) {
            this.trySpawnSubMap(leftSubMapX, upSubMapY, shouldAsyncSpawn);
        }
    }

    private trySpawnSubMapOnBottom(shouldAsyncSpawn: boolean = true): void {
        const rightSubMapX = this.currentSubMapX + 1; 
        const leftSubMapX = this.currentSubMapX - 1;
        const downSubMapY = this.currentSubMapY + 1;

        this.trySpawnSubMap(this.currentSubMapX, downSubMapY, shouldAsyncSpawn);

        if (this.hasSubMap(leftSubMapX, this.currentSubMapY)) {
            this.trySpawnSubMap(leftSubMapX, downSubMapY, shouldAsyncSpawn);
        }
        else if (this.hasSubMap(rightSubMapX, this.currentSubMapY)) {
            this.trySpawnSubMap(rightSubMapX, downSubMapY, shouldAsyncSpawn);
        }
    }

    private trySpawnSubMapOnTop(shouldAsyncSpawn: boolean = true): void {
        const rightSubMapX = this.currentSubMapX + 1; 
        const leftSubMapX = this.currentSubMapX - 1;
        const upSubMapY = this.currentSubMapY - 1;

        this.trySpawnSubMap(this.currentSubMapX, upSubMapY, shouldAsyncSpawn);

        if (this.hasSubMap(leftSubMapX, this.currentSubMapY)) {
            this.trySpawnSubMap(leftSubMapX, upSubMapY, shouldAsyncSpawn);
        }
        else if (this.hasSubMap(rightSubMapX, this.currentSubMapY)) {
            this.trySpawnSubMap(rightSubMapX, upSubMapY, shouldAsyncSpawn);
        }
    }

    private clearSubMapOnRight(): void {
        const rightSubMapX = this.currentSubMapX + 1; 
        const upSubMapY = this.currentSubMapY - 1;
        const downSubMapY = this.currentSubMapY + 1;

        this.clearSubMap(rightSubMapX, this.currentSubMapY);
        this.clearSubMap(rightSubMapX, downSubMapY);
        this.clearSubMap(rightSubMapX, upSubMapY);
    }

    private clearSubMapOnLeft(): void {
        const leftSubMapX = this.currentSubMapX - 1;
        const upSubMapY = this.currentSubMapY - 1;
        const downSubMapY = this.currentSubMapY + 1;

        this.clearSubMap(leftSubMapX, this.currentSubMapY);
        this.clearSubMap(leftSubMapX, downSubMapY);
        this.clearSubMap(leftSubMapX, upSubMapY);
    }

    private clearSubMapOnBottom(): void {
        const rightSubMapX = this.currentSubMapX + 1; 
        const leftSubMapX = this.currentSubMapX - 1;
        const downSubMapY = this.currentSubMapY + 1;

        this.clearSubMap(this.currentSubMapX, downSubMapY);
        this.clearSubMap(leftSubMapX, downSubMapY);
        this.clearSubMap(rightSubMapX, downSubMapY);
    }

    private clearSubMapOnTop(): void {
        const rightSubMapX = this.currentSubMapX + 1; 
        const leftSubMapX = this.currentSubMapX - 1;
        const upSubMapY = this.currentSubMapY - 1;

        this.clearSubMap(this.currentSubMapX, upSubMapY);
        this.clearSubMap(leftSubMapX, upSubMapY);
        this.clearSubMap(rightSubMapX, upSubMapY);
    }

    private clearSubMap(subMapX: number, subMapY: number): void {
        this.removeFromPreloadingDataMap(subMapX, subMapY);
        this.removeFromSubMapQueue(subMapX, subMapY);
        this.removeSpawnedSubMapByIndexes(subMapX, subMapY);

        const subMapName = this.getSubMapName(subMapX, subMapY);
        if (subMapName)
        {
            const tilemapData = this.scene.cache.tilemap.get(subMapName);
            const tilesets = tilemapData ? tilemapData.tilesets : undefined;

            if (tilesets && tilesets.length() > 0)
            {
                this.scene.textures.remove(tilemapData.tilesets[0].name);
            }
            this.scene.cache.tilemap.remove(subMapName);
        }
    }

    private removeSpawnedSubMapByIndexes(subMapX: number, subMapY: number): void {
        const subMapId = this.getSubMapId(subMapX, subMapY);
        const subMapData = this.spawnedSubMapDataMap.get(subMapId);

        if (subMapData)
        {
            this.removeSpawnedSubMap(subMapData);
            this.spawnedSubMapDataMap.delete(subMapId);
        }
    }

    private removeSpawnedSubMap(subMapData: SW_SubMapData): void {
        subMapData.layerCollision_collider?.destroy();
        subMapData.entrances_collider?.destroy();
        subMapData.interactableObjects_collider?.destroy();
        subMapData.entrances?.clear(true, true);
        subMapData.interactableObjects?.clear(true, true);
        subMapData.subMap.destroy();
    }

    private removeFromSubMapQueue(subMapX: number, subMapY: number): void {
        const index = this.spawnSubMapQueue.findIndex((subMapData: SW_SubMapData) => {
            return (subMapData.subMapX === subMapX) && (subMapData.subMapY === subMapY);
        });

        if ((index >= 0) && (index < this.spawnSubMapQueue.length)) {
            this.spawnSubMapQueue.splice(index, 1);
        }
    }

    private removeFromPreloadingDataMap(subMapX: number, subMapY: number): void {
        const subMapId = this.getSubMapId(subMapX, subMapY);
        const index = this.preloadingSubMaps.findIndex((id: string) => {
            return (id === subMapId);
        });
        this.preloadingSubMaps.splice(index, 1);
    }

    private isPlayerNearSubMapRight(): boolean {
        return (this.currentLocalPercentMapX > (1 - this.subMapThreshold));
    }

    private isPlayerNearSubMapLeft(): boolean {
        return (this.currentLocalPercentMapX < this.subMapThreshold) ;
    }

    private isPlayerNearSubMapBottom(): boolean {
        return (this.currentLocalPercentMapY > (1 - this.subMapThreshold));
    }

    private isPlayerNearSubMapTop(): boolean {
        return (this.currentLocalPercentMapY < this.subMapThreshold);
    }

    private shouldSpawnSubMapOnRight(): boolean {
        return this.isPlayerNearSubMapRight() && (this.prevLocalPercentMapX <= (1 - this.subMapThreshold));
    }

    private shouldClearSubMapOnRight(): boolean {
        return (this.prevLocalPercentMapX > (1 - this.subMapThreshold)) && (this.currentLocalPercentMapX <= (1 - this.subMapThreshold));
    }

    private shouldSpawnSubMapOnLeft(): boolean {
        return this.isPlayerNearSubMapLeft() && (this.prevLocalPercentMapX >= this.subMapThreshold);
    }

    private shouldClearSubMapOnLeft(): boolean {
        return (this.prevLocalPercentMapX < this.subMapThreshold) && (this.currentLocalPercentMapX >= this.subMapThreshold);
    }

    private shouldSpawnSubMapOnBottom(): boolean {
        return this.isPlayerNearSubMapBottom() && (this.prevLocalPercentMapY <= (1 - this.subMapThreshold));
    }

    private shouldClearSubMapOnBottom(): boolean {
        return (this.prevLocalPercentMapY > (1 - this.subMapThreshold)) && (this.currentLocalPercentMapY <= (1 - this.subMapThreshold));
    }

    private shouldSpawnSubMapOnTop(): boolean {
        return this.isPlayerNearSubMapTop() && (this.prevLocalPercentMapY >= this.subMapThreshold);
    }

    private shouldClearSubMapOnTop(): boolean {
        return (this.prevLocalPercentMapY < this.subMapThreshold) && (this.currentLocalPercentMapY >= this.subMapThreshold);
    }

    private updatePlayerData(): void {
        this.prevLocalPercentMapX = this.currentLocalPercentMapX;
        this.prevLocalPercentMapY = this.currentLocalPercentMapY;

        this.currentLocalPercentMapX = (this.player.x % this.subMapWidth) / this.subMapWidth;
        this.currentLocalPercentMapY = (this.player.y % this.subMapHeight) / this.subMapHeight;

        this.currentSubMapX = Math.floor(this.player.x / this.subMapWidth);
        this.currentSubMapY = Math.floor(this.player.y / this.subMapHeight);
    }

    public clear(): void {
        this.removeAllListeners();
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);

        this.spawnSubMapQueue = [];
        this.preloadingSubMaps = [];

        this.spawnedSubMapDataMap.forEach((subMapData: SW_SubMapData) => {
            this.removeSpawnedSubMap(subMapData);
        }, this);
        this.spawnedSubMapDataMap.clear();
        this.subMapNamesMap.clear();
    }

    private createEntrances(subMapData: SW_SubMapData, offsetX: number, offsetY: number): Phaser.Physics.Arcade.StaticGroup {
        const entranceGroup = this.scene.physics.add.staticGroup();

        const entrances = subMapData.subMap.createFromObjects("Characters", {name: "Entrance", classType: SW_Entrance}) as SW_Entrance[];

        for (const entrance of entrances) {
            entranceGroup.add(entrance);
            entrance.setPosition(entrance.x + offsetX, entrance.y + offsetY);
            entrance.body.x = entrance.x - entrance.displayWidth * 0.5;
            entrance.body.y = entrance.y - entrance.displayHeight * 0.5;
            entrance.setVisible(entrance.texture.key != "__MISSING");
        }
        return entranceGroup;
    }

    private updateQueue(): void {
        const length = this.spawnSubMapQueue.length;

        if (length > 0) {
            const subMapData = this.spawnSubMapQueue[length - 1];
            const offsetX = subMapData.subMapX * this.subMapWidth;
            const offsetY = subMapData.subMapY * this.subMapHeight;
            const tileset = subMapData.tileset;

            if (!subMapData.layerCollision) {
                subMapData.layerCollision = subMapData.subMap.createLayer("LayerCollision", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
                subMapData.layerCollision.setCollisionByProperty({collides: true});
                subMapData.layerCollision_collider = this.scene.physics.add.collider(this.player, subMapData.layerCollision);
                subMapData.layerCollision.setVisible(false);
            }
            else if (!subMapData.layerGround) {
                subMapData.layerGround = subMapData.subMap.createLayer("Layer1", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
                subMapData.layerGround.setDepth(depthBackground);
            }
            else if (!subMapData.layerBackground1) {
                subMapData.layerBackground1 =  subMapData.subMap.createLayer("Layer2", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
                subMapData.layerBackground1.setDepth(depthBackground);
            }
            else if (!subMapData.layerBackground2) {
                subMapData.layerBackground2 =  subMapData.subMap.createLayer("Layer3", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
                subMapData.layerBackground2.setDepth(depthBackground);
            }
            else if (!subMapData.layerForeground1) {
                subMapData.layerForeground1 =  subMapData.subMap.createLayer("Layer4", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
                subMapData.layerForeground1.setDepth(depthForeground);
            }
            else if (!subMapData.layerForeground2) {
                subMapData.layerForeground2 =  subMapData.subMap.createLayer("Layer5", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
                subMapData.layerForeground2.setDepth(depthForeground);
            }
            else if (!subMapData.entrances) {
                subMapData.entrances = this.createEntrances(subMapData, offsetX, offsetY);
                // @ts-ignore - onPlayerEnter has the right parameter types
                subMapData.entrances_collider = this.scene.physics.add.overlap(this.player, subMapData.entrances, this.scene.onPlayerEnter, this.scene.canPlayerEnter, this.scene);
            }
            else if (!subMapData.interactableObjects) {
                subMapData.interactableObjects = this.scene.createInteractableObjects(subMapData, offsetX, offsetY);
                // @ts-ignore - onPlayerOverlapInteractable has the right parameter types
                subMapData.interactableObjects_collider = this.scene.physics.add.overlap(this.player.getInteractableComp(), subMapData.interactableObjects, this.scene.onPlayerOverlapInteractable, undefined, this);
            }
            else {
                this.spawnSubMapQueue.pop();
                this.updateQueue(); // Try to update the next submap if there is any left
            }
        }
    }

    public update(): void {
        this.updateQueue();
        this.updatePlayerData();

        if (this.subMapMaxX > 1) {
            if (this.shouldSpawnSubMapOnRight()) {
                this.trySpawnSubMapOnRight();
            }
            else if (this.shouldClearSubMapOnRight()) {
                this.clearSubMapOnRight();
            }
            else if (this.shouldSpawnSubMapOnLeft()) {
                this.trySpawnSubMapOnLeft();
            }
            else if (this.shouldClearSubMapOnLeft()) {
                this.clearSubMapOnLeft();
            }
        }
        
        if (this.subMapMaxY > 1) {
            if (this.shouldSpawnSubMapOnBottom()) {
                this.trySpawnSubMapOnBottom();
            }
            else if (this.shouldClearSubMapOnBottom()) {
                this.clearSubMapOnBottom();
            }
            else if (this.shouldSpawnSubMapOnTop()) {
                this.trySpawnSubMapOnTop();
            }
            else if (this.shouldClearSubMapOnTop()) {
                this.clearSubMapOnTop();
            }
        }
    }
}