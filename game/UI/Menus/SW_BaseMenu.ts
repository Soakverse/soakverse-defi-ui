import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_MenuManager } from './SW_MenuManager';

export class SW_BaseMenu extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;
  protected menuManager: SW_MenuManager;

  constructor(menuManager: SW_MenuManager, x: number, y: number) {
    super(menuManager.scene, x, y);
    this.scene.add.existing(this);

    this.menuManager = menuManager;
  }

  public hideMenu(): void {
    this.menuManager.hideMenu(this);
  }

  public showMenu(): void {
    this.menuManager.showMenu(this);
  }
}
