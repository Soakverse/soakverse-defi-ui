import { SW_CST } from "~/game/SW_CST";
import SW_GameScene from "~/game/scenes/SW_GameScene";
import { SW_Player } from "~/game/characters/players/SW_Player";
import SW_Entrance from "~/game/gameObjects/SW_Entrance";
import { SW_TiledObjectProperties } from "~/game/SW_Utils";
import { SW_DIRECTIONS } from "~/game/characters/SW_CharacterMovementComponent";

const depthBackground = 1;
const depthPlayer = 2;
const depthForeground = 3;

export declare type SW_SubMapPlayerSpawnData = {
    position: Phaser.Math.Vector2,
    startDirection: SW_DIRECTIONS
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

    layerGround?: Phaser.Tilemaps.TilemapLayer | undefined;
    layerBackground1?: Phaser.Tilemaps.TilemapLayer | undefined;
    layerBackground2?: Phaser.Tilemaps.TilemapLayer | undefined;
    layerForeground1?: Phaser.Tilemaps.TilemapLayer | undefined;
    layerForeground2?: Phaser.Tilemaps.TilemapLayer | undefined;

    layerForeground1_collider?: Phaser.Physics.Arcade.Collider | undefined;
    layerBackground2_collider?: Phaser.Physics.Arcade.Collider | undefined;
    entrances_collider?: Phaser.Physics.Arcade.Collider | undefined;
    interactableObjects_collider?: Phaser.Physics.Arcade.Collider | undefined;
};

export class SW_MapManager extends Phaser.Events.EventEmitter {
    private scene: SW_GameScene;

    declare private player: SW_Player;
    private spawnedSubMapDataMap: Map<string, SW_SubMapData>;

    private prevLocalPercentMapX: number = 0;
    private prevLocalPercentMapY: number = 0;

    private currentLocalPercentMapX: number = 0;
    private currentLocalPercentMapY: number = 0;

    private currentSubMapX: number = 0;
    private currentSubMapY: number = 0;
  
    private mapWidth: number = 1040;
    private mapHeight: number = 880;
  
    private subMapMaxX: number = 2;
    private subMapMaxY: number = 2;

    private subMapThreshold: number = SW_CST.MAP.SUBMAP_THRESHOLD;

    private spawnMapQueue: SW_SubMapData[] = [];

    private worldName: string;

    constructor (scene: SW_GameScene, worldName: string) {
        super();

        this.scene = scene;
        this.worldName = worldName;
        this.spawnedSubMapDataMap = new Map<string, SW_SubMapData>();
        this.spawnMapQueue = [];

        this.initWorld();
    }
    
    private initWorld(): void {
        this.clear();

        if (this.worldName) {
            const worldData = this.scene.cache.json.get(this.worldName);
            const worldMaps = worldData ? worldData.maps : [];

            if (worldMaps && worldMaps.length > 0) {
                this.mapWidth = worldMaps[0].width; // Assumme that all submaps have the same dimensions
                this.mapHeight = worldMaps[0].height; // Assumme that all submaps have the same dimensions
                this.subMapMaxX = Math.sqrt(worldData.maps.length) - 1; // TODO - Find a way to read this value from the world file
                this.subMapMaxY = this.subMapMaxX;
                this.scene.physics.world.setBounds(0, 0, this.mapWidth * (this.subMapMaxX + 1), this.mapHeight * (this.subMapMaxY + 1));
            }
            else {
                this.mapWidth = 0;
                this.mapHeight = 0;
                this.subMapMaxX = 0;
                this.subMapMaxY = 0;
                console.error("SW_MapManager::initWorld - World provided but the data are invalid");
            }
        }
        else {
            this.mapWidth = 0;
            this.mapHeight = 0;
            this.subMapMaxX = 0;
            this.subMapMaxY = 0;
            console.error("SW_MapManager::initWorld - Invalid world data");
        }
    }

    private initSubMaps(): void {
        this.updatePlayerData();

        this.spawnSubMap(this.currentSubMapX, this.currentSubMapY);

        if (this.isPlayerNearSubMapRight()) {
            this.spawnSubMapOnRight();
        }
        else if (this.isPlayerNearSubMapLeft()) {
            this.spawnSubMapOnLeft();
        }
        
        if (this.isPlayerNearSubMapBottom()) {
            this.spawnSubMapOnBottom();
        }
        else if (this.isPlayerNearSubMapTop()) {
            this.spawnSubMapOnTop();
        }
    }

    public setPlayer(player: SW_Player): void {
        this.player = player;
        this.player.setDepth(depthPlayer);
        this.initSubMaps();
    }

