import { Scene } from "phaser";
import { CST } from "~/game/CST";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import SW_GameUIScene from "~/game/scenes/SW_GameUIScene";

import { usePlayerStore } from "@/stores/game/player";
import { SW_ENUM_IVENTORY_OBJECT, SW_InventoryObject } from "~/game/inventory/SW_Inventory";

const playerStore = usePlayerStore();

export default class SW_GameScene extends SW_BaseScene {
  public name: string;
  public nameText: any = null;

  /** Represents the UI in game */
  declare private UIscene: SW_GameUIScene;

  constructor() {
    super({ key: CST.SCENES.GAME });
    this.name = playerStore.name;
  }

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    this.createUI();
    this.createShortcuts();

    this.updateInventory([
      {name: "Red Axe", description: "A badass axe!", image: "axeRed", type: SW_ENUM_IVENTORY_OBJECT.WEAPON},
      {name: "Blue Sword",  description: "A nice sword", image: "swordBlue", type: SW_ENUM_IVENTORY_OBJECT.ITEMS},
      {name: "Blue Shield", description: "A strong shield", image: "shieldBlue", type: SW_ENUM_IVENTORY_OBJECT.RUNES},
      {name: "Blue Ring", description: "Fits your hand well!", image: "ringBlue", type: SW_ENUM_IVENTORY_OBJECT.WEAPON},
      {name: "Red Shield", description: "This shield is strong like a rock", image: "shieldRed", type: SW_ENUM_IVENTORY_OBJECT.ITEMS},
      {name: "Red Sword", description: "Fear this sword!", image: "swordRed", type: SW_ENUM_IVENTORY_OBJECT.RUNES},
    ]);

    this.add.image(400, 300, "sky");
    this.nameText = this.add.text(0, 0, playerStore.name);
    const bomb = this.physics.add.image(400, 200, "bomb");

    bomb.setCollideWorldBounds(true);
    bomb.body.onWorldBounds = true; // enable worldbounds collision event
    bomb.setBounce(1);
    bomb.setVelocity(200, 20);

    this.sound.add("thud");
    this.physics.world.on("worldbounds", () => {
      this.sound.play("thud", { volume: 0.75 });
    });
  }

  private createUI(): void {
    this.UIscene = this.scene.get<SW_GameUIScene>(CST.SCENES.GAME_UI);
    this.UIscene.events.on("inventoryObjectClicked", this.inventoryObjectClicked);
  }

  private createShortcuts(): void {
    const keys = this.input.keyboard?.addKeys({
      inventory: Phaser.Input.Keyboard.KeyCodes.O
    }, false);

    if (keys) {
      keys.inventory.on("down", () => {
        this.UIscene.toggleInventory();
      }, this);
    }
  }

  // Update
  ////////////////////////////////////////////////////////////////////////

  public update(): void {
    this.name = playerStore.name;
    this.nameText.setText(playerStore.name);
  }

  public updateInventory(newInventoryObjects: SW_InventoryObject[]) {
    this.UIscene.updateInventory(newInventoryObjects);
  }

  protected inventoryObjectClicked(inventoryObjectData: SW_InventoryObject): void {
    playerStore.setName(`You clicked on ${inventoryObjectData.name}`);
  }
}
