import { SW_CST } from "~/game/SW_CST";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import SW_GameUIScene from "~/game/scenes/SW_GameUIScene";

import { usePlayerStore } from "@/stores/game/player";
import { SW_ENUM_IVENTORY_OBJECT, SW_InventoryObject } from "~/game/inventory/SW_Inventory";
import { SW_Player } from "~/game/characters/players/SW_Player";
import { SW_CharacterSpawner } from "~/game/characters/SW_CharacterSpawner";
import { SW_InteractionComponent } from "~/game/characters/players/SW_InteractionComponent";
import { SW_IInteractable } from "~/game/Interactable/Interactable";

import SW_Entrance from "~/game/gameObjects/SW_Entrance";
import SW_PlayerComputer from "~/game/gameObjects/SW_PlayerComputer";
import SW_Incubator from "~/game/gameObjects/SW_Incubator";

const playerStore = usePlayerStore();

declare type GameSceneData = {
  mapName: string;
  mapAsset: string;
}

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

  declare private player: SW_Player;

  /** All entrances to join a new map (ex: a door from a building, an path etc...) */
  declare private entrances: Phaser.Physics.Arcade.StaticGroup;

  /** Any object the player can interact with */
  declare private interactableObjects: Phaser.Physics.Arcade.StaticGroup;

  declare private mapAssetKey: string;
  declare private mapName: string;

  constructor() {
    super({ key: SW_CST.SCENES.GAME });
    this.name = playerStore.name;
  }

  // Init
  ////////////////////////////////////////////////////////////////////////

  public init(data: GameSceneData): void {
    this.mapAssetKey = data.mapAsset;
    this.mapName = data.mapName;
  }

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    this.addUniqueListener("postupdate", this.postUpdate, this);

    this.createMap();
    this.createPhysics();
    this.createCamera();
    this.createUI();

    this.updatePlayerInventory([
      {name: "Red Axe", description: "A badass axe!", image: "axeRed", type: SW_ENUM_IVENTORY_OBJECT.WEAPON},
      {name: "Blue Sword",  description: "A nice sword", image: "swordBlue", type: SW_ENUM_IVENTORY_OBJECT.ITEMS},
      {name: "Blue Shield", description: "A strong shield", image: "shieldBlue", type: SW_ENUM_IVENTORY_OBJECT.RUNES},
      {name: "Blue Ring", description: "Fits your hand well!", image: "ringBlue", type: SW_ENUM_IVENTORY_OBJECT.WEAPON},
      {name: "Red Shield", description: "This shield is strong like a rock", image: "shieldRed", type: SW_ENUM_IVENTORY_OBJECT.ITEMS},
      {name: "Red Sword", description: "Fear this sword!", image: "swordRed", type: SW_ENUM_IVENTORY_OBJECT.RUNES},
      {name: "Red Sword", description: "Fear this sword!", image: "swordRed", type: SW_ENUM_IVENTORY_OBJECT.RUNES},
      {name: "Red Sword", description: "Fear this sword!", image: "swordRed", type: SW_ENUM_IVENTORY_OBJECT.RUNES},
      {name: "Red Sword", description: "Fear this sword!", image: "swordRed", type: SW_ENUM_IVENTORY_OBJECT.RUNES},
    ]);

    this.nameText = this.add.text(0, 0, playerStore.name);
  }

  private createMap(): void {
    this.currentMap = this.add.tilemap(this.mapName);

    const tileset = this.currentMap.addTilesetImage(this.mapAssetKey, this.mapAssetKey) as Phaser.Tilemaps.Tileset;
    const layerGround = this.currentMap.createLayer("Layer1", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer;
    this.layerBackground = this.currentMap.createLayer("Layer2", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer;

    this.createEntrances();
    this.createInteractableObjects();
    this.createPlayer();

    this.layerForeground1 = this.currentMap.createLayer("Layer3", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer;
    this.layerForeground2 = this.currentMap.createLayer("Layer4", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer;

    const bounds = layerGround.getBounds();
    this.physics.world.setBounds(0, 0, bounds.width, bounds.height);
  }

  private createEntrances(): void {
    this.entrances = this.physics.add.staticGroup();

    const entranceSpawners = this.currentMap.createFromObjects("Characters", {name: "Entrance", classType: SW_Entrance}) as SW_Entrance[];
    for (const entrance of entranceSpawners) {
      this.entrances.add(entrance);
      entrance.setVisible(entrance.texture.key != "__MISSING");
    }
  }

  private createInteractableObjects(): void {
    this.interactableObjects = this.physics.add.staticGroup();

    const objectTypeData = [
      { name: "PlayerComputer", classType: SW_PlayerComputer },
      { name: "Incubator", classType: SW_Incubator }
    ]

    for (const objectData of objectTypeData) {
      const interactableObjects = this.currentMap.createFromObjects("Objects", {name: objectData.name, classType: objectData.classType }) as (Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.TextureCrop & Phaser.GameObjects.Components.Visible)[];
      for (const interactableObject of interactableObjects) {
        this.interactableObjects.add(interactableObject);
        interactableObject.setVisible(interactableObject.texture.key != "__MISSING");
      }
    }
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

      this.physics.add.overlap(this.player, this.entrances, this.onPlayerEnter, undefined, this);
      this.physics.add.overlap(this.player.getInteractableComp(), this.interactableObjects, this.onPlayerOverlapInteractable, undefined, this);
  }

  private createUI(): void {
    this.UIscene = this.scene.get(SW_CST.SCENES.GAME_UI) as SW_GameUIScene;

    this.UIscene.addUniqueListener("inventoryObjectClicked", this.inventoryObjectClicked);
    this.UIscene.addUniqueListener("menuVisibilityChange", this.onMenuVisibilityChange, this);
  }

  // Update
  ////////////////////////////////////////////////////////////////////////

  public update(time: number, delta: number): void {
    this.name = playerStore.name;
    this.nameText.setText(playerStore.name);

    this.player.update();
  }

  private postUpdate(sys: Phaser.Scenes.Systems, time: number, delta: number): void {
      this.player.postUpdate();
  }

  public openPlayerInventory(): void {
    this.UIscene.openPlayerInventory();
  }

  public openChestInventory(): void {
    this.UIscene.openChestInventory();
  }

  public updatePlayerInventory(newInventoryObjects: SW_InventoryObject[]): void {
    this.UIscene.updatePlayerInventory(newInventoryObjects);
  }

  public updateChestInventory(newInventoryObjects: SW_InventoryObject[]): void {
    this.UIscene.updateChestInventory(newInventoryObjects);
  }

  protected inventoryObjectClicked(inventoryObjectData: SW_InventoryObject): void {
    playerStore.setName(`You clicked on ${inventoryObjectData.name}`);
  }

  protected onPlayerEnter(player: SW_Player, entrance: SW_Entrance): void {
    this.scene.restart({ mapName: entrance.mapName, mapAsset: entrance.mapAsset });
  }

  protected onPlayerOverlapInteractable(interactionComponent: SW_InteractionComponent, interactable: SW_IInteractable): void {
    interactionComponent.onInteractableOverlapped(interactable);
  }

  protected onMenuVisibilityChange(isMenuVisible: boolean): void {
    if (isMenuVisible) {
      this.scene.pause(SW_CST.SCENES.GAME);
    }
    else {
      this.scene.resume(SW_CST.SCENES.GAME);
    }
  }
}
