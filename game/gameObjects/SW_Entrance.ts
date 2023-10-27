import SW_BaseScene from "~/game/scenes/SW_BaseScene";

export default class SW_Entrance extends Phaser.GameObjects.Image {
    declare public scene: SW_BaseScene;
    declare public body: Phaser.Physics.Arcade.StaticBody;

    /** Which map this entrance should open */
    public mapName: string = "";

    /** Which map image asset this entrance should use with mapName */
    public mapAsset: string = "";

    constructor(scene: SW_BaseScene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
      super(scene, x, y, texture, frame);
      this.scene.add.existing(this);
    }
}