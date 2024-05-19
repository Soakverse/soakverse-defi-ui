import { SW_CST } from '~/game/SW_CST';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_BaseMenu } from './SW_BaseMenu';

export class SW_MenuManager extends Phaser.Events.EventEmitter {
  protected _scene: SW_BaseScene;

  /**
   * All the visible menus this manager handles. The order of the array determines the Z-order of the menus.
   * The first menu from this array will be displayed behind the others. The last menu from this array will be displayed on top of the others
   */
  protected menus: SW_BaseMenu[];

  /**
   * Default menu to display/hide if required
   */
  protected defaultMenu: SW_BaseMenu | undefined;

  /** Background behind the focused menu to prevent interactions anywhere else */
  protected background: Phaser.GameObjects.Graphics;

  constructor(scene: SW_BaseScene) {
    super();

    this._scene = scene;

    this.menus = [];
    this.background = scene.add.graphics();
    this.background.fillStyle(0x000000, 0.5);
    this.background.fillRect(0, 0, SW_CST.GAME.WIDTH, SW_CST.GAME.HEIGHT);
    this.background.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, SW_CST.GAME.WIDTH, SW_CST.GAME.HEIGHT),
      Phaser.Geom.Rectangle.Contains
    );
    this.background.setVisible(false);
  }

  public get scene(): SW_BaseScene {
    return this._scene;
  }

  public setDefaultMenu(menu: SW_BaseMenu): void {
    if (this.defaultMenu != menu) {
      this.defaultMenu = menu;
    }
  }

  public hasVisibleMenu(): boolean {
    return this.menus.length > 0;
  }

  public showDefaultMenu(hideOtherMenus: boolean = false): void {
    if (this.defaultMenu && !this.defaultMenu.visible) {
      this.showMenu(this.defaultMenu, hideOtherMenus);
    }
  }

  public hideDefaultMenu(): void {
    if (this.defaultMenu && this.defaultMenu.visible) {
      this.hideMenu(this.defaultMenu);
    }
  }

  public showMenu(menu: SW_BaseMenu, hideOtherMenus: boolean = false): void {
    if (menu.visible) {
      return;
    }

    if (hideOtherMenus) {
      this.hideAllMenus();
    }

    this.menus.push(menu);
    menu.setDepth(this.menus.length);
    menu.setVisible(true);

    this.background.setVisible(true);
    this.emit('menuVisibilityChanged', true);
  }

  public hideAllMenus(): void {
    for (const menu of this.menus) {
      menu.setVisible(false);
    }
    this.menus = [];
    this.emit('menuVisibilityChanged', false);
  }

  public hideMenu(menu: SW_BaseMenu): void {
    menu.setVisible(false);
    Phaser.Utils.Array.Remove(this.menus, menu);

    this.background.setVisible(this.hasVisibleMenu());
    this.emit('menuVisibilityChanged', this.hasVisibleMenu());
  }

  public hideFocusedMenu(): void {
    const removedMenu = this.menus.pop();
    if (removedMenu) {
      removedMenu.setVisible(false);

      this.background.setVisible(this.hasVisibleMenu());
      this.emit('menuVisibilityChanged', this.hasVisibleMenu());
    }
  }
}
