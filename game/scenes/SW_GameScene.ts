import { SW_CST } from "~/game/SW_CST";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import SW_GameUIScene from "~/game/scenes/SW_GameUIScene";

import { usePlayerStore } from "@/stores/game/player";
import { SW_ENUM_IVENTORY_OBJECT, SW_InventoryObject } from "~/game/inventory/SW_Inventory";
import { SW_DIRECTION, SW_DIRECTIONS } from "~/game/characters/SW_CharacterMovementComponent";
import { SW_Player } from "~/game/characters/players/SW_Player";
import { SW_CharacterSpawner, SW_SpawnData } from "~/game/characters/SW_CharacterSpawner";
import { SW_InteractionComponent } from "~/game/characters/players/SW_InteractionComponent";
import { SW_IInteractable } from "~/game/Interactable/Interactable";

import SW_Entrance from "~/game/gameObjects/SW_Entrance";
import SW_PlayerComputer from "~/game/gameObjects/SW_PlayerComputer";
import SW_Incubator from "~/game/gameObjects/SW_Incubator";
import SW_DialogueEntity from "~/game/gameObjects/SW_DialogueEntity";

const playerStore = usePlayerStore();

declare type GameSceneData = {
  currentMapName: string;
  currentMapAsset: string;
  lastMapName: string | undefined;
}

export default class SW_GameScene extends SW_BaseScene {
  public name: string;
  public nameText: any = null;

  /** Represents the UI in game */
  declare private UIscene: SW_GameUIScene;

  /** The current tiled map */
  declare private currentMap: Phaser.Tilemaps.Tilemap;
  declare private layerBackground1: Phaser.Tilemaps.TilemapLayer;
  declare private layerBackground2: Phaser.Tilemaps.TilemapLayer;
  declare private layerForeground1: Phaser.Tilemaps.TilemapLayer;
  declare private layerForeground2: Phaser.Tilemaps.TilemapLayer;

  declare private player: SW_Player;

  /** All entrances to join a new map (ex: a door from a building, an path etc...) */
  declare private entrances: Phaser.Physics.Arcade.StaticGroup;

  /** All entrances used to spawn the player */
  declare private entranceSpawners: SW_Entrance[];

  /** Any object the player can interact with */
  declare private interactableObjects: Phaser.Physics.Arcade.StaticGroup;

  declare private currentMapAssetKey: string;
  declare private currentMapName: string;
  declare private lastMapName: string | undefined;

  constructor() {
    super({ key: SW_CST.SCENES.GAME });
    this.name = playerStore.name;
  }

  // Init
  ////////////////////////////////////////////////////////////////////////

  public init(data: GameSceneData): void {
    this.currentMapAssetKey = data.currentMapAsset;
    this.currentMapName = data.currentMapName;
    this.lastMapName = data.lastMapName;
  }

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    this.addUniqueListener("postupdate", this.postUpdate, this);

    this.createMap();
    this.createPhysics();
    this.createCamera();
    this.createUI();

    this.nameText = this.add.text(0, 0, playerStore.name);
  }

  private createMap(): void {
    this.currentMap = this.add.tilemap(this.currentMapName);

    const tileset = this.currentMap.addTilesetImage(this.currentMapAssetKey, this.currentMapAssetKey) as Phaser.Tilemaps.Tileset;
    const layerGround = this.currentMap.createLayer("Layer1", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer;
    this.layerBackground1 = this.currentMap.createLayer("Layer2", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer;
    this.layerBackground2 = this.currentMap.createLayer("Layer3", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer;

    this.createEntrances();
    this.createInteractableObjects();
    this.createPlayer();

    this.layerForeground1 = this.currentMap.createLayer("Layer4", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer;
    this.layerForeground2 = this.currentMap.createLayer("Layer5", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer;

    const bounds = layerGround.getBounds();
    this.physics.world.setBounds(0, 0, bounds.width, bounds.height);
  }

  private createEntrances(): void {
    this.entrances = this.physics.add.staticGroup();
    this.entranceSpawners = [];

    const entranceSpawners = this.currentMap.createFromObjects("Characters", {name: "Entrance", classType: SW_Entrance}) as SW_Entrance[];
    for (const entrance of entranceSpawners) {
      if (entrance.isSpawner) {
        this.entranceSpawners.push(entrance);
      }
      else {
        this.entrances.add(entrance);
      }
      entrance.setVisible(entrance.texture.key != "__MISSING");
    }
  }

  private createInteractableObjects(): void {
    this.interactableObjects = this.physics.add.staticGroup();

    const objectTypeData = [
      { name: "PlayerComputer", isZone: true, classType: SW_PlayerComputer },
      { name: "Incubator", isZone: true, classType: SW_Incubator },
      { name: "DialogueEntity", isZone: true, classType: SW_DialogueEntity },
    ];

    for (const objectData of objectTypeData) {
      const interactableObjects = this.currentMap.createFromObjects("Objects", {name: objectData.name, classType: objectData.isZone ? Phaser.GameObjects.Image : objectData.classType }) as (Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.TextureCrop & Phaser.GameObjects.Components.Visible & Phaser.GameObjects.Components.Transform & Phaser.GameObjects.Components.ComputedSize)[];

      for (const interactableObject of interactableObjects) {
        if (objectData.isZone) {
          const classType = objectData.classType;
          const zone = new classType(this, interactableObject.x, interactableObject.y, interactableObject.width, interactableObject.height);
          zone.width = interactableObject.scaleX * 32;
          zone.height = interactableObject.scaleY * 32;

          for (const key in interactableObject.data.list) {
            zone[key] = interactableObject.data.list[key];
          }

          this.interactableObjects.add(zone);
          interactableObject.destroy();
        }
        else {
          this.interactableObjects.add(interactableObject);
        }
      }
    }
  }

  private createPlayer(): void {
    for (const entrance of this.entranceSpawners) {
      if (entrance.isSpawner && (entrance.mapName == this.lastMapName)) {
        const playerSpawnData = {
          name: "player",
          characterTexture: "player",
          startDirection: entrance.startDirection,
          walkSpeed: 110,
          runSpeed: 190
        } as SW_SpawnData;

        this.player = new SW_Player(this, entrance.x, entrance.y);
        this.player.init(playerSpawnData);
      }

      entrance.destroy();
    }

    this.entranceSpawners = [];
  }

  private createCamera(): void {
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(SW_CST.GAME.ZOOM);
  }

  private createPhysics(): void
  {
      this.layerBackground2.setCollisionByProperty({collides: true});
      this.layerForeground1.setCollisionByProperty({collides: true});

      this.physics.add.collider(this.player, this.layerBackground2);
      this.physics.add.collider(this.player, this.layerForeground1);

      this.physics.add.overlap(this.player, this.entrances, this.onPlayerEnter, this.canPlayerEnter, this);
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
    // this.name = playerStore.name;
    // this.nameText.setText(playerStore.name);

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

  protected canPlayerEnter(player: SW_Player, entrance: SW_Entrance): boolean {
    return player.getCurrentDirection() == entrance.enterDirection;
  }

  protected onPlayerEnter(player: SW_Player, entrance: SW_Entrance): void {
    this.scene.restart({currentMapName: entrance.mapName, currentMapAsset: entrance.mapAsset, lastMapName: this.currentMapName });
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
