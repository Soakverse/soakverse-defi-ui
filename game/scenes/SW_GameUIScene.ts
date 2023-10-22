import { SW_CST } from "~/game/SW_CST";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import { SW_InventoryWidget } from "~/game/inventory/SW_InventoryWidget";
import { SW_InventoryObject } from "~/game/inventory/SW_Inventory";

export default class SW_GameUIScene extends SW_BaseScene {
    declare private inventoryWidget: SW_InventoryWidget;

    constructor() {
      super({ key: SW_CST.SCENES.GAME_UI });
    }

    // Create
    ////////////////////////////////////////////////////////////////////////

    public create(): void
    {
        this.add.text(100, 200, "Press O to toggle inventory");
        this.inventoryWidget = new SW_InventoryWidget(this, this.scale.displaySize.width * 0.5, 240);
        this.inventoryWidget.setVisible(false);
        this.inventoryWidget.on("objectClicked", (inventoryObjectData: SW_InventoryObject) => {
            this.events.emit("inventoryObjectClicked", inventoryObjectData);
        });
    }

    // Update
    ////////////////////////////////////////////////////////////////////////

    // Inventory
    ////////////////////////////////////////////////////////////////////////

    public toggleInventory(): void
    {
        this.inventoryWidget.setVisible(!this.inventoryWidget.visible);
    }

    public updateInventory(newInventoryObjects: SW_InventoryObject[]) {
        this.inventoryWidget.updateInventory(newInventoryObjects);
      }
};