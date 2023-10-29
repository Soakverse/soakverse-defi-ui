import { SW_CST } from "~/game/SW_CST";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import { SW_InventoryObject } from "~/game/inventory/SW_Inventory";
import { SW_PlayerInventoryWidget } from "~/game/inventory/SW_PlayerInventoryWidget";
import { SW_ChestInventoryWidget } from "~/game/inventory/SW_ChestInventoryWidget";

declare type SW_UIKeys = {
    menu: Phaser.Input.Keyboard.Key;
}

export default class SW_GameUIScene extends SW_BaseScene {
    /** Keys to handle the menus */
    declare protected keys: SW_UIKeys;

    declare private playerInventoryWidget: SW_PlayerInventoryWidget;
    declare private chestInventoryWidget: SW_ChestInventoryWidget;

    constructor() {
      super({ key: SW_CST.SCENES.GAME_UI });
    }

    // Create
    ////////////////////////////////////////////////////////////////////////

    public create(): void{
        this.initKeys();

        this.playerInventoryWidget = new SW_PlayerInventoryWidget(this, this.scale.displaySize.width * 0.25, 240);
        this.playerInventoryWidget.setVisible(false);
        this.playerInventoryWidget.on("objectClicked", (inventoryObjectData: SW_InventoryObject) => {
            this.events.emit("inventoryObjectClicked", inventoryObjectData);
        });

        this.chestInventoryWidget = new SW_ChestInventoryWidget(this, 0, 240);
        this.chestInventoryWidget.setX(this.scale.displaySize.width * 0.66 - this.chestInventoryWidget.width * 0.25);
        this.chestInventoryWidget.setVisible(false);
    }

    protected initKeys(): void {
        if (this.input.keyboard) {
            this.keys = this.input.keyboard.addKeys({
                menu: Phaser.Input.Keyboard.KeyCodes.ESC
            }, false) as SW_UIKeys;

            this.keys.menu.on("down", this.toggleMenus, this);
        }
    }

    // Update
    ////////////////////////////////////////////////////////////////////////

    // Inventory
    ////////////////////////////////////////////////////////////////////////

    public openPlayerInventory(): void {
        this.setPlayerInventoryVisibility(true);
    }

    public toggleMenus(): void
    {
        if (this.playerInventoryWidget.visible) {
            this.setPlayerInventoryVisibility(false);
            this.setChestInventoryVisibility(false);
        }
        else {
            this.setPlayerInventoryVisibility(true);
        }
    }

    protected setPlayerInventoryVisibility(isVisible: boolean): void {
        this.playerInventoryWidget.setX(this.scale.displaySize.width * 0.5 - this.playerInventoryWidget.width * 0.25);
        this.playerInventoryWidget.setVisible(isVisible);
        this.events.emit("menuVisibilityChange", this.playerInventoryWidget.visible);
    }

    public openChestInventory(): void {
        this.setPlayerInventoryVisibility(true);
        this.setChestInventoryVisibility(true);
    }

    public toggleChestInventory(): void
    {
        this.setPlayerInventoryVisibility(!this.playerInventoryWidget.visible);
    }

    protected setChestInventoryVisibility(isVisible: boolean): void {
        if (isVisible) {
            this.playerInventoryWidget.setX(this.scale.displaySize.width * 0.33 - this.playerInventoryWidget.width * 0.25);
        }
        
        this.chestInventoryWidget.setVisible(isVisible);
        this.events.emit("menuVisibilityChange", this.playerInventoryWidget.visible);
    }

    public updatePlayerInventory(newInventoryObjects: SW_InventoryObject[]) {
        this.playerInventoryWidget.updateInventory(newInventoryObjects);
    }

    public updateChestInventory(newInventoryObjects: SW_InventoryObject[]) {
        this.chestInventoryWidget.updateInventory(newInventoryObjects);
    }
};