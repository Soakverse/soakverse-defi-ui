import { SW_BaseMenu } from '../SW_BaseMenu';
import { SW_MenuManager } from '../SW_MenuManager';
import { SW_CharacterMenuContent } from './Contents/SW_CharacterMenuContent';
import { SW_InGameMenuContent } from './Contents/SW_InGameMenuContent';
import { SW_MonstersMenuContent } from './Contents/MonstersContent/SW_MonstersMenuContent';
import { SW_SettingsMenuContent } from './Contents/SW_SettingsMenuContent';
import { SW_MenuHeader } from './Header/SW_MenuHeader';

export class SW_InGameMenu extends SW_BaseMenu {
  protected declare headerBar: SW_MenuHeader;
  protected background: Phaser.GameObjects.Image;

  protected defaultContent: SW_InGameMenuContent | undefined;
  protected defaultSelectedButtonId: string | undefined;

  protected currentContent: SW_InGameMenuContent | undefined;
  protected declare characterContent: SW_CharacterMenuContent;
  protected declare monstersContent: SW_MonstersMenuContent;
  protected declare settingsContent: SW_SettingsMenuContent;

  constructor(menuManager: SW_MenuManager, x: number, y: number) {
    super(menuManager, x, y);
    this.scene.add.existing(this);

    this.background = this.scene.add.image(0, 0, 'inGameMenuBackground');
    this.background.setOrigin(0.5);
    this.add(this.background);

    this.width = this.scene.game.canvas.width;
    this.height = this.scene.game.canvas.height;

    this.createHeaderBar();
    this.createMenuContents();
  }

  protected createHeaderBar() {
    const headerHeight = 56;

    this.headerBar = new SW_MenuHeader(this.scene, -this.x, -this.y, {
      height: headerHeight,
      leftButtonsData: [
        {
          id: 'Character',
          icon: 'characterButton',
          text: 'Character',
          height: headerHeight,
          isSelectable: true,
          action: this.onCharacterButtonClicked,
          actionContext: this,
        },
        {
          id: 'Monsters',
          icon: 'eggzButton',
          text: 'Monsters',
          height: headerHeight,
          isSelectable: true,
          action: this.onMonstersButtonClicked,
          actionContext: this,
        },
      ],
      rightButtonsData: [
        {
          id: 'Settings',
          icon: 'settingsButton',
          text: 'Settings',
          height: headerHeight,
          isSelectable: true,
          action: this.onSettingButtonClicked,
          actionContext: this,
        },
        {
          id: 'Back',
          icon: 'backButton',
          text: 'Back',
          height: headerHeight,
          isSelectable: false,
          action: this.onBackButtonClicked,
          actionContext: this,
        },
      ],
    });
    this.add(this.headerBar);

    this.defaultSelectedButtonId = 'Settings';
  }

  protected createMenuContents() {
    this.settingsContent = new SW_SettingsMenuContent(this.scene, 0, 0, {
      width: this.background.width,
      height: this.background.height,
    });
    this.settingsContent.setVisible(false);
    this.add(this.settingsContent);

    this.monstersContent = new SW_MonstersMenuContent(this.scene, 0, 0, {
      width: this.background.width,
      height: this.background.height,
    });
    this.monstersContent.setVisible(false);
    this.add(this.monstersContent);

    this.characterContent = new SW_CharacterMenuContent(this.scene, 0, 0, {
      width: this.background.width,
      height: this.background.height,
    });
    this.characterContent.setVisible(false);
    this.add(this.characterContent);

    this.defaultContent = this.settingsContent;
  }

  public setVisible(value: boolean): this {
    if (value) {
      this.showDefaultContent();
    } else {
      this.currentContent?.setVisible(false);
      this.currentContent = undefined;
    }

    return super.setVisible(value);
  }

  public showDefaultContent(): void {
    this.showContent(this.defaultContent);
    this.headerBar.selectButtonById(this.defaultSelectedButtonId);
  }

  public showContent(content: SW_InGameMenuContent | undefined): void {
    if (this.currentContent) {
      this.currentContent.setVisible(false);
    }

    this.currentContent = content;

    if (this.currentContent) {
      this.currentContent.setVisible(true);
    }
  }

  protected onCharacterButtonClicked(): void {
    this.showContent(this.characterContent);
  }

  protected onMonstersButtonClicked(): void {
    this.showContent(this.monstersContent);
  }

  protected onSettingButtonClicked(): void {
    this.showContent(this.settingsContent);
  }

  protected onBackButtonClicked(): void {
    this.menuManager.hideMenu(this);
  }
}
