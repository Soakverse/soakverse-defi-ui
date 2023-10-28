import { SW_CST } from "~/game/SW_CST";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import { SW_PlayerInventoryWidget as SW_PlayerInventoryWidget } from "~/game/inventory/SW_PlayerInventoryWidget";
import { SW_InventoryObject } from "~/game/inventory/SW_Inventory";

declare type SW_UIKeys = {
    inventory: Phaser.Input.Keyboard.Key;
}

export default class SW_GameUIScene extends SW_BaseScene {
    /** Keys to handle the menus */
    declare protected keys: SW_UIKeys;

    declare private playerInventoryWidget: SW_PlayerInventoryWidget;

    constructor() {
      super({ key: SW_CST.SCENES.GAME_UI });
    }

    // Create
    ////////////////////////////////////////////////////////////////////////

    public create(): void
    {
        this.initKeys();

        this.playerInventoryWidget = new SW_PlayerInventoryWidget(this, this.scale.displaySize.width * 0.5, 240);
        this.playerInventoryWidget.setVisible(false);
        this.playerInventoryWidget.on("objectClicked", (inventoryObjectData: SW_InventoryObject) => {
            this.events.emit("inventoryObjectClicked", inventoryObjectData);
        });
    }

    protected initKeys(): void {
        if (this.input.keyboard) {
            this.keys = this.input.keyboard.addKeys({
                inventory: Phaser.Input.Keyboard.KeyCodes.ESC
            }, false) as SW_UIKeys;

            this.keys.inventory.on("down", this.toggleInventory, this);
        }
    }

    // Update
    ////////////////////////////////////////////////////////////////////////

    // Inventory
    ////////////////////////////////////////////////////////////////////////

    public openInventory(): void {
        this.playerInventoryWidget.setVisible(true);
        this.events.emit("menuVisibilityChange", true);
    }

    public toggleInventory(): void
    {
        this.playerInventoryWidget.setVisible(!this.playerInventoryWidget.visible);
        this.events.emit("menuVisibilityChange", this.playerInventoryWidget.visible);
    }

    public updatePlayerInventory(newInventoryObjects: SW_InventoryObject[]) {
        this.playerInventoryWidget.updateInventory(newInventoryObjects);
      }
};