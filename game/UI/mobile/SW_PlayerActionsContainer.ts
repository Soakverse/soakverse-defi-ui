import { SW_CST } from '~/game/SW_CST';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';

export class SW_PlayerActionsContainer extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;

  protected runButton: Phaser.GameObjects.Image;
  protected interactButton: Phaser.GameObjects.Image;

  constructor(scene: SW_BaseScene, x: number, y: number) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.width = SW_CST.GAME.WIDTH;
    this.height = SW_CST.GAME.HEIGHT;

    this.runButton = this.scene.add
      .image(this.width * 0.5 - 24, this.height * 0.5 - 24, 'walkButtonMobile')
      .setOrigin(1, 1);
    this.runButton.setInteractive();
    this.runButton.on(
      Phaser.Input.Events.POINTER_DOWN,
      this.onRunButtonPressed,
      this
    );
    this.runButton.on(
      Phaser.Input.Events.POINTER_UP,
      this.onRunButtonReleased,
      this
    );
    this.add(this.runButton);

    this.interactButton = this.scene.add
      .image(
        this.runButton.x - this.runButton.width - 16,
        this.height * 0.5 - 24,
        'interactButtonMobile'
      )
      .setOrigin(1, 1);
    this.interactButton.setInteractive();
    this.interactButton.on(
      Phaser.Input.Events.POINTER_DOWN,
      this.onInteractButtonPressed,
      this
    );
    this.add(this.interactButton);
  }

  private onRunButtonPressed(): void {
    this.emit('runButtonPressed');
  }

  private onRunButtonReleased(): void {
    this.emit('runButtonReleased');
  }

  private onInteractButtonPressed(): void {
    this.emit('interactButtonPressed');
  }

  public onPlayerRunStateChanged(isPlayerRunning: boolean): void {
    this.runButton.setTexture(
      isPlayerRunning ? 'runButtonMobile' : 'walkButtonMobile'
    );
  }
}
