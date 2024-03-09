import Phaser from 'phaser';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_Character } from '~/game/characters/SW_Character';
import {
  SW_DIRECTIONS,
  SW_DIRECTIONS_NO_DIAGONALE,
} from '~/game/characters/SW_CharacterMovementComponent';
import { SW_SpawnData } from '~/game/characters/SW_CharacterSpawner';
import { SW_InteractionComponent } from '~/game/characters/players/SW_InteractionComponent';
import { SW_CST } from '~/game/SW_CST';

export class SW_Player extends SW_Character {
  public declare body: Phaser.Physics.Arcade.Body;

  /** How far a player can interact with entities around them */
  protected interactionRange: number = 30;

  /** Component used to interact with interactable entities */
  protected declare interactableComp: SW_InteractionComponent;

  constructor(scene: SW_BaseScene, x: number, y: number) {
    super(scene, x, y);
  }

  // Init
  ////////////////////////////////////////////////////////////////////////

  public init(spawnData: SW_SpawnData): void {
    this.setName(spawnData.name);
    this.initAnimations(
      spawnData.characterTexture.length > 0
        ? spawnData.characterTexture
        : 'player'
    );
    this.setDirection(spawnData.startDirection);

    this.characterMovementComponent.init(
      spawnData.walkSpeed,
      spawnData.runSpeed
    );

    this.setScale(0.8);
    this.body.setSize(28, 28);
    this.body.setOffset(36, 68);
    this.body.setCollideWorldBounds(true);

    this.initIniteractableComponent();
  }

  protected initIniteractableComponent(): void {
    this.interactableComp = new SW_InteractionComponent(
      this,
      this.x,
      this.y,
      this.interactionRange,
      this.interactionRange
    );
    this.interactableComp.body.setAllowGravity(false);
  }

  public getInteractableComp(): SW_InteractionComponent {
    return this.interactableComp;
  }

  public getInteractionRange(): number {
    return this.interactionRange;
  }

  protected initAnimations(texture: string): void {
    this.setTexture(texture);

    const directions = [
      SW_DIRECTIONS.Down,
      SW_DIRECTIONS.DownLeft,
      SW_DIRECTIONS.Left,
      SW_DIRECTIONS.DownRight,
      SW_DIRECTIONS.Right,
      SW_DIRECTIONS.UpLeft,
      SW_DIRECTIONS.Up,
      SW_DIRECTIONS.UpRight,
    ];

    for (let i = 0; i < directions.length; ++i) {
      const direction = directions[i];

      // TODO - Make this cleaner once we get the right assets
      const row = Math.floor(i * 0.5) * 12;
      const column = i % 2 == 0 ? 0 : 1;

      this.anims.create({
        key: `Idle${direction}`,
        frames: this.anims.generateFrameNumbers(texture, {
          start: row + column * 3 + 1,
          end: row + column * 3 + 1,
        }),
        frameRate: 1,
        repeat: 0,
      });

      this.anims.create({
        key: `Walk${direction}`,
        frames: this.anims.generateFrameNumbers(texture, {
          start: row + column * 3,
          end: row + (column + 1) * 3 - 1,
        }),
        frameRate: 6,
        repeat: -1,
      });

      this.anims.create({
        key: `Run${direction}`,
        frames: this.anims.generateFrameNumbers(texture, {
          start: row + column * 3 + 6,
          end: row + (column + 1) * 3 - 1 + 6,
        }),
        frameRate: 6,
        repeat: -1,
      });
    }
  }

  // Update
  ////////////////////////////////////////////////////////////////////////

  public update(): void {
    super.update();
    this.emit('update');
  }

  public postUpdate(): void {
    super.postUpdate();

    this.interactableComp.update();
  }

  protected updateAnimations(): void {
    if (this.isWalking) {
      if (this.wantsToRun()) {
        this.anims.play(`Run${this.currentDirection}`, true);
      } else {
        this.anims.play(`Walk${this.currentDirection}`, true);
      }
    } else {
      this.anims.play(`Idle${this.currentDirection}`, true);
    }
  }

  public interact(): void {
    this.interactableComp.interact();
  }

  protected setRunState(value: boolean): void {
    super.setRunState(value);
    this.emit('runStateChanged', value);
  }
}
