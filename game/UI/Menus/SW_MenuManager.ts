declare type SW_MenuType = Phaser.GameObjects.Components.Depth &
  Phaser.GameObjects.Components.Visible;

export class SW_MenuManager extends Phaser.Events.EventEmitter {
  /**
   * All the visible menus this manager handles. The order of the array determines the Z-order of the menus.
   * The first menu from this array will be displayed behind the others. The last menu from this array will be displayed on top of the others
   */
  protected menus: SW_MenuType[];

  protected defaultMenu: SW_MenuType | undefined;

  constructor() {
    super();

    this.menus = [];
  }

  public setDefaultMenu(menu: SW_MenuType): void {
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

  public showMenu(menu: SW_MenuType, hideOtherMenus: boolean = false): void {
    if (menu.visible) {
      return;
    }

    if (hideOtherMenus) {
      this.hideAllMenus();
    }

    this.menus.push(menu);
    menu.setDepth(this.menus.length);
    menu.setVisible(true);
    this.emit('menuVisibilityChanged', true);
  }

  public hideAllMenus(): void {
    for (const menu of this.menus) {
      menu.setVisible(false);
    }
    this.menus = [];
    this.emit('menuVisibilityChanged', false);
  }

  public hideMenu(menu: SW_MenuType): void {
    menu.setVisible(false);
    Phaser.Utils.Array.Remove(this.menus, menu);
    this.emit('menuVisibilityChanged', this.hasVisibleMenu());
  }

  public hideFocusedMenu(): void {
    const removedMenu = this.menus.pop();
    if (removedMenu) {
      removedMenu.setVisible(false);
      this.emit('menuVisibilityChanged', this.hasVisibleMenu());
    }
  }
}
