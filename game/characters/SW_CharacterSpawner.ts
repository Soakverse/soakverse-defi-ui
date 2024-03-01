import { SW_CST } from '~/game/SW_CST';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_DIRECTION, SW_DIRECTIONS } from './SW_CharacterMovementComponent';

export declare type SW_SpawnData = {
  /** The name of this character */
  name: string;

  /** Walk speed */
  walkSpeed: number;

  /** Run speed */
  runSpeed: number;

  /** The texture to use for the character */
  characterTexture: string;

  /** Which direction this character should look at */
  startDirection: SW_DIRECTION;
};

export class SW_CharacterSpawner extends Phaser.Physics.Arcade.Image {
  /** Walk speed */
  protected walkSpeed: number = 110;

  /** Run speed */
  protected runSpeed: number = 190;

  /** The texture to use for the character */
  protected characterTexture: string = '';

  /** Which direction this character should look at */
  protected startDirection: SW_DIRECTION = SW_DIRECTIONS.Right;

  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number | undefined
  ) {
    super(scene, x, y, texture, frame);
  }

  public getSpawnData(): SW_SpawnData {
    return {
      name: this.name,
      walkSpeed: this.walkSpeed,
      runSpeed: this.runSpeed,
      characterTexture: this.characterTexture,
      startDirection: this.startDirection,
    };
  }
}
