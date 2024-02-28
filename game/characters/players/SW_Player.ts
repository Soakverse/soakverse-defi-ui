import Phaser from "phaser";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import { SW_Character } from "~/game/characters/SW_Character";
import { SW_DIRECTIONS, SW_DIRECTIONS_NO_DIAGONALE} from "~/game/characters/SW_CharacterMovementComponent";
import { SW_SpawnData } from "~/game/characters/SW_CharacterSpawner";
import { SW_InteractionComponent } from "~/game/characters/players/SW_InteractionComponent";
import { SW_PlayerInputComponent } from "./SW_PlayerInputComponent";

export class SW_Player extends SW_Character {
  declare public body: Phaser.Physics.Arcade.Body;

  /** How far a player can interact with entities around them */
  protected interactionRange: number = 30;

  /** Component used to interact with interactable entities */
  declare protected interactableComp: SW_InteractionComponent;

  declare protected inputComp: SW_PlayerInputComponent;

  /** Whether the player can be controlled. The control could be locked while interacting with something or during a dialogue */
  protected isControlLocked: boolean = false;

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
        : "player"
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

    this.isControlLocked = false;

    this.initIniteractableComponent();
    this.initInputComponent();
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

  protected initInputComponent(): void {
    this.inputComp = new SW_PlayerInputComponent(this);
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

  public postUpdate(): void {
    super.postUpdate();

    this.interactableComp.update();
  }

  public lockControls(): void {
    this.isControlLocked = true;
    this.stopWalking();
  }

  public unlockControls(): void {
    this.isControlLocked = false;
  }

  protected updateControls(): void {
    if (this.isControlLocked) {
      return;
    }

    this.emit("update");
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
    if (!this.isControlLocked) {
      this.interactableComp.interact();
    }
  }

  protected setRunState(value: boolean): void {
    super.setRunState(value);
    this.emit("runStateChanged", value);
  }
}
