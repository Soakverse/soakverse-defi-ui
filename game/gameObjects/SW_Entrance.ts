import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import {
  SW_DIRECTION,
  SW_DIRECTIONS,
} from '~/game/characters/SW_CharacterMovementComponent';

export default class SW_Entrance extends Phaser.GameObjects.Image {
  public declare scene: SW_BaseScene;
  public declare body: Phaser.Physics.Arcade.StaticBody;

  /** Which map this entrance should open */
  public worldName: string = '';

  /** The spawn id to determine where the player should spawn in the given world */
  public spawnPositionName: string = '';

  /** Which direction the player will be looking at once spawned in the new map*/
  public startDirection: SW_DIRECTION = SW_DIRECTIONS.Down;

  /** Which direction the player should be looking at to enter */
  public enterDirection: SW_DIRECTION = SW_DIRECTIONS.Down;

  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number | undefined
  ) {
    super(scene, x, y, texture, frame);
    this.scene.add.existing(this);
  }
}
