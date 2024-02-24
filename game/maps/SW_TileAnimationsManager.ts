import SW_GameScene from "../scenes/SW_GameScene";
import { SW_MapManager } from "./SW_MapManager";

declare type SW_TileAnimationData = {
    /** Global gid offset to apply to all gid we will use. This is necessary if we use different tileset for a single Tiled map */
    startGid: number;

    /** All the tiles to animate per texture */
    animList: Record<string, SW_TileTextureData>;
}

declare type SW_TileTextureData = {
    /** Global default frame rate to apply on all tiles if they don't have a specific one */
    frameRate: number;

    /** The list of all anim usage for a given texture */
    animConfigs: SW_TileAnimConfig[];
}

declare type SW_TileAnimConfig = {
    /** Tile id that will be animated. The gid can be found on Tiled */
    gid: number;

    /** The frame indexes of the texture to animate the tile */
    frames: number[];

    /** Overrides the global frame rate if this tile needs a specific rate  */
    frameRate?: number;
}

export class SW_TileAnimationsManager extends Phaser.Events.EventEmitter {
    private scene: SW_GameScene;
    private mapManager: SW_MapManager;
    private worldName: string;
    private tileAnimationJsonName: string;
    declare private tileAnimationData: SW_TileAnimationData | undefined;

    private animatedTilesPerLayer: Map<string /** Layer id */, Phaser.GameObjects.Sprite[] /** Animated tiles */>;

    /** Number of spritesheet this manager needs to preload to animate the maps. The value will be set based on the world data from the mapManager
     * It will decrease to 0 once all the spritesheet have been preloaded. No animation will be done until then
     */
    private spriteSheetAnimToLoad: number = 0;

    constructor(mapManager: SW_MapManager) {
        super();

        this.scene = mapManager.getScene();

        this.mapManager = mapManager;
        this.mapManager.on("cleared", this.clear, this);

        this.worldName = this.mapManager.getWorldName();
        this.tileAnimationJsonName = `tileAnimations${this.worldName}`;

        this.animatedTilesPerLayer = new Map<string, Phaser.GameObjects.Sprite[]>();

        if (this.scene.cache.json.exists(this.tileAnimationJsonName)) {
            this.onTileAnimationJsonLoaded();
        }
        else {
            this.scene.load.once(`${Phaser.Loader.Events.FILE_KEY_COMPLETE}json-${this.tileAnimationJsonName}`, this.onTileAnimationJsonLoaded, this);
            this.scene.load.json(this.tileAnimationJsonName, `/game/assets/maps/${this.worldName}/tileAnimations/tileAnimations.json`);
            this.scene.load.start();
        }
    }

    private onTileAnimationJsonLoaded(): void {
        this.tileAnimationData = this.scene.cache.json.get(this.tileAnimationJsonName) as SW_TileAnimationData;
        this.spriteSheetAnimToLoad = Object.keys(this.tileAnimationData.animList).length;

        for (const tileTexture in this.tileAnimationData.animList) {
            if (this.scene.textures.exists(tileTexture)) {
                this.onTileTextureLoaded(tileTexture);
            }
            else {
                this.scene.load.once(`${Phaser.Loader.Events.FILE_KEY_COMPLETE}spritesheet-${tileTexture}`, this.onTileTextureLoaded, this);
                this.scene.load.spritesheet(tileTexture, `/game/assets/maps/${this.worldName}/tileAnimations/${tileTexture}.png`, { frameWidth: 32, frameHeight: 32 });
            }
        }
        this.scene.load.start();
    }

    private onTileTextureLoaded(tileTexture: string): void {
        if (!this.tileAnimationData) {
            console.warn("SW_TileAnimationsManager::onTileTextureLoaded - tileAnimationData is undefined");
            return;
        }

        const tileTextureData = this.tileAnimationData.animList[tileTexture];

        for (const animConfig of tileTextureData.animConfigs) {
            const frameRate = animConfig.frameRate ?? tileTextureData.frameRate;
            const gid = this.tileAnimationData.startGid + animConfig.gid;
            this.scene.anims.create({ key: `${tileTexture}${gid}`,
                frames: this.scene.anims.generateFrameNumbers(`${tileTexture}`, { frames: animConfig.frames }),
                frameRate: frameRate,
                repeat: Phaser.FOREVER
            });
        }

        --this.spriteSheetAnimToLoad;
        if (this.spriteSheetAnimToLoad <= 0) {
            this.onAllTileTexturesLoaded();
        }
    }

    private onAllTileTexturesLoaded(): void {
        this.mapManager.on("layerSpawned", this.onLayerSpawned, this);
        this.mapManager.on("layerCleared", this.onLayersCleared, this);

        const visibleLayersData = this.mapManager.getVisibleMapLayersData();
        console.log(visibleLayersData)
        for (const data of visibleLayersData) {
            this.onLayerSpawned(data.layer, data.layerId, data.layerDepth);
        }
    }

    private clear(): void {
        this.animatedTilesPerLayer.forEach((animatedTiles: Phaser.GameObjects.Sprite[]) => {
            for (const animatedTile of animatedTiles) {
                animatedTile.destroy();
            }
        });
        this.animatedTilesPerLayer.clear();

        if (this.tileAnimationData) {
            for (const tileTexture in this.tileAnimationData.animList) {
                const tileTextureData = this.tileAnimationData.animList[tileTexture];
                for (const animConfig of tileTextureData.animConfigs) {
                    this.scene.anims.remove(`${tileTexture}${this.tileAnimationData.startGid + animConfig.gid}`);
                }
                this.scene.textures.remove(tileTexture);
            }
        }
        else {
            console.warn("SW_TileAnimationsManager::clear - tileAnimationData is undefined");
            return;
        }

        this.scene.cache.json.remove("tileAnimations");
        this.mapManager.off("layerSpawned");
        this.mapManager.off("cleared");
    }

    private onLayerSpawned(layer: Phaser.Tilemaps.TilemapLayer, layerId: string, layerDepth: number): void {
        if (!this.tileAnimationData) {
            console.warn("SW_TileAnimationsManager::onLayerSpawned - tileAnimationData is undefined");
            return;
        }

        let allAnimatedTiles = [] as Phaser.GameObjects.Sprite[];

        for (const tileTexture in this.tileAnimationData.animList) {
            const tileTextureData = this.tileAnimationData.animList[tileTexture];
            const animDelay = Phaser.Math.Between(0, 2000);

            for (const animConfig of tileTextureData.animConfigs) {
                const gid = this.tileAnimationData.startGid + animConfig.gid;
                const animatedTiles = layer.createFromTiles(gid, -1, { key: tileTexture }, this.scene);
                for (const animatedTile of animatedTiles) {
                    animatedTile.setOrigin(0, 0);
                    animatedTile.setDepth(layerDepth);
                    animatedTile.anims.play({ key: `${tileTexture}${gid}`, delay: animDelay, showBeforeDelay: true });
                }

                allAnimatedTiles = allAnimatedTiles.concat(animatedTiles);
            }
        }
        this.animatedTilesPerLayer.set(layerId, allAnimatedTiles);
    }

    private onLayersCleared(layerIds: string[]): void {
        for (const layerId of layerIds) {
            this.onLayerCleared(layerId);
        }
    }

    private onLayerCleared(layerId: string): void {
        const animatedTiles = this.animatedTilesPerLayer.get(layerId);
        if (animatedTiles) {
            for (const animatedTile of animatedTiles) {
                animatedTile.destroy();
            }
        }
        this.animatedTilesPerLayer.delete(layerId);
    }
}