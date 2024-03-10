import { SW_TextButton } from '~/game/UI/buttons/SW_TextButton';
import { SW_BaseMenu } from '../SW_BaseMenu';
import { SW_MenuManager } from '../SW_MenuManager';

export class SW_InGameMenu extends SW_BaseMenu {
  protected background: Phaser.GameObjects.Image;

  constructor(menuManager: SW_MenuManager, x: number, y: number) {
    super(menuManager, x, y);
    this.scene.add.existing(this);

    this.background = this.scene.add.image(0, 0, 'menuBackground');
    this.background.setOrigin(0.5);
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
    this.menuManager.hideMenu(this);
  }
}