    public findSpawnPosition(entranceName: string): SW_SubMapPlayerSpawnData {
        for (let i = 0; i <= this.subMapMaxX; ++i) {
            for (let j = 0; j <= this.subMapMaxY; ++j) {
                const subMapId = `${i}_${j}`;
                const subMap = this.scene.add.tilemap(`${this.worldName}_${subMapId}`);
                const tileObjects = subMap.objects[1].objects;

                for (const tileObject of tileObjects) {
                    if (tileObject.name == "Entrance") {
                        const propertyArray = tileObject.properties as SW_TiledObjectProperties[];

                        const isSpawnerProperty = propertyArray.find((objectProperties: SW_TiledObjectProperties) => {
                            return objectProperties.name == "isSpawner";
                        });

                        if (isSpawnerProperty && isSpawnerProperty.value) {
                            const worldNameProperty = propertyArray.find((objectProperties: SW_TiledObjectProperties) => {
                                return objectProperties.name == "worldName";
                            });

                            if (worldNameProperty && worldNameProperty.value == entranceName) {
                                const directionProperty = propertyArray.find((objectProperties: SW_TiledObjectProperties) => {
                                    return objectProperties.name == "startDirection";
                                });

                                const spawnX = (tileObject.x as number) + i * this.mapWidth;
                                const spawnY = (tileObject.y as number) + j * this.mapHeight;
                                const startDirection = directionProperty ? directionProperty.value : SW_DIRECTIONS.Down;
                                subMap.destroy();
                                
                                return { position: new Phaser.Math.Vector2(spawnX, spawnY), startDirection: startDirection };
                            }
                        }
                    }
                }

                subMap.destroy();
            }
        }

        return { position: new Phaser.Math.Vector2(0, 0), startDirection: SW_DIRECTIONS.Down };
    }

    private hasSubMap(subMapX: number, subMapY: number): boolean {
        return this.spawnedSubMapDataMap.has(`${subMapX}_${subMapY}`);
    }

    private isMapCoordValid(subMapX: number, subMapY: number): boolean {
        return (subMapX >= 0) && (subMapX <= this.subMapMaxX) && (subMapY >= 0) && (subMapY <= this.subMapMaxY);
    }

    private spawnSubMap(subMapX: number, subMapY: number): void {
        if (!this.isMapCoordValid(subMapX, subMapY) || this.hasSubMap(subMapX, subMapY)) {
            return;
        }

        const subMapId = `${subMapX}_${subMapY}`;
        const subMap = this.scene.add.tilemap(`${this.worldName}_${subMapId}`);
        const tilesetName = subMap.tilesets[0].name; // Assume there is only one tileset per submap

        const subMapData = {
            subMapX: subMapX,
            subMapY: subMapY,
            subMap: subMap,
            tileset: subMap.addTilesetImage(tilesetName, tilesetName) as Phaser.Tilemaps.Tileset,
        } as SW_SubMapData;

        this.spawnMapQueue.push(subMapData);
        this.spawnedSubMapDataMap.set(subMapId, subMapData);
    }

    private spawnSubMapOnRight(): void {
        const rightSubMapX = this.currentSubMapX + 1; 
        const downSubMapY = this.currentSubMapY + 1;
        const upSubMapY = this.currentSubMapY - 1;

        this.spawnSubMap(rightSubMapX, this.currentSubMapY);

        if (this.hasSubMap(this.currentSubMapX, downSubMapY)) {
            this.spawnSubMap(rightSubMapX, downSubMapY);
        }
        else if (this.hasSubMap(this.currentSubMapX, upSubMapY)) {
            this.spawnSubMap(rightSubMapX, upSubMapY);
        }
    }

    private spawnSubMapOnLeft(): void {
        const leftSubMapX = this.currentSubMapX - 1;
        const downSubMapY = this.currentSubMapY + 1;
        const upSubMapY = this.currentSubMapY - 1;

        this.spawnSubMap(leftSubMapX, this.currentSubMapY);

        if (this.hasSubMap(this.currentSubMapX, downSubMapY)) {
            this.spawnSubMap(leftSubMapX, downSubMapY);
        }
        else if (this.hasSubMap(this.currentSubMapX, upSubMapY)) {
            this.spawnSubMap(leftSubMapX, upSubMapY);
        }
    }

    private spawnSubMapOnBottom(): void {
        const rightSubMapX = this.currentSubMapX + 1; 
        const leftSubMapX = this.currentSubMapX - 1;
        const downSubMapY = this.currentSubMapY + 1;

        this.spawnSubMap(this.currentSubMapX, downSubMapY);

        if (this.hasSubMap(leftSubMapX, this.currentSubMapY)) {
            this.spawnSubMap(leftSubMapX, downSubMapY);
        }
        else if (this.hasSubMap(rightSubMapX, this.currentSubMapY)) {
            this.spawnSubMap(rightSubMapX, downSubMapY);
        }
    }

    private spawnSubMapOnTop(): void {
        const rightSubMapX = this.currentSubMapX + 1; 
        const leftSubMapX = this.currentSubMapX - 1;
        const upSubMapY = this.currentSubMapY - 1;

        this.spawnSubMap(this.currentSubMapX, upSubMapY);

        if (this.hasSubMap(leftSubMapX, this.currentSubMapY)) {
            this.spawnSubMap(leftSubMapX, upSubMapY);
        }
        else if (this.hasSubMap(rightSubMapX, this.currentSubMapY)) {
            this.spawnSubMap(rightSubMapX, upSubMapY);
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
        const subMapId = `${subMapX}_${subMapY}`;
        const subMapData = this.spawnedSubMapDataMap.get(subMapId);

        if (subMapData)
        {
            subMapData.layerBackground2_collider?.destroy();
            subMapData.layerForeground1_collider?.destroy();
            subMapData.entrances_collider?.destroy();
            subMapData.interactableObjects_collider?.destroy();
            subMapData.subMap.destroy();
            // subMapData.entrances?.clear(true, true);
            // subMapData.entrances?.destroy(); // TODO - See if we could pool the static groups
            this.spawnedSubMapDataMap.delete(subMapId);

            this.removeFromSubMapQueue(subMapX, subMapY);
        }
    }

    private removeFromSubMapQueue(subMapX: number, subMapY: number): void {
        const index = this.spawnMapQueue.findIndex((subMapData: SW_SubMapData) => {
            return (subMapData.subMapX == subMapX) && (subMapData.subMapY == subMapY);
        });

        if ((index >= 0) && (index < this.spawnMapQueue.length)) {
            this.spawnMapQueue.splice(index);
        }
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

        this.currentLocalPercentMapX = (this.player.x % this.mapWidth) / this.mapWidth;
        this.currentLocalPercentMapY = (this.player.y % this.mapHeight) / this.mapHeight;

        this.currentSubMapX = Math.floor(this.player.x / this.mapWidth);
        this.currentSubMapY = Math.floor(this.player.y / this.mapHeight);
    }

    public clear(): void {
        this.spawnMapQueue = [];

        this.spawnedSubMapDataMap.forEach((subMapData: SW_SubMapData) => {
            subMapData.subMap.destroy();
            // subMapData.entrances?.clear(true, true);
            // subMapData.entrances?.destroy();
        }, this);
        this.spawnedSubMapDataMap.clear();
    }

    private createEntrances(subMapData: SW_SubMapData, offsetX: number, offsetY: number): Phaser.Physics.Arcade.StaticGroup {
        const entranceGroup = this.scene.physics.add.staticGroup();

        const entrances = subMapData.subMap.createFromObjects("Characters", {name: "Entrance", classType: SW_Entrance}) as SW_Entrance[];

        for (const entrance of entrances) {
            if (!entrance.isSpawner) {
                entranceGroup.add(entrance);
                entrance.setPosition(entrance.x + offsetX, entrance.y + offsetY);
                entrance.body.x = entrance.x - entrance.displayWidth * 0.5;
                entrance.body.y = entrance.y - entrance.displayHeight * 0.5;
                entrance.setVisible(entrance.texture.key != "__MISSING");
            }
            else {
                entrance.destroy();
            }
        }
        return entranceGroup;
    }

    private updateQueue(): void {
        const length = this.spawnMapQueue.length;

        if (length > 0) {
            const subMapData = this.spawnMapQueue[length - 1];
            const offsetX = subMapData.subMapX * this.mapWidth;
            const offsetY = subMapData.subMapY * this.mapHeight;
            const tileset = subMapData.tileset;

            if (!subMapData.layerGround) {
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
                subMapData.layerBackground2.setCollisionByProperty({collides: true});
                subMapData.layerBackground2_collider = this.scene.physics.add.collider(this.player, subMapData.layerBackground2);
            }
            else if (!subMapData.layerForeground1) {
                subMapData.layerForeground1 =  subMapData.subMap.createLayer("Layer4", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
                subMapData.layerForeground1.setDepth(depthForeground);
                subMapData.layerForeground1.setCollisionByProperty({collides: true});
                subMapData.layerForeground1_collider = this.scene.physics.add.collider(this.player, subMapData.layerForeground1);
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
                this.spawnMapQueue.pop();
            }
        }
    }

    public update(): void {
        this.updateQueue();
        this.updatePlayerData();

        if (this.subMapMaxX > 1) {
            if (this.currentSubMapX == this.currentSubMapX) {
                if (this.shouldSpawnSubMapOnRight()) {
                    this.spawnSubMapOnRight();
                }
                else if (this.shouldClearSubMapOnRight()) {
                    this.clearSubMapOnRight();
                }
                else if (this.shouldSpawnSubMapOnLeft()) {
                    this.spawnSubMapOnLeft();
                }
                else if (this.shouldClearSubMapOnLeft()) {
                    this.clearSubMapOnLeft();
                }
            }
        }
        
        if (this.subMapMaxY > 1) {
            if (this.currentSubMapY == this.currentSubMapY) {
                if (this.shouldSpawnSubMapOnBottom()) {
                    this.spawnSubMapOnBottom();
                }
                else if (this.shouldClearSubMapOnBottom()) {
                    this.clearSubMapOnBottom();
                }
                else if (this.shouldSpawnSubMapOnTop()) {
                    this.spawnSubMapOnTop();
                }
                else if (this.shouldClearSubMapOnTop()) {
                    this.clearSubMapOnTop();
                }
            }
        }
    }
}