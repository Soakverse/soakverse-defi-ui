import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import { SW_DIRECTION, SW_DIRECTIONS } from "~/game/characters/SW_CharacterMovementComponent";

export default class SW_Entrance extends Phaser.GameObjects.Image {
    declare public scene: SW_BaseScene;
    declare public body: Phaser.Physics.Arcade.StaticBody;

    /** Which map this entrance should open */
    public worldName: string = "";

    /** Which direction the player will be looking at once spawned in the new map*/
    public startDirection: SW_DIRECTION = SW_DIRECTIONS.Down;

    /** Which direction the player should be looking at to enter */
    public enterDirection: SW_DIRECTION = SW_DIRECTIONS.Down;

    constructor(scene: SW_BaseScene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
      super(scene, x, y, texture, frame);
      this.scene.add.existing(this);
    }
}