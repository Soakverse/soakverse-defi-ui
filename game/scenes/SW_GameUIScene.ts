import { SW_CST } from '~/game/SW_CST';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_DialogQuest } from '../UI/Menus/dialogues/SW_DialogQuest';
import { SW_WizhMenu } from '../UI/Menus/WizhMenu/SW_WizhMenu';
import { SW_MenuManager } from '../UI/Menus/SW_MenuManager';
import { SW_PlayerActionsContainer } from '../UI/mobile/SW_PlayerActionsContainer';
import { SW_InGameMenu } from '../UI/Menus/InGameMenu/SW_InGameMenu';
import { SW_PlayerInputComponent } from '../characters/players/SW_PlayerInputComponent';
import { SW_Player } from '../characters/players/SW_Player';
import { SW_PlaceNamePanel } from '../UI/SW_PlaceNamePanel';
import { SW_BaseMenu } from '../UI/Menus/SW_BaseMenu';

export default class SW_GameUIScene extends SW_BaseScene {
  private declare menuManager: SW_MenuManager;

  private declare inGameMenu: SW_InGameMenu;
  private declare wizhMenu: SW_WizhMenu;

  private declare dialogQuest: SW_DialogQuest;

  private declare placeNamePanel: SW_PlaceNamePanel;
  private declare placeNamePanelTween: Phaser.Tweens.Tween | undefined;
  private currentPlaceName: string = '';

  private declare loadingScreen: SW_BaseMenu;

  private declare playerActionsContainer: SW_PlayerActionsContainer | undefined;

  private declare playerInputComponent: SW_PlayerInputComponent;

  constructor() {
    super({ key: SW_CST.SCENES.GAME_UI });
  }

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    if (SW_CST.GAME.IS_MOBILE) {
      this.createMobileWidgets();
    }

    this.placeNamePanel = new SW_PlaceNamePanel(this, 0, 0);
    this.placeNamePanel.setVisible(false);

