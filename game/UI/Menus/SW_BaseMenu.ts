import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_MenuManager } from './SW_MenuManager';

export class SW_BaseMenu extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;
  protected menuManager: SW_MenuManager;

  protected declare escapeKey: Phaser.Input.Keyboard.Key | undefined;

  constructor(menuManager: SW_MenuManager, x: number, y: number) {
    super(menuManager.scene, x, y);
    this.scene.add.existing(this);

    this.menuManager = menuManager;

    const keyboard = this.scene.input.keyboard;
    if (keyboard) {
      this.escapeKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }
  }

  public createKeys(): void {
    this.escapeKey?.on('down', this.onEscapeButtonDown, this);
  }

  public clearKeys(): void {
    this.escapeKey?.off('down', this.onEscapeButtonDown, this);
  }

  public hideMenu(): void {
    this.menuManager.hideMenu(this);
  }

  public showMenu(): void {
    this.menuManager.showMenu(this);
  }

  protected onEscapeButtonDown(): void {
    this.menuManager.hideMenu(this);
  }
}
