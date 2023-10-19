import { CST } from "~/game/CST";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import { SW_InventoryWidget } from "~/game/inventory/SW_InventoryWidget";

export default class SW_GameUIScene extends SW_BaseScene {
    declare private inventory: SW_InventoryWidget;

    constructor() {
      super({ key: CST.SCENES.GAME_UI });
    }

    // Create
    ////////////////////////////////////////////////////////////////////////

    public create(): void
    {
        this.add.text(100, 200, "Press O to toggle inventory");
        this.inventory = new SW_InventoryWidget(this, this.scale.displaySize.width * 0.5, 240);
        this.inventory.setVisible(false);
    }

    // Update
    ////////////////////////////////////////////////////////////////////////

    public toggleInventory(): void
    {
        this.inventory.setVisible(!this.inventory.visible);
    }
};