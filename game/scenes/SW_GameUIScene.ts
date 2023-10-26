import { SW_CST } from "~/game/SW_CST";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import { SW_InventoryWidget } from "~/game/inventory/SW_InventoryWidget";
import { SW_InventoryObject } from "~/game/inventory/SW_Inventory";

declare type SW_UIKeys = {
    inventory: Phaser.Input.Keyboard.Key;
}

export default class SW_GameUIScene extends SW_BaseScene {
    /** Keys to handle the menus */
    declare protected keys: SW_UIKeys;

    declare private inventoryWidget: SW_InventoryWidget;

    constructor() {
      super({ key: SW_CST.SCENES.GAME_UI });
    }

    // Create
    ////////////////////////////////////////////////////////////////////////

    public create(): void
    {
        this.initKeys();

        this.inventoryWidget = new SW_InventoryWidget(this, this.scale.displaySize.width * 0.5, 240);
        this.inventoryWidget.setVisible(false);
        this.inventoryWidget.on("objectClicked", (inventoryObjectData: SW_InventoryObject) => {
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

    public toggleInventory(): void
    {
        this.inventoryWidget.setVisible(!this.inventoryWidget.visible);
        this.events.emit("menuVisibilityChange", this.inventoryWidget.visible);
    }

    public updateInventory(newInventoryObjects: SW_InventoryObject[]) {
        this.inventoryWidget.updateInventory(newInventoryObjects);
      }
};