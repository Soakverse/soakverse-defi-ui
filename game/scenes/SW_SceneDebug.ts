import { SW_CST } from '~/game/SW_CST';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';

export default class SW_SceneDebug extends SW_BaseScene {
  protected declare debugTextMapManager: Phaser.GameObjects.Text;
  protected declare fpsText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: SW_CST.SCENES.DEBUG });
  }

  // Preload
  ////////////////////////////////////////////////////////////////////////

  public preload(): void {}

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    this.fpsText = this.add.text(this.game.canvas.width - 24, 16, '', {
      fontSize: '18px',
      color: 'white',
      stroke: 'black',
      strokeThickness: 3,
      // backgroundColor '#FFFFFF',
    });
    this.fpsText.setOrigin(1, 0);

    this.debugTextMapManager = this.add.text(24, 16, '', {
      fontSize: '18px',
      color: 'white',
      stroke: 'black',
      strokeThickness: 3,
      // backgroundColor '#FFFFFF',
    });
    this.debugTextMapManager.setOrigin(0, 0);
  }

  public updateDebugMapManager(text: string): void {
    this.debugTextMapManager.setText(text);
  }

  // Update
  ////////////////////////////////////////////////////////////////////////

  public update(): void {
    this.fpsText.setText(`${this.game.loop.actualFps.toFixed(1)} FPS`);
  }
}
