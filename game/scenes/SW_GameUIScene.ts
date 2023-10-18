import { CST } from "~/game/CST";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";

export default class SW_GameUIScene extends SW_BaseScene {
    private inventory: Phaser.GameObjects.Image;

    constructor() {
      super({ key: CST.SCENES.GAME_UI });
    }

    // Create
    ////////////////////////////////////////////////////////////////////////

    public create(): void
    {
        this.add.text(200, 200, "Text from UI");
        this.inventory = this.add.image(300, 300, "");
    }

    // Update
    ////////////////////////////////////////////////////////////////////////

    public toggleInventory(): void
    {
        this.inventory.setVisible(!this.inventory.visible);
    }
};