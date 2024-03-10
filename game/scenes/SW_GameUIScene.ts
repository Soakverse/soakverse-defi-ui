import { SW_CST } from '~/game/SW_CST';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import {
  SW_ENUM_IVENTORY_OBJECT,
  SW_InventoryObject,
} from '~/game/inventory/SW_Inventory';
import { SW_PlayerInventoryWidget } from '~/game/inventory/SW_PlayerInventoryWidget';
import { SW_ChestInventoryWidget } from '~/game/inventory/SW_ChestInventoryWidget';
import { SW_DialogQuest } from '../dialogues/SW_DialogQuest';
import { SW_WizhMenu } from '../UI/Menus/WizhMenu/SW_WizhMenu';
import { SW_MenuManager } from '../UI/Menus/SW_MenuManager';
import { SW_DialogTextBox } from '../dialogues/SW_DialogTextBox';
import { SW_PlayerActionsContainer } from '../UI/mobile/SW_PlayerActionsContainer';
import { SW_InGameMenu } from '../UI/Menus/InGameMenu/SW_InGameMenu';
import { SW_PlayerInputComponent } from '../characters/players/SW_PlayerInputComponent';
import { SW_Player } from '../characters/players/SW_Player';
import { SW_SettingsMenu } from '../UI/Menus/InGameMenu/SW_SettingsMenu';

declare type SW_UIKeys = {
  escape: Phaser.Input.Keyboard.Key;
  space: Phaser.Input.Keyboard.Key;
  nextPage: Phaser.Input.Keyboard.Key;
};

export default class SW_GameUIScene extends SW_BaseScene {
  /** Keys to handle the menus */
  protected declare keys: SW_UIKeys;

  private declare menuManager: SW_MenuManager;

  private declare inGameMenu: SW_InGameMenu;
  private declare settingsMenu: SW_SettingsMenu;
  private declare wizhMenu: SW_WizhMenu;

  private declare dialogQuest: SW_DialogQuest;
  private declare dialogTextBox: SW_DialogTextBox;

  private declare playerInventoryWidget: SW_PlayerInventoryWidget;
  private declare chestInventoryWidget: SW_ChestInventoryWidget;

  private declare loadingScreen: Phaser.GameObjects.Graphics;

  private declare playerActionsContainer: SW_PlayerActionsContainer | undefined;

  private declare playerInputComponent: SW_PlayerInputComponent;

  constructor() {
    super({ key: SW_CST.SCENES.GAME_UI });
  }

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    this.menuManager = new SW_MenuManager(this);
    this.menuManager.on(
      'menuVisibilityChanged',
      this.onMenuVisibilityChanged,
      this
    );

    this.createKeys();
    this.createDialogQuest();

    if (SW_CST.GAME.IS_MOBILE) {
      this.createMobileWidgets();
    }

    this.inGameMenu = new SW_InGameMenu(
      this,
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.5
    );
    this.inGameMenu.on('resumeButtonClicked', this.onResumeButtonClicked, this);
    this.inGameMenu.on('backButtonClicked', this.onResumeButtonClicked, this);
    this.inGameMenu.on(
      'settingsButtonClicked',
      this.onSettingsButtonClicked,
      this
    );

    this.menuManager.setDefaultMenu(this.inGameMenu);
    this.menuManager.hideMenu(this.inGameMenu);

    this.settingsMenu = new SW_SettingsMenu(
      this,
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.5
    );
    this.settingsMenu.on(
      'backButtonClicked',
      () => {
        this.menuManager.hideMenu(this.settingsMenu);
      },
      this
    );

    this.menuManager.hideMenu(this.settingsMenu);

    this.playerInventoryWidget = new SW_PlayerInventoryWidget(
      this,
      this.scale.displaySize.width * 0.25,
      240
    );
    this.playerInventoryWidget.on(
      'moveObject',
      this.onMovePlayerInventoryMoveObject,
      this
    );
    this.menuManager.hideMenu(this.playerInventoryWidget);

    this.chestInventoryWidget = new SW_ChestInventoryWidget(this, 0, 240);
    this.chestInventoryWidget.setX(
      this.scale.displaySize.width * 0.66 -
        this.chestInventoryWidget.width * 0.25
    );
    this.chestInventoryWidget.on(
      'objectClicked',
      this.onMoveChestInventoryObject,
      this
    );
    this.menuManager.hideMenu(this.chestInventoryWidget);

    this.updatePlayerInventory([
      {
        name: 'Red Axe',
        id: 'object1',
        description: 'A badass axe!',
        image: 'axeRed',
        type: SW_ENUM_IVENTORY_OBJECT.WEAPON,
        quantity: 1,
      },
      {
        name: 'Blue Sword',
        id: 'object2',
        description: 'A nice sword',
        image: 'swordBlue',
        type: SW_ENUM_IVENTORY_OBJECT.ITEMS,
        quantity: 1,
      },
      {
        name: 'Blue Shield',
        id: 'object3',
        description: 'A strong shield',
        image: 'shieldBlue',
        type: SW_ENUM_IVENTORY_OBJECT.RUNES,
        quantity: 13,
      },
      {
        name: 'Blue Ring',
        id: 'object4',
        description: 'Fits your hand well!',
        image: 'ringBlue',
        type: SW_ENUM_IVENTORY_OBJECT.WEAPON,
        quantity: 3,
      },
      {
        name: 'Red Shield',
        id: 'object5',
        description: 'This shield is strong like a rock',
        image: 'shieldRed',
        type: SW_ENUM_IVENTORY_OBJECT.ITEMS,
        quantity: 1,
      },
      {
        name: 'Red Sword',
        id: 'object6',
        description: 'Fear this sword!',
        image: 'swordRed',
        type: SW_ENUM_IVENTORY_OBJECT.RUNES,
        quantity: 10,
      },
      {
        name: 'Red Sword',
        id: 'object7',
        description: 'Fear this sword!',
        image: 'swordRed',
        type: SW_ENUM_IVENTORY_OBJECT.RUNES,
        quantity: 1,
      },
      {
        name: 'Red Sword',
        id: 'object8',
        description: 'Fear this sword!',
        image: 'swordRed',
        type: SW_ENUM_IVENTORY_OBJECT.RUNES,
        quantity: 41,
      },
      {
        name: 'Red Sword',
        id: 'object9',
        description: 'Fear this sword!',
        image: 'swordRed',
        type: SW_ENUM_IVENTORY_OBJECT.RUNES,
        quantity: 1,
      },
    ]);

    this.updateChestInventory([
      {
        name: 'Red Sword',
        id: 'object10',
        description: 'Fear this sword!',
        image: 'swordBlue',
        type: SW_ENUM_IVENTORY_OBJECT.RUNES,
        quantity: 1,
      },
      {
        name: 'Red Sword',
        id: 'object11',
        description: 'Fear this sword!',
        image: 'swordRed',
        type: SW_ENUM_IVENTORY_OBJECT.RUNES,
        quantity: 3,
      },
      {
        name: 'Red Sword',
        id: 'object12',
        description: 'Fear this sword!',
        image: 'swordRed',
        type: SW_ENUM_IVENTORY_OBJECT.RUNES,
        quantity: 5,
      },
    ]);

    this.wizhMenu = new SW_WizhMenu(
      this,
      SW_CST.GAME.WIDTH * 0.5,
      SW_CST.GAME.HEIGHT * 0.5
    );
    this.wizhMenu.on(
      'makeAWizhButtonClicked',
      this.onMakeAWizhButtonClicked,
      this
    );
    this.menuManager.hideMenu(this.wizhMenu);

    this.loadingScreen = this.add.graphics();
    this.loadingScreen.fillStyle(0x000000, 1.0);
    this.loadingScreen.fillRect(0, 0, SW_CST.GAME.WIDTH, SW_CST.GAME.HEIGHT);
    this.loadingScreen.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, SW_CST.GAME.WIDTH, SW_CST.GAME.HEIGHT),
      Phaser.Geom.Rectangle.Contains
    );
    this.loadingScreen.setVisible(false);
  }

  protected createKeys(): void {
    if (this.input.keyboard) {
      this.keys = this.input.keyboard.addKeys(
        {
          escape: Phaser.Input.Keyboard.KeyCodes.ESC,
          space: Phaser.Input.Keyboard.KeyCodes.SPACE,
          nextPage: Phaser.Input.Keyboard.KeyCodes.ENTER,
        },
        false
      ) as SW_UIKeys;

      this.keys.escape.on('down', this.onEscapeButtonDown, this);
      this.keys.space.on('down', this.onSpaceButtonDown, this);
      this.keys.nextPage.on('down', this.onNextPageButtonDown, this);
    }
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
    this.playerInputComponent.lockControls();
  }

  public unlockPlayerControls(): void {
    this.playerInputComponent.unlockControls();
  }

  protected onMenuVisibilityChanged(hasVisibleMenu: boolean): void {
    this.events.emit('menuVisibilityChanged', hasVisibleMenu);
  }

  protected onResumeButtonClicked(): void {
    this.menuManager.hideMenu(this.inGameMenu);
  }

  protected onSettingsButtonClicked(): void {
    this.menuManager.showMenu(this.settingsMenu);
  }

  protected onMovePlayerInventoryMoveObject(
    inventoryObjectData: SW_InventoryObject,
    quantity: number
  ): void {
    if (this.chestInventoryWidget.visible) {
      this.playerInventoryWidget.removeObject(inventoryObjectData, quantity);
      this.chestInventoryWidget.addObject(inventoryObjectData, quantity);
    }
  }

  protected onMoveChestInventoryObject(
    objectIndex: number,
    inventoryObjectData: SW_InventoryObject
  ): void {
    // TODO: Do same logic as player inventory
    // if (this.chestInventoryWidget.visible) {
    //     this.chestInventoryWidget.removeObjectAt(objectIndex);
    //     this.playerInventoryWidget.addObject(inventoryObjectData);
    // }
  }

  protected onMakeAWizhButtonClicked(): void {
    this.menuManager.hideMenu(this.wizhMenu);
  }

  protected onEscapeButtonDown(): void {
    // if (this.dialogQuest.isQuestActive()) {
    //     // TODO: Try close dialog when it's allowed. I feel that there could be situations where we don't want that
    // }
    if (this.dialogTextBox.visible) {
      this.dialogTextBox.stop(true);
      this.dialogTextBox.closeDialogue();
      this.menuManager.hideMenu(this.dialogTextBox);
    } else if (this.menuManager.hasVisibleMenu()) {
      this.menuManager.hideFocusedMenu();
    } else {
      this.menuManager.showDefaultMenu();
    }
  }

  protected onSpaceButtonDown(): void {
    this.onNextPageButtonDown();
  }

  protected onNextPageButtonDown(): void {
    if (this.dialogTextBox.visible) {
      if (this.dialogTextBox.isTyping) {
        this.dialogTextBox.stop(true);
      } else if (this.dialogTextBox.isLastPage) {
        this.dialogTextBox.closeDialogue();
        this.menuManager.hideMenu(this.dialogTextBox);
      } else {
        this.dialogTextBox.typeNextPage();
      }
    }
    // if (this.dialogQuest.isQuestActive()) {
    //     this.dialogQuest.continueDialog();
    // }
  }

  // Menus
  ////////////////////////////////////////////////////////////////////////

  public showWizhWellMenu(): void {
    this.menuManager.showMenu(this.wizhMenu);
  }

  // Inventory
  ////////////////////////////////////////////////////////////////////////

  public openPlayerInventory(): void {
    this.setPlayerInventoryVisibility(true);
  }

  public toggleInventoryMenus(): void {
    if (this.playerInventoryWidget.visible) {
      this.setPlayerInventoryVisibility(false);
      this.setChestInventoryVisibility(false);
    } else {
      this.setPlayerInventoryVisibility(true);
    }
  }

  // TODO: Review the visibility functions below with menu manager
  protected setPlayerInventoryVisibility(isVisible: boolean): void {
    this.playerInventoryWidget.setX(
      this.scale.displaySize.width * 0.5 -
        this.playerInventoryWidget.width * 0.25
    );
    this.playerInventoryWidget.setVisible(isVisible);
  }

  public openChestInventory(): void {
    this.setPlayerInventoryVisibility(true);
    this.setChestInventoryVisibility(true);
  }

  public toggleChestInventory(): void {
    this.setPlayerInventoryVisibility(!this.playerInventoryWidget.visible);
  }

  protected setChestInventoryVisibility(isVisible: boolean): void {
    if (isVisible) {
      this.playerInventoryWidget.setX(
        this.scale.displaySize.width * 0.33 -
          this.playerInventoryWidget.width * 0.25
      );
    }

    this.chestInventoryWidget.setVisible(isVisible);
  }

  public updatePlayerInventory(newInventoryObjects: SW_InventoryObject[]) {
    this.playerInventoryWidget.updateInventory(newInventoryObjects);
  }

  public updateChestInventory(newInventoryObjects: SW_InventoryObject[]) {
    this.chestInventoryWidget.updateInventory(newInventoryObjects);
  }

  // Dialogue
  ////////////////////////////////////////////////////////////////////////

  protected createDialogQuest(): void {
    // this.dialogQuest = new SW_DialogQuest(this, {
    //     x: this.cameras.main.width * 0.5,
    //     y: this.cameras.main.height - 24,
    //     originX: 0.5,
    //     originY: 1,
    //     width: SW_CST.GAME.WIDTH - 100
    // });
    this.dialogTextBox = new SW_DialogTextBox(this, {
      x: SW_CST.GAME.WIDTH * 0.5,
      y: SW_CST.GAME.HEIGHT - 12,
      width: SW_CST.GAME.WIDTH - 100,
      height: 80,
      page: { maxLines: 3, pageBreak: '\n' },
    });

    this.dialogTextBox.on(
      Phaser.Input.Events.POINTER_DOWN,
      this.onNextPageButtonDown,
      this
    );

    this.dialogTextBox.setOrigin(0.5, 1);
    this.dialogTextBox.layout();
  }

  public requestDialogue(dialogue: string): void {
    // this.dialogQuest.start();
    this.menuManager.showMenu(this.dialogTextBox);
    this.dialogTextBox.showMessage(dialogue);
  }

  protected createMobileWidgets(): void {
    this.playerActionsContainer = new SW_PlayerActionsContainer(
      this,
      SW_CST.GAME.WIDTH * 0.5,
      SW_CST.GAME.HEIGHT * 0.5
    );
    this.playerActionsContainer.setDepth(1);

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
}
