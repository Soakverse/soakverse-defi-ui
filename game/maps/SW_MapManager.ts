import SW_GameScene from "~/game/scenes/SW_GameScene";
import { SW_Player } from "~/game/characters/players/SW_Player";
import SW_Entrance from "~/game/gameObjects/SW_Entrance";

export declare type SW_SubMapData = {
    /** The tiled sub map */
    submap: Phaser.Tilemaps.Tilemap;
  
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

    private currentLocalPercentMapX: number = 0;
    private currentLocalPercentMapY: number = 0;
  
    private currentSubMapX: number = 0;
    private currentSubMapY: number = 0;
  
    private mapWidth: number = 1040;
    private mapHeight: number = 880;
  
    private subMapMaxX: number = 2;
    private subMapMaxY: number = 2;

    constructor (player: SW_Player) {
        this.scene = player.scene as SW_GameScene;
        this.player = player;
        this.subMapDataMap = new Map<string, SW_SubMapData>();
    }

    public createSubMap(subMapX: number, subMapY: number): void {
        if (subMapX < 0 || subMapX > this.subMapMaxX || subMapY < 0 || subMapY > this.subMapMaxY) {
            return;
        }

        const subMapId = `${subMapX}_${subMapY}`;

        if (this.subMapDataMap.has(subMapId)) {
            return;
        }

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
            submap: subMap,
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

    private clearSubMap(subMapX: number, subMapY: number): void {
        const subMapId = `${subMapX}_${subMapY}`;
        const subMapData = this.subMapDataMap.get(subMapId);

        if (subMapData)
        {
            subMapData.submap.destroy();
            subMapData.entrances.clear(true, true);
            this.subMapDataMap.delete(subMapId);
        }
    }

    public update(): void {
        const newSubMapX = Math.floor(this.player.x / this.mapWidth);
        const newSubMapY = Math.floor(this.player.y / this.mapHeight);

        const localMapX = (this.player.x % this.mapWidth);
        const localMapY = (this.player.y % this.mapHeight);

        const newlocalPercentMapX = localMapX / this.mapWidth;
        const newlocalPercentMapY = localMapY / this.mapHeight;

        const threshold = 0.2;

        if (this.currentSubMapX == newSubMapX) {
            if ((newlocalPercentMapX > (1 - threshold)) && (this.currentLocalPercentMapX <= (1 - threshold))) {
                const rightSubMapX = Math.floor(this.player.x / this.mapWidth) + 1; 
                this.createSubMap(rightSubMapX, newSubMapY);
            }
            else if ((this.currentLocalPercentMapX > (1 - threshold)) && (newlocalPercentMapX <= (1 - threshold))) {
                const rightSubMapX = Math.floor(this.player.x / this.mapWidth) + 1; 
                this.clearSubMap(rightSubMapX, newSubMapY);
            }
            else if ((newlocalPercentMapX < threshold) && (this.currentLocalPercentMapX >= threshold)) {  
                const leftSubMapX = Math.floor(this.player.x / this.mapWidth) - 1; 
                this.createSubMap(leftSubMapX, newSubMapY);
            }
            else if ((this.currentLocalPercentMapX < threshold) && (newlocalPercentMapX >= threshold)) {  
                const leftSubMapX = Math.floor(this.player.x / this.mapWidth) - 1; 
                this.clearSubMap(leftSubMapX, newSubMapY);
            }
        }
        
        if (this.currentSubMapY == newSubMapY) {
            if ((newlocalPercentMapY > (1 - threshold)) && (this.currentLocalPercentMapY <= (1 - threshold))) {
                const downSubMapY = Math.floor(this.player.y / this.mapHeight) + 1;
                this.createSubMap(newSubMapX, downSubMapY);
            }
            else if ((this.currentLocalPercentMapY > (1 - threshold)) && (newlocalPercentMapY <= (1 - threshold))) {
                const downSubMapY = Math.floor(this.player.y / this.mapHeight) + 1;
                this.clearSubMap(newSubMapX, downSubMapY);
            }
            else if ((newlocalPercentMapY < threshold) && (this.currentLocalPercentMapY >= threshold)) {
                const upSubMapY = Math.floor(this.player.y / this.mapHeight) - 1;
                this.createSubMap(newSubMapX, upSubMapY);
            }
            else if ((this.currentLocalPercentMapY < threshold) && (newlocalPercentMapY >= threshold)) {
                const upSubMapY = Math.floor(this.player.y / this.mapHeight) - 1;
                this.clearSubMap(newSubMapX, upSubMapY);
            }
        }
        
        this.currentLocalPercentMapX = newlocalPercentMapX;
        this.currentLocalPercentMapY = newlocalPercentMapY;

        this.currentSubMapX = newSubMapX;
        this.currentSubMapY = newSubMapY;
    }
}