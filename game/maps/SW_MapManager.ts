import SW_GameScene from "~/game/scenes/SW_GameScene";
import { SW_Player } from "~/game/characters/players/SW_Player";
import SW_Entrance from "~/game/gameObjects/SW_Entrance";

export declare type SW_SubMapData = {
    /** The tiled sub map */
    subMap: Phaser.Tilemaps.Tilemap;
  
    /** All entrances to join a new map (ex: a door from a building, an path etc...) */
    entrances: Phaser.Physics.Arcade.StaticGroup;
  
    /** All entrances used to spawn the player */
    entranceSpawners: SW_Entrance[];
  
    /** Any object the player can interact with */
    interactableObjects: Phaser.Physics.Arcade.StaticGroup;
  
    layerBackground1: Phaser.Tilemaps.TilemapLayer;
    layerBackground2: Phaser.Tilemaps.TilemapLayer;
    layerForeground1: Phaser.Tilemaps.TilemapLayer;
    layerForeground2: Phaser.Tilemaps.TilemapLayer;
  };

export class SW_MapManager {
    private scene: SW_GameScene;
    private player: SW_Player;
    private subMapDataMap: Map<string, SW_SubMapData>;

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

    private subMapThreshold: number = 0.35;

    constructor (player: SW_Player) {
        this.scene = player.scene as SW_GameScene;
        this.player = player;
        this.subMapDataMap = new Map<string, SW_SubMapData>();

        this.initSubMaps();
    }

    private hasSubMap(subMapX: number, subMapY: number): boolean {
        return this.subMapDataMap.has(`${subMapX}_${subMapY}`);
    }

    private isMapCoordValid(subMapX: number, subMapY: number): boolean {
        return (subMapX >= 0) && (subMapX <= this.subMapMaxX) && (subMapY >= 0) && (subMapY <= this.subMapMaxY);
    }

    private spawnSubMap(subMapX: number, subMapY: number): void {
        if (!this.isMapCoordValid(subMapX, subMapY) || this.hasSubMap(subMapX, subMapY)) {
            return;
        }

        const subMapId = `${subMapX}_${subMapY}`;
        const offsetX = subMapX * this.mapWidth;
        const offsetY = subMapY * this.mapHeight;

        const subMap = this.scene.add.tilemap(`soakWorld_${subMapId}`);

        const tileset = subMap.addTilesetImage("outsideAssetTiled", "outsideAssetTiled") as Phaser.Tilemaps.Tileset;
        const layerGround = subMap.createLayer("Layer1", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
        layerGround.setDepth(1);

        const layerBackground1 = subMap.createLayer("Layer2", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
        layerBackground1.setDepth(1);
        const layerBackground2 = subMap.createLayer("Layer3", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
        layerBackground2.setDepth(1);

        const layerForeground1 = subMap.createLayer("Layer4", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
        layerForeground1.setDepth(3);
        const layerForeground2 = subMap.createLayer("Layer5", tileset, offsetX, offsetY) as Phaser.Tilemaps.TilemapLayer;
        layerForeground2.setDepth(3);   

        // const entrances = createEntrances();
        // const entranceSpawners
        // const interactableObjects = createInteractableObjects();

        const subMapData = {
            subMap: subMap,
            entrances: this.scene.physics.add.staticGroup(),
            entranceSpawners: [],
            interactableObjects: this.scene.physics.add.staticGroup(),
            layerBackground1: layerBackground1,
            layerBackground2: layerBackground2,
            layerForeground1: layerForeground1,
            layerForeground2: layerForeground2
        } as SW_SubMapData;

        this.subMapDataMap.set(subMapId, subMapData);
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
        const subMapData = this.subMapDataMap.get(subMapId);

        if (subMapData)
        {
            subMapData.subMap.destroy();
            subMapData.entrances.clear(true, true);
            this.subMapDataMap.delete(subMapId);
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

    public initSubMaps(): void {
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

    public update(): void {
        this.updatePlayerData();

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