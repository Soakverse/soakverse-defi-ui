import SW_GameScene from "../scenes/SW_GameScene";
import { SW_MapManager } from "./SW_MapManager";

declare type SW_TileAnimationData = {
    frameRate: number;
    framesData: SW_TileAnimationFrameData[];
}

declare type SW_TileAnimationFrameData = {
    gid: number;
    frames: number[];
    frameRate?: number;
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
        const tileData = this.animatableTiles[tileTexture] as SW_TileAnimationData;

        for (const frameData of tileData.framesData) {
            const frameRate = frameData.frameRate ?? tileData.frameRate;
            this.scene.anims.create({ key: `${tileTexture}${frameData.gid}`,
                frames: this.scene.anims.generateFrameNumbers(`${tileTexture}`, { frames: frameData.frames }),
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
    }

    private clear(): void {
        this.animatedTilesPerLayer.forEach((animatedTiles: Phaser.GameObjects.Sprite[]) => {
            for (const animatedTile of animatedTiles) {
                animatedTile.destroy();
            }
        });
        this.animatedTilesPerLayer.clear();

        for (const tileTexture in this.animatableTiles) {
            const tileData = this.animatableTiles[tileTexture] as SW_TileAnimationData;
            for (const frameData of tileData.framesData) {
                this.scene.anims.remove(`${tileTexture}${frameData.gid}`);
            }
            this.scene.textures.remove(tileTexture);
        }

        this.scene.cache.json.remove("tileAnimations");
        this.mapManager.off("layerSpawned");
        this.mapManager.off("cleared");
    }

    private onLayerSpawned(layer: Phaser.Tilemaps.TilemapLayer, layerId: string, layerDepth: number): void {
        let allAnimatedTiles = [] as Phaser.GameObjects.Sprite[];

        for (const tileTexture in this.animatableTiles) {
            const tileData = this.animatableTiles[tileTexture] as SW_TileAnimationData;
            const animDelay = Phaser.Math.Between(0, 2000);

            for (const frameData of tileData.framesData) {
                const animatedTiles = layer.createFromTiles(frameData.gid, -1, { key: tileTexture }, this.scene);
                for (const animatedTile of animatedTiles) {
                    animatedTile.setOrigin(0, 0);
                    animatedTile.setDepth(layerDepth);
                    animatedTile.anims.play({ key: `${tileTexture}${frameData.gid}`, delay: animDelay, showBeforeDelay: true });
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