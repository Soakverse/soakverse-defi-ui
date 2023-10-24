import { SW_CST } from "~/game/SW_CST";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import SW_GameUIScene from "~/game/scenes/SW_GameUIScene";

import { usePlayerStore } from "@/stores/game/player";
import { SW_ENUM_IVENTORY_OBJECT, SW_InventoryObject } from "~/game/inventory/SW_Inventory";
import { SW_Player } from "~/game/characters/players/SW_Player";
import { SW_CharacterSpawner } from "../characters/SW_CharacterSpawner";

const playerStore = usePlayerStore();

export default class SW_GameScene extends SW_BaseScene {
  public name: string;
  public nameText: any = null;

  /** Represents the UI in game */
  declare private UIscene: SW_GameUIScene;

  /** The current tiled map */
  declare private currentMap: Phaser.Tilemaps.Tilemap;
  declare private layerBackground: Phaser.Tilemaps.TilemapLayer;
  declare private layerForeground1: Phaser.Tilemaps.TilemapLayer;
  declare private layerForeground2: Phaser.Tilemaps.TilemapLayer;

  declare protected player: SW_Player;

  constructor() {
    super({ key: SW_CST.SCENES.GAME });
    this.name = playerStore.name;
  }

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    this.createMap();
    this.createPhysics();
    this.createCamera();
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

  private createMap(): void {
    this.currentMap = this.add.tilemap("cityMap");

    const tileset = this.currentMap.addTilesetImage("assetCityTiled", "assetCityTiled") as Phaser.Tilemaps.Tileset;
    const layerGround = this.currentMap.createLayer("Layer1", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer;
    this.layerBackground = this.currentMap.createLayer("Layer2", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer;

    this.createPlayer();

    this.layerForeground1 = this.currentMap.createLayer("Layer3", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer;
    this.layerForeground2 = this.currentMap.createLayer("Layer4", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer;

    const bounds = layerGround.getBounds();
    this.physics.world.setBounds(0, 0, bounds.width, bounds.height);
  }

  private createPlayer(): void {
      const playerSpawners = this.currentMap.createFromObjects("Characters", {name: "Player", classType: SW_CharacterSpawner}) as SW_CharacterSpawner[];
      const playerSpawner = playerSpawners[0]; // There should be only one player

      this.player = new SW_Player(this, playerSpawner.x, playerSpawner.y);
      this.player.init(playerSpawner.getSpawnData());

      playerSpawner.destroy();
  }

  private createCamera(): void {
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(SW_CST.GAME.ZOOM);
  }

  private createPhysics(): void
  {
      this.layerBackground.setCollisionByProperty({collides: true});
      this.layerForeground1.setCollisionByProperty({collides: true});

      this.physics.add.collider(this.player, this.layerBackground);
      this.physics.add.collider(this.player, this.layerForeground1);
  }

  private createUI(): void {
    this.UIscene = this.scene.get<SW_GameUIScene>(SW_CST.SCENES.GAME_UI);
    this.UIscene.events.on("inventoryObjectClicked", this.inventoryObjectClicked);
  }

  private createShortcuts(): void {
    const keys = this.input.keyboard?.addKeys({
      inventory: Phaser.Input.Keyboard.KeyCodes.O
    }, false) as { inventory: any };

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
