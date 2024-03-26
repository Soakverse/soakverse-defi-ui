import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_TextButton } from '~/game/UI/buttons/SW_TextButton';
import { SW_InGameMenuContent } from './SW_InGameMenuContent';
import { SW_InGameMenuContentConfig } from './SW_InGameMenuContent';

export class SW_SettingsMenuContent extends SW_InGameMenuContent {
  public declare scene: SW_BaseScene;

  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    config?: SW_InGameMenuContentConfig
  ) {
    super(scene, x, y, config);

    const soundButton = new SW_TextButton(this.scene, 0, 0, 'Toggle Sound');
    this.add(soundButton);
    soundButton.onClicked(this.onToggleSoundButtonClicked, this);

    const fullscreenButton = new SW_TextButton(
      this.scene,
      0,
      0,
      'Toggle Fullscreen'
    );
    this.add(fullscreenButton);
    fullscreenButton.onClicked(this.onFullscreenButtonClicked, this);

    const mainButtons = this.scene.rexUI.add.sizer({
      orientation: 'top-to-bottom',
      space: { top: 0, item: 10 },
      x: 0,
      y: 0,
    });
    mainButtons.setOrigin(0.5);

    this.add(mainButtons);
    mainButtons.add(soundButton);
    mainButtons.add(fullscreenButton);
    mainButtons.layout();
  }

  protected onToggleSoundButtonClicked(): void {}

  protected onFullscreenButtonClicked(): void {
    if (this.scene.scale.isFullscreen) {
      this.scene.scale.stopFullscreen();
    } else {
      this.scene.scale.startFullscreen();
    }
  }
}
