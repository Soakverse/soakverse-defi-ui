import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_TextButton } from '~/game/UI/buttons/SW_TextButton';

// TODO - Make a base menu file
export class SW_SettingsMenu extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;

  protected background: Phaser.GameObjects.Image;

  constructor(scene: SW_BaseScene, x: number, y: number) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.background = this.scene.add
      .image(0, 0, 'menuBackground')
      .setOrigin(0.5);
    this.add(this.background);

    this.width = this.background.width;
    this.height = this.background.height;

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

    const backButton = new SW_TextButton(this.scene, 0, 0, 'Back', {});
    this.add(backButton);
    backButton.onClicked(this.onBackButtonClicked, this);

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
    mainButtons.add(backButton);
    mainButtons.layout();
  }

  protected onToggleSoundButtonClicked(): void {}

  protected onBackButtonClicked(): void {
    this.emit('backButtonClicked');
  }

  protected onFullscreenButtonClicked(): void {
    if (this.scene.scale.isFullscreen) {
      this.scene.scale.stopFullscreen();
    } else {
      this.scene.scale.startFullscreen();
    }
  }
}
