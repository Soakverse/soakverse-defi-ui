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
import { SW_DIRECTIONS } from "../characters/SW_CharacterMovementComponent";

const playerStore = usePlayerStore();

/** All the data of the game scene to initialize it */
declare type GameSceneData = {
  /** The name of the Tiled world. */
  worldName: string;

  /** The name of the previous world before reaching the new one. Ignored if startPosition is set */
  previousWorldName?: string;

  /** Where the player should start on this world. */
  startPosition?: Phaser.Math.Vector2;
}

export default class SW_GameScene extends SW_BaseScene {
  public name: string;
  public nameText: any = null;

  /** Represents the UI in game */
  declare private UIScene: SW_GameUIScene;

  declare private player: SW_Player;

  declare private worldName: string;
  declare private previousWorldName: string | undefined;
  declare private startPosition: Phaser.Math.Vector2 | undefined;

  declare private mapManager: SW_MapManager;

  constructor() {
    super({ key: SW_CST.SCENES.GAME });
    this.name = playerStore.name;
  }

  // Init
  ////////////////////////////////////////////////////////////////////////

  public init(data: GameSceneData): void {
    this.worldName = data.worldName;
    this.startPosition = data.startPosition;
    this.previousWorldName = data.previousWorldName;
  }

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    this.addUniqueListener("postupdate", this.postUpdate, this);
    
    this.mapManager = new SW_MapManager(this, this.worldName);

    const playerStartPosition = this.startPosition ? { position: this.startPosition, startDirection: SW_DIRECTIONS.Down }
                                                    : this.mapManager.findSpawnPosition(this.previousWorldName as string);

    this.player = new SW_Player(this, playerStartPosition.position.x, playerStartPosition.position.y);
    this.player.init({
      name: "player",
      characterTexture: "player",
      startDirection: playerStartPosition.startDirection,
      walkSpeed: SW_CST.GAME.PLAYER.WALK_SPEED,
      runSpeed: SW_CST.GAME.PLAYER.RUN_SPEED
    } as SW_SpawnData);

    this.mapManager.setPlayer(this.player);

    this.createCamera();
    this.createUI();

    this.nameText = this.add.text(0, 0, playerStore.name);
  }

  public createInteractableObjects(subMapData: SW_SubMapData, offsetX: number, offsetY: number): Phaser.Physics.Arcade.StaticGroup {
    const interactableObjectGroup = this.physics.add.staticGroup();

    const objectTypeData = [
      { name: "PlayerComputer", isZone: true, classType: SW_PlayerComputer },
      { name: "Incubator", isZone: true, classType: SW_Incubator },
      { name: "DialogueEntity", isZone: true, classType: SW_DialogueEntity },
    ];

    for (const objectData of objectTypeData) {
      const interactableObjects = subMapData.subMap.createFromObjects("Objects", {name: objectData.name, classType: objectData.isZone ? Phaser.GameObjects.Image : objectData.classType }) as (Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.TextureCrop & Phaser.GameObjects.Components.Visible & Phaser.GameObjects.Components.Transform & Phaser.GameObjects.Components.ComputedSize)[];
      for (const interactableObject of interactableObjects) {
        interactableObject.setPosition(interactableObject.x + offsetX, interactableObject.y + offsetY);

        if (objectData.isZone) {
          const classType = objectData.classType;
          const zone = new classType(this, interactableObject.x, interactableObject.y, interactableObject.width, interactableObject.height);
          zone.width = interactableObject.scaleX * 32;
          zone.height = interactableObject.scaleY * 32;

          if (interactableObject.data && interactableObject.data.list) {
            for (const key in interactableObject.data.list) {
              // @ts-ignore
              zone[key] = interactableObject.data.list[key];
            }
          }

          interactableObjectGroup.add(zone);
          interactableObject.destroy();
        }
        else {
          interactableObjectGroup.add(interactableObject);
        }
      }
    }
    return interactableObjectGroup;
  }

  private createCamera(): void {
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(SW_CST.GAME.ZOOM);
  }

  private createUI(): void {
    this.UIScene = this.scene.get(SW_CST.SCENES.GAME_UI) as SW_GameUIScene;

    this.UIScene.addUniqueListener("inventoryObjectClicked", this.inventoryObjectClicked);
    this.UIScene.addUniqueListener("menuVisibilityChange", this.onMenuVisibilityChange, this);
  }

  // Update
  ////////////////////////////////////////////////////////////////////////

  public update(time: number, delta: number): void {
    // this.name = playerStore.name;
    // this.nameText.setText(playerStore.name);

    this.mapManager.update();    
    this.player.update();
  }

  private postUpdate(sys: Phaser.Scenes.Systems, time: number, delta: number): void {
      this.player.postUpdate();
  }

  public openPlayerInventory(): void {
    this.UIScene.openPlayerInventory();
  }

  public openChestInventory(): void {
    this.UIScene.openChestInventory();
  }

  public updatePlayerInventory(newInventoryObjects: SW_InventoryObject[]): void {
    this.UIScene.updatePlayerInventory(newInventoryObjects);
  }

  public updateChestInventory(newInventoryObjects: SW_InventoryObject[]): void {
    this.UIScene.updateChestInventory(newInventoryObjects);
  }

  protected inventoryObjectClicked(inventoryObjectData: SW_InventoryObject): void {
    playerStore.setName(`You clicked on ${inventoryObjectData.name}`);
  }

  public canPlayerEnter(player: SW_Player, entrance: SW_Entrance): boolean {
    return player.getCurrentDirection() == entrance.enterDirection;
  }

  public onPlayerEnter(player: SW_Player, entrance: SW_Entrance): void {
    this.scene.restart({worldName: entrance.worldName, previousWorldName: this.worldName });
  }

  public onPlayerOverlapInteractable(interactionComponent: SW_InteractionComponent, interactable: FocusType): void {
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
      this.UIScene.requestDialogue(message, title, iconTexture, iconFrame);
      this.onMenuVisibilityChange(true);
  }
}
