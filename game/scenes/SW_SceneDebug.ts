import { SW_CST } from '~/game/SW_CST';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';

export default class SW_SceneDebug extends SW_BaseScene {
  protected declare debugTextMapManager: Phaser.GameObjects.Text;

  constructor() {
    super({ key: SW_CST.SCENES.DEBUG });
  }

  // Preload
  ////////////////////////////////////////////////////////////////////////

  public preload(): void {}

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    this.debugTextMapManager = this.add.text(24, 24, '', {
      fontSize: '18px',
      color: 'white',
      stroke: 'black',
      strokeThickness: 3,
      // backgroundColor '#FFFFFF',
    });
  }

  public updateDebugMapManager(text: string): void {
    this.debugTextMapManager.setText(text);
  }
}
