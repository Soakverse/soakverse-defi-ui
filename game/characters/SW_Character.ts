import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import {
  SW_CharacterMovementComponent,
  SW_DIRECTION,
  SW_DIRECTIONS,
} from './SW_CharacterMovementComponent';
import { SW_CST } from '../SW_CST';

export class SW_Character extends Phaser.Physics.Arcade.Sprite {
  public declare scene: SW_BaseScene;

  /** Whether this character is walking */
  protected isWalking: boolean = false;

  /** Whether this character wants to run */
  protected _wantsToRun: boolean = false;

  /** The component that handle the movements of this character */
  protected characterMovementComponent: SW_CharacterMovementComponent;

  /** The direction this character is looking at */
  protected currentDirection: SW_DIRECTION = SW_DIRECTIONS.Down;

  constructor(scene: SW_BaseScene, x: number, y: number) {
    super(scene, x, y, '__MISSING');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.allowGravity = false;
    this.setCollideWorldBounds(false);

    this.characterMovementComponent = new SW_CharacterMovementComponent(this);
  }

  public destroy(fromScene?: boolean | undefined): void {
    if (this.characterMovementComponent) {
      this.characterMovementComponent.destroy();
    }

    super.destroy(fromScene);
  }

  // Update
  ////////////////////////////////////////////////////////////////////////

  public update(): void {
    super.update();

    this.updateAnimations();
    this.updateControls();
  }

  public postUpdate(): void {}

  /** Update the anims of this Character */
  protected updateAnimations(): void {}

  /** Define the way to control this Character */
  protected updateControls(): void {}

  // Update
  ////////////////////////////////////////////////////////////////////////

  /** Set the direction this character is looking at */
  public setDirection(direction: SW_DIRECTION): void {
    this.currentDirection = direction;
  }

  public getCurrentDirection(): SW_DIRECTION {
    return this.currentDirection;
  }

  /** Move the character to the top */
  public walkUp(): void {
    this.isWalking = true;
    this.characterMovementComponent.walkUp();
  }

  /** Move the character to the bottom */
  public walkDown(): void {
    this.isWalking = true;
    this.characterMovementComponent.walkDown();
  }

  /** Move the character to the left */
  public walkOnLeft(): void {
    this.isWalking = true;
    this.characterMovementComponent.walkOnLeft();
  }

  /** Move the character to the right */
  public walkOnRight(): void {
    this.isWalking = true;
    this.characterMovementComponent.walkOnRight();
  }

  /** Move the character to the top left */
  public walkUpLeft(): void {
    this.isWalking = true;
    this.characterMovementComponent.walkUpLeft();
  }

  /** Move the character to the top right */
  public walkUpRight(): void {
    this.isWalking = true;
    this.characterMovementComponent.walkUpRight();
  }

  /** Move the character to the bottom left */
  public walkDownLeft(): void {
    this.isWalking = true;
    this.characterMovementComponent.walkDownLeft();
  }

  /** Move the character to the bottom right */
  public walkDownRight(): void {
    this.isWalking = true;
    this.characterMovementComponent.walkDownRight();
  }

  /** Stop all character movements */
  public stopWalking(): void {
    if (this.isWalking) {
      this.characterMovementComponent.stopWalking();
      this.isWalking = false;
    }
  }

  public wantsToRun(): boolean {
    return this._wantsToRun;
  }

  protected setRunState(value: boolean): void {
    this._wantsToRun = value;
  }

  public startRunning(): void {
    this.setRunState(true);
  }

  public stopRunning(): void {
    this.setRunState(false);
  }

  public toggleRunState(): void {
    this.setRunState(!this.wantsToRun());
  }
}