    this.createMenus();
    this.createLoadingScreen();
  }

  public createMenus(): void {
    this.menuManager = new SW_MenuManager(this);
    this.menuManager.on(
      'menuVisibilityChanged',
      this.onMenuVisibilityChanged,
      this
    );

    this.inGameMenu = new SW_InGameMenu(
      this.menuManager,
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.57
    );

    this.menuManager.setDefaultMenu(this.inGameMenu);
    this.menuManager.hideMenu(this.inGameMenu);

    this.dialogQuest = new SW_DialogQuest(
      this.menuManager,
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.5
    );
    this.menuManager.hideMenu(this.dialogQuest);

    this.wizhMenu = new SW_WizhMenu(
      this.menuManager,
      SW_CST.GAME.WIDTH * 0.5,
      SW_CST.GAME.HEIGHT * 0.5
    );
    this.wizhMenu.on(
      'makeAWizhButtonClicked',
      this.onMakeAWizhButtonClicked,
      this
    );
    this.menuManager.hideMenu(this.wizhMenu);
  }

  public createLoadingScreen(): void {
    this.loadingScreen = new SW_BaseMenu(this.menuManager, 0, 0);
    this.loadingScreen.setSize(SW_CST.GAME.WIDTH, SW_CST.GAME.HEIGHT);

    const loadingScreenBackground = this.add.graphics();
    loadingScreenBackground.fillStyle(0x000000, 1.0);
    loadingScreenBackground.fillRect(
      0,
      0,
      this.loadingScreen.width,
      this.loadingScreen.height
    );
    loadingScreenBackground.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, SW_CST.GAME.WIDTH, SW_CST.GAME.HEIGHT),
      Phaser.Geom.Rectangle.Contains
    );

    this.loadingScreen.add(loadingScreenBackground);
    this.loadingScreen.setVisible(false);
  }

  public showLoadingScreen(): void {
    this.loadingScreen.setAlpha(1);
    this.menuManager.showMenu(this.loadingScreen);
  }

  public hideLoadingScreen(): void {
    this.tweens.add({
      targets: this.loadingScreen,
      alpha: 0,
      duration: 400,
      onComplete: () => {
        this.menuManager.hideMenu(this.loadingScreen);
      },
      callbackScope: this,
    });
  }

  public lockPlayerControls(): void {
    this.playerInputComponent?.lockControls();
  }

  public unlockPlayerControls(): void {
    this.playerInputComponent?.unlockControls();
  }

  protected onMenuVisibilityChanged(hasVisibleMenu: boolean): void {
    if (hasVisibleMenu) {
      this.lockPlayerControls();
    } else {
      this.unlockPlayerControls();
    }

    this.playerActionsContainer?.setVisible(!hasVisibleMenu);
  }

  protected onMakeAWizhButtonClicked(): void {
    this.menuManager.hideMenu(this.wizhMenu);
  }

  protected onSpaceButtonDown(): void {
    this.onNextPageButtonDown();
  }

  protected onNextPageButtonDown(): void {
    this.dialogQuest.continueDialog();
  }

  // Wizh menu
  ////////////////////////////////////////////////////////////////////////

  public showWizhWellMenu(): void {
    this.menuManager.showMenu(this.wizhMenu);
  }

  // Dialogue
  ////////////////////////////////////////////////////////////////////////

  public requestDialog(
    dialogID: string,
    dialogQuestionKey?: string | undefined
  ): void {
    this.dialogQuest.startDialog(dialogID, dialogQuestionKey);
  }

  protected createMobileWidgets(): void {
    this.playerActionsContainer = new SW_PlayerActionsContainer(
      this,
      SW_CST.GAME.WIDTH * 0.5,
      SW_CST.GAME.HEIGHT * 0.5
    );

    this.playerActionsContainer.on(
      'runButtonPressed',
      () => {
        this.events.emit('playerRequestToggleRunState');
      },
      this
    );
    this.playerActionsContainer.on(
      'interactButtonPressed',
      () => {
        this.events.emit('playerRequestInteract');
      },
      this
    );
    this.playerActionsContainer.on(
      'menuButtonPressed',
      () => {
        this.menuManager.showMenu(this.inGameMenu);
      },
      this
    );
  }

  public createInputPlayerComponent(player: SW_Player): void {
    this.playerInputComponent = new SW_PlayerInputComponent(player, this);
  }

  public onPlayerRunStateChanged(isPlayerRunning: boolean): void {
    if (this.playerActionsContainer) {
      this.playerActionsContainer.onPlayerRunStateChanged(isPlayerRunning);
    }
  }

  public updatePlaceName(placeName: string): void {
    if (placeName.length <= 0 || this.currentPlaceName == placeName) {
      return;
    }

    const margin = 12;
    this.currentPlaceName = placeName;

    this.placeNamePanel.setText(placeName);
    this.placeNamePanel.setPosition(
      this.placeNamePanel.width * 0.5 + margin,
      0
    );
    this.placeNamePanel.setVisible(true);
    this.placeNamePanel.setAlpha(0.0);

    if (this.placeNamePanelTween) {
      this.placeNamePanelTween.destroy();
    }

    this.placeNamePanelTween = this.tweens.add({
      targets: this.placeNamePanel,
      y: this.placeNamePanel.height * 0.5 + margin,
      duration: 200,
      alpha: 1.0,
      onComplete: () => {
        this.placeNamePanelTween = this.tweens.add({
          targets: this.placeNamePanel,
          x: this.placeNamePanel.x - 20,
          alpha: 0.0,
          delay: 1600,
          duration: 700,
          onComplete: () => {
            this.placeNamePanel.setVisible(false);
            this.placeNamePanelTween = undefined;
          },
          callbackScope: this,
        });
      },
      callbackScope: this,
    });
  }
}
