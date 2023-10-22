import { Scene } from "phaser";
import { SW_CST } from "~/game/SW_CST";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import SW_GameUIScene from "~/game/scenes/SW_GameUIScene";

import { usePlayerStore } from "@/stores/game/player";
import { SW_ENUM_IVENTORY_OBJECT, SW_InventoryObject } from "~/game/inventory/SW_Inventory";
import { SW_Player } from "~/game/characters/players/SW_Player";

const playerStore = usePlayerStore();

export default class SW_GameScene extends SW_BaseScene {
  public name: string;
  public nameText: any = null;

  declare protected player: SW_Player;

  /** Represents the UI in game */
  declare private UIscene: SW_GameUIScene;

  constructor() {
    super({ key: SW_CST.SCENES.GAME });
    this.name = playerStore.name;
  }

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    this.createCharacters();
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

    this.nameText = this.add.text(0, 0, playerStore.name);
  }

  private createCharacters(): void {
    this.player = new SW_Player(this, 100, 200);
    this.player.init();
  }

  private createUI(): void {
    this.UIscene = this.scene.get<SW_GameUIScene>(SW_CST.SCENES.GAME_UI);
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

    this.player.update();
  }

  public updateInventory(newInventoryObjects: SW_InventoryObject[]): void {
    this.UIscene.updateInventory(newInventoryObjects);
  }

  protected inventoryObjectClicked(inventoryObjectData: SW_InventoryObject): void {
    playerStore.setName(`You clicked on ${inventoryObjectData.name}`);
  }
}
