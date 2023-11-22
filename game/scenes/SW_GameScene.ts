import { SW_CST } from "~/game/SW_CST";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import SW_GameUIScene from "~/game/scenes/SW_GameUIScene";

import { usePlayerStore } from "@/stores/game/player";
import { SW_InventoryObject } from "~/game/inventory/SW_Inventory";
import { SW_Player } from "~/game/characters/players/SW_Player";
import { SW_SpawnData } from "~/game/characters/SW_CharacterSpawner";
import { FocusType, SW_InteractionComponent } from "~/game/characters/players/SW_InteractionComponent";

import SW_Entrance from "~/game/gameObjects/SW_Entrance";
import SW_PlayerComputer from "~/game/gameObjects/SW_PlayerComputer";
import SW_Incubator from "~/game/gameObjects/SW_Incubator";
import SW_DialogueEntity from "~/game/gameObjects/SW_DialogueEntity";
import { SW_SubMapData, SW_MapManager } from "~/game/maps/SW_MapManager";

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

  declare private player: SW_Player;

  declare private currentMapAssetKey: string;
  declare private currentMapName: string;
  declare private lastMapName: string | undefined;

  declare private worldSubMapManager: SW_MapManager;

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

    this.createPlayer();
    
    this.worldSubMapManager = new SW_MapManager(this.player);

    this.createPhysics();
    this.createCamera();
    this.createUI();

    this.nameText = this.add.text(0, 0, playerStore.name);

    this.physics.world.setBounds(0, 0, 1000000, 1000000);
  }

  private createEntrances(): void {
    // this.entrances = this.physics.add.staticGroup();
    // this.entranceSpawners = [];

    // const entranceSpawners = this.currentMap.createFromObjects("Characters", {name: "Entrance", classType: SW_Entrance}) as SW_Entrance[];
    // for (const entrance of entranceSpawners) {
    //   if (entrance.isSpawner) {
    //     this.entranceSpawners.push(entrance);
    //   }
    //   else {
    //     this.entrances.add(entrance);
    //   }
    //   entrance.setVisible(entrance.texture.key != "__MISSING");
    // }
  }

  private createInteractableObjects(): void {
    // this.interactableObjects = this.physics.add.staticGroup();

    // const objectTypeData = [
    //   { name: "PlayerComputer", isZone: true, classType: SW_PlayerComputer },
    //   { name: "Incubator", isZone: true, classType: SW_Incubator },
    //   { name: "DialogueEntity", isZone: true, classType: SW_DialogueEntity },
    // ];

    // for (const objectData of objectTypeData) {
    //   const interactableObjects = this.currentMap.createFromObjects("Objects", {name: objectData.name, classType: objectData.isZone ? Phaser.GameObjects.Image : objectData.classType }) as (Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.TextureCrop & Phaser.GameObjects.Components.Visible & Phaser.GameObjects.Components.Transform & Phaser.GameObjects.Components.ComputedSize)[];

    //   for (const interactableObject of interactableObjects) {
    //     if (objectData.isZone) {
    //       const classType = objectData.classType;
    //       const zone = new classType(this, interactableObject.x, interactableObject.y, interactableObject.width, interactableObject.height);
    //       zone.width = interactableObject.scaleX * 32;
    //       zone.height = interactableObject.scaleY * 32;

    //       if (interactableObject.data && interactableObject.data.list) {
    //         for (const key in interactableObject.data.list) {
    //           // @ts-ignore
    //           zone[key] = interactableObject.data.list[key];
    //         }
    //       }

    //       this.interactableObjects.add(zone);
    //       interactableObject.destroy();
    //     }
    //     else {
    //       this.interactableObjects.add(interactableObject);
    //     }
    //   }
    // }
  }

  private createPlayer(): void {
    const playerSpawnData = {
      name: "player",
      characterTexture: "player",
      startDirection: "Down",
      walkSpeed: 340,
      runSpeed: 190
    } as SW_SpawnData;

    this.player = new SW_Player(this, 200, 200);
    this.player.init(playerSpawnData);

    // let playerEntrance: SW_Entrance | undefined;

    // for (const entrance of this.entranceSpawners) {
    //   if (entrance.isSpawner && (entrance.mapName == this.lastMapName)) {
    //     playerEntrance = entrance;
    //   }
    // }

    // // Take a a default entrance to at least spawn
    // if (playerEntrance == undefined) {
    //   console.error("No valid entrance was found. Using a default entrance");
    //   playerEntrance = this.entranceSpawners[0];
    // }

    // const playerSpawnData = {
    //   name: "player",
    //   characterTexture: "player",
    //   startDirection: playerEntrance.startDirection,
    //   walkSpeed: 110,
    //   runSpeed: 190
    // } as SW_SpawnData;

    // this.player = new SW_Player(this, playerEntrance.x, playerEntrance.y);
    // this.player.init(playerSpawnData);
    // this.player.setDepth(2);

    // for (const entrance of this.entranceSpawners) {
    //   entrance.destroy();
    // }

    // this.entranceSpawners = [];
  }

  private createCamera(): void {
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(SW_CST.GAME.ZOOM);
  }

  private createPhysics(): void
  {
      // this.layerBackground2.setCollisionByProperty({collides: true});
      // this.layerForeground1.setCollisionByProperty({collides: true});

      // this.physics.add.collider(this.player, this.layerBackground2);
      // this.physics.add.collider(this.player, this.layerForeground1);

      // this.physics.add.overlap(this.player, this.entrances, this.onPlayerEnter, this.canPlayerEnter, this);
      // this.physics.add.overlap(this.player.getInteractableComp(), this.interactableObjects, this.onPlayerOverlapInteractable, undefined, this);
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

    this.worldSubMapManager.update();    
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

  protected onPlayerOverlapInteractable(interactionComponent: SW_InteractionComponent, interactable: FocusType): void {
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

  public requestDialogue(message: string, title: string, iconTexture: string = "", iconFrame: string = ""): void
  {
      this.UIscene.requestDialogue(message, title, iconTexture, iconFrame);
      this.onMenuVisibilityChange(true);
  }
}
