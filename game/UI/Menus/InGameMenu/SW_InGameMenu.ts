import { SW_CST } from '~/game/SW_CST';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_TextButton } from '~/game/UI/buttons/SW_TextButton';

// TODO - Make a base menu file
export class SW_InGameMenu extends Phaser.GameObjects.Container {
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

    const settingsButton = new SW_TextButton(this.scene, 0, 0, 'Settings', {});
    this.add(settingsButton);
    settingsButton.onClicked(this.onSettingButtonClicked, this);

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
    mainButtons.add(settingsButton);
    mainButtons.add(backButton);
    mainButtons.layout();
  }

  protected onSettingButtonClicked(): void {
    this.emit('settingsButtonClicked');
  }

  protected onBackButtonClicked(): void {
    this.emit('backButtonClicked');
  }
}
