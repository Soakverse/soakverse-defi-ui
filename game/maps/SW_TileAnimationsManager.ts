import SW_GameScene from "../scenes/SW_GameScene";
import { SW_MapManager } from "./SW_MapManager";

declare type SW_TileAnimationData = {
    gid: number;
    frames: number[];
    frameRate: number;
}

export class SW_TileAnimationsManager extends Phaser.Events.EventEmitter {
    private scene: SW_GameScene;
    private mapManager: SW_MapManager;
    private worldName: string;
    private tileAnimationJsonName: string;
    private animatableTiles: any;

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
        this.animatableTiles = this.scene.cache.json.get(this.tileAnimationJsonName);
        this.spriteSheetAnimToLoad = Object.keys(this.animatableTiles).length;

        for (const tileTexture in this.animatableTiles) {
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
        const tileDataArray = this.animatableTiles[tileTexture] as SW_TileAnimationData[];

        for (const tileData of tileDataArray) {
            this.scene.anims.create({ key: `${tileTexture}${tileData.gid}`,
                frames: this.scene.anims.generateFrameNumbers(`${tileTexture}`, { frames: tileData.frames }),
                frameRate: tileData.frameRate,
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
    }

    private clear(): void {
        this.animatedTilesPerLayer.forEach((animatedTiles: Phaser.GameObjects.Sprite[]) => {
            for (const animatedTile of animatedTiles) {
                animatedTile.destroy();
            }
        });
        this.animatedTilesPerLayer.clear();

        for (const tileTexture in this.animatableTiles) {
            const tileDataArray = this.animatableTiles[tileTexture] as SW_TileAnimationData[];
            for (const tileData of tileDataArray) {
                this.scene.anims.remove(`${tileTexture}${tileData.gid}`);
            }
            this.scene.textures.remove(tileTexture);
        }
        this.animatableTiles = this.scene.cache.json.remove("tileAnimations");
        
        this.mapManager.off("layerSpawned");
        this.mapManager.off("cleared");
    }

    private onLayerSpawned(layer: Phaser.Tilemaps.TilemapLayer, layerId: string, layerDepth: number): void {
        let animatedTiles = [] as Phaser.GameObjects.Sprite[];

        for (const tileTexture in this.animatableTiles) {
            const tileDataArray = this.animatableTiles[tileTexture] as SW_TileAnimationData[];
            for (const tileData of tileDataArray) {
                const singleAnimatedTiles = layer.createFromTiles(tileData.gid + 1, -1, { key: tileTexture }, this.scene);
                for (const animatedTile of singleAnimatedTiles) {
                    animatedTile.setOrigin(0, 0);
                    animatedTile.setDepth(layerDepth);
                    animatedTile.anims.play(`${tileTexture}${tileData.gid}`);
                }
                
                animatedTiles = animatedTiles.concat(singleAnimatedTiles);
            }
        }
        this.animatedTilesPerLayer.set(layerId, animatedTiles);
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