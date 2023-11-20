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

    private subMapThreshold: number = 0.2;

    constructor (player: SW_Player) {
        this.scene = player.scene as SW_GameScene;
        this.player = player;
        this.subMapDataMap = new Map<string, SW_SubMapData>();
    }

    public hasSubMap(subMapX: number, subMapY: number): boolean {
        return this.subMapDataMap.has(`${subMapX}_${subMapY}`);
    }

    public isMapCoordValid(subMapX: number, subMapY: number): boolean {
        return (subMapX >= 0) && (subMapX <= this.subMapMaxX) && (subMapY >= 0) && (subMapY <= this.subMapMaxY);
    }

    public createSubMap(subMapX: number, subMapY: number): void {
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
        console.log("clear ?", subMapX, subMapY)
        const subMapId = `${subMapX}_${subMapY}`;
        const subMapData = this.subMapDataMap.get(subMapId);

        if (subMapData)
        {
            subMapData.submap.destroy();
            subMapData.entrances.clear(true, true);
            this.subMapDataMap.delete(subMapId);
        }
    }

    private shouldSpawnSubMapOnRight(newPercentX: number): boolean {
        return (newPercentX > (1 - this.subMapThreshold)) && (this.currentLocalPercentMapX <= (1 - this.subMapThreshold));
    }

    private shouldClearSubMapOnRight(newPercentX: number): boolean {
        return (this.currentLocalPercentMapX > (1 - this.subMapThreshold)) && (newPercentX <= (1 - this.subMapThreshold));
    }

    private shouldSpawnSubMapOnLeft(newPercentX: number): boolean {
        return (newPercentX < this.subMapThreshold) && (this.currentLocalPercentMapX >= this.subMapThreshold);
    }

    private shouldClearSubMapOnLeft(newPercentX: number): boolean {
        return (this.currentLocalPercentMapX < this.subMapThreshold) && (newPercentX >= this.subMapThreshold);
    }

    private shouldSpawnSubMapOnBottom(newPercentY: number): boolean {
        return (newPercentY > (1 - this.subMapThreshold)) && (this.currentLocalPercentMapY <= (1 - this.subMapThreshold));
    }

    private shouldClearSubMapOnBottom(newPercentY: number): boolean {
        return (this.currentLocalPercentMapY > (1 - this.subMapThreshold)) && (newPercentY <= (1 - this.subMapThreshold));
    }

    private shouldSpawnSubMapOnTop(newPercentY: number): boolean {
        return (newPercentY < this.subMapThreshold) && (this.currentLocalPercentMapY >= this.subMapThreshold);
    }

    private shouldClearSubMapOnTop(newPercentY: number): boolean {
        return (this.currentLocalPercentMapY < this.subMapThreshold) && (newPercentY >= this.subMapThreshold);
    }

    public update(): void {
        const newSubMapX = Math.floor(this.player.x / this.mapWidth);
        const newSubMapY = Math.floor(this.player.y / this.mapHeight);

        const localMapX = (this.player.x % this.mapWidth);
        const localMapY = (this.player.y % this.mapHeight);

        const newlocalPercentMapX = localMapX / this.mapWidth;
        const newlocalPercentMapY = localMapY / this.mapHeight;

        const rightSubMapX = newSubMapX + 1; 
        const leftSubMapX = newSubMapX - 1;

        const downSubMapY = newSubMapY + 1;
        const upSubMapY = newSubMapY - 1;

        if (this.currentSubMapX == newSubMapX) {
            if (this.shouldSpawnSubMapOnRight(newlocalPercentMapX)) {
                this.createSubMap(rightSubMapX, newSubMapY);

                if (this.hasSubMap(newSubMapX, downSubMapY)) {
                    
                    this.createSubMap(rightSubMapX, downSubMapY);
                }
                else if (this.hasSubMap(newSubMapX, upSubMapY)) {
                    
                    this.createSubMap(rightSubMapX, upSubMapY);
                }
            }
            else if (this.shouldClearSubMapOnRight(newlocalPercentMapX)) {
                this.clearSubMap(rightSubMapX, newSubMapY);
                this.clearSubMap(rightSubMapX, downSubMapY);
                this.clearSubMap(rightSubMapX, upSubMapY);
            }
            else if (this.shouldSpawnSubMapOnLeft(newlocalPercentMapX)) {
                this.createSubMap(leftSubMapX, newSubMapY);

                if (this.hasSubMap(newSubMapX, downSubMapY)) {
                    
                    this.createSubMap(leftSubMapX, downSubMapY);
                }
                else if (this.hasSubMap(newSubMapX, upSubMapY)) {
                    
                    this.createSubMap(leftSubMapX, upSubMapY);
                }
            }
            else if (this.shouldClearSubMapOnLeft(newlocalPercentMapX)) {
                this.clearSubMap(leftSubMapX, newSubMapY);
                this.clearSubMap(leftSubMapX, downSubMapY);
                this.clearSubMap(leftSubMapX, upSubMapY);
            }
        }
        
        if (this.currentSubMapY == newSubMapY) {
            if (this.shouldSpawnSubMapOnBottom(newlocalPercentMapY)) {
                this.createSubMap(newSubMapX, downSubMapY);

                if (this.hasSubMap(leftSubMapX, newSubMapY)) {
                    
                    this.createSubMap(leftSubMapX, downSubMapY);
                }
                else if (this.hasSubMap(rightSubMapX, newSubMapY)) {
                    
                    this.createSubMap(rightSubMapX, downSubMapY);
                }
            }
            else if (this.shouldClearSubMapOnBottom(newlocalPercentMapY)) {
                this.clearSubMap(newSubMapX, downSubMapY);
                this.clearSubMap(leftSubMapX, downSubMapY);
                this.clearSubMap(rightSubMapX, downSubMapY);
            }
            else if (this.shouldSpawnSubMapOnTop(newlocalPercentMapY)) {
                this.createSubMap(newSubMapX, upSubMapY);

                if (this.hasSubMap(leftSubMapX, newSubMapY)) {
                    
                    this.createSubMap(leftSubMapX, upSubMapY);
                }
                else if (this.hasSubMap(rightSubMapX, newSubMapY)) {
                    
                    this.createSubMap(rightSubMapX, upSubMapY);
                }
            }
            else if (this.shouldClearSubMapOnTop(newlocalPercentMapY)) {
                this.clearSubMap(newSubMapX, upSubMapY);
                this.clearSubMap(leftSubMapX, upSubMapY);
                this.clearSubMap(rightSubMapX, upSubMapY);
            }
        }
        
        this.currentLocalPercentMapX = newlocalPercentMapX;
        this.currentLocalPercentMapY = newlocalPercentMapY;

        this.currentSubMapX = newSubMapX;
        this.currentSubMapY = newSubMapY;
    }
}