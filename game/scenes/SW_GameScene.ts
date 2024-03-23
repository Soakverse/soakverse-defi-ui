import { SW_CST } from '~/game/SW_CST';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import SW_GameUIScene from '~/game/scenes/SW_GameUIScene';

import { usePlayerStore } from '@/stores/game/player';
import { SW_InventoryObject } from '~/game/inventory/SW_Inventory';
import { SW_Player } from '~/game/characters/players/SW_Player';
import { SW_SpawnData } from '~/game/characters/SW_CharacterSpawner';
import {
  FocusType,
  SW_InteractionComponent,
} from '~/game/characters/players/SW_InteractionComponent';

import SW_Entrance from '~/game/gameObjects/SW_Entrance';
import SW_PlayerComputer from '~/game/gameObjects/SW_PlayerComputer';
import SW_Incubator from '~/game/gameObjects/SW_Incubator';
import SW_DialogueEntity from '~/game/gameObjects/SW_DialogueEntity';
import { SW_SubMapData, SW_MapManager } from '~/game/maps/SW_MapManager';
import { SW_DIRECTIONS } from '../characters/SW_CharacterMovementComponent';
import SW_WizhWell from '../gameObjects/SW_WizhWell';

const playerStore = usePlayerStore();

/** All the data of the game scene to initialize it */
declare type SW_GameSceneData = {
  /** The name of the Tiled world. */
  worldName: string;

  /** The name of the previous world before reaching the new one. Ignored if startPosition is set */
  previousWorldName: string;

  /** The spawn id to determine where the player should spawn in the given world */
  spawnPositionName: string;

  /** Where the player should start on this world. Not used at this moment */
  startPosition?: Phaser.Math.Vector2;
};

export default class SW_GameScene extends SW_BaseScene {
  public name: string;
  public nameText: any = null;

  /** Represents the UI in game */
  private declare UIScene: SW_GameUIScene;

  private declare player: SW_Player;

  private declare worldName: string;
  private declare previousWorldName: string;
  private declare spawnPositionName: string;
  private declare startPosition: Phaser.Math.Vector2 | undefined;

  private declare mapManager: SW_MapManager;

  constructor() {
    super({ key: SW_CST.SCENES.GAME });
    this.name = playerStore.name;
  }

  // Init
  ////////////////////////////////////////////////////////////////////////

  public init(data: SW_GameSceneData): void {
    this.worldName = data.worldName;
    this.startPosition = data.startPosition;
    this.spawnPositionName = data.spawnPositionName;
    this.previousWorldName = data.previousWorldName;
  }

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    this.createUI();

    this.addUniqueListener(
      Phaser.Scenes.Events.POST_UPDATE,
      this.postUpdate,
      this
    );

    this.createPlayer();

    this.mapManager = new SW_MapManager(
      this.player,
      this.worldName,
      this.previousWorldName,
      this.spawnPositionName
    );

    if (this.mapManager.isInitialized()) {
      this.onMapManagerInitialized();
    } else {
      this.mapManager.once('initialized', this.onMapManagerInitialized, this);
    }

    this.nameText = this.add.text(0, 0, playerStore.name);
  }

  private onMapManagerInitialized(): void {
    this.events.on(
      Phaser.Scenes.Events.UPDATE,
      this.player.update,
      this.player
    );
    this.events.on(
      Phaser.Scenes.Events.POST_UPDATE,
      this.player.postUpdate,
      this.player
    );

    this.setupCamera();
    this.setupUI();
    this.UIScene.hideLoadingScreen();
  }

  public createPlayer(): void {
    this.player = new SW_Player(this, 0, 0);
    this.player.init({
      name: 'player',
      characterTexture: 'player',
      startDirection: SW_DIRECTIONS.Down,
      walkSpeed: SW_CST.GAME.PLAYER.WALK_SPEED,
      runSpeed: SW_CST.GAME.PLAYER.RUN_SPEED,
    } as SW_SpawnData);

    this.player.on('runStateChanged', this.onPlayerRunStateChanged, this);
  }

  public createInteractableObjects(
    subMapData: SW_SubMapData,
    offsetX: number,
    offsetY: number
  ): Phaser.Physics.Arcade.StaticGroup {
    const interactableObjectGroup = this.physics.add.staticGroup();

    // TODO - Just have an InteractableZone class that triggers a gameplay event
    // These events could then be handle on GameplayEventManager
    this.addUniqueListener(
      'wizhWellRequested',
      () => {
        this.UIScene.showWizhWellMenu();
      },
      this
    );

    const objectTypeData = [
      { name: 'PlayerComputer', isZone: true, classType: SW_PlayerComputer },
      { name: 'Incubator', isZone: true, classType: SW_Incubator },
      { name: 'DialogueEntity', isZone: true, classType: SW_DialogueEntity },
      { name: 'WizhWell', isZone: true, classType: SW_WizhWell },
    ];

    for (const objectData of objectTypeData) {
      const interactableObjects = subMapData.subMap.createFromObjects(
        'Objects',
        {
          name: objectData.name,
          classType: objectData.isZone
            ? Phaser.GameObjects.Image
            : objectData.classType,
        }
      ) as (Phaser.GameObjects.GameObject &
        Phaser.GameObjects.Components.TextureCrop &
        Phaser.GameObjects.Components.Visible &
        Phaser.GameObjects.Components.Transform &
        Phaser.GameObjects.Components.ComputedSize)[];
      for (const interactableObject of interactableObjects) {
        interactableObject.setPosition(
          interactableObject.x + offsetX,
          interactableObject.y + offsetY
        );

        if (objectData.isZone) {
          const classType = objectData.classType;
          const zone = new classType(
            this,
            interactableObject.x,
            interactableObject.y,
            interactableObject.width,
            interactableObject.height
          );
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
        } else {
          interactableObjectGroup.add(interactableObject);
        }
      }
    }
    return interactableObjectGroup;
  }

  private setupCamera(): void {
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(SW_CST.GAME.ZOOM);
  }

  private createUI(): void {
    this.UIScene = this.scene.get(SW_CST.SCENES.GAME_UI) as SW_GameUIScene;
    this.UIScene.showLoadingScreen();
  }

  private setupUI(): void {
    this.UIScene.addUniqueListener(
      'inventoryObjectClicked',
      this.inventoryObjectClicked,
      this
    );
    this.UIScene.addUniqueListener(
      'playerRequestToggleRunState',
      this.onPlayerRequestToggleRunState,
      this
    );
    this.UIScene.addUniqueListener(
      'playerRequestInteract',
      this.onPlayerRequestInteract,
      this
    );

    this.UIScene.createInputPlayerComponent(this.player);
  }

  // Update
  ////////////////////////////////////////////////////////////////////////

  public update(time: number, delta: number): void {
    // this.name = playerStore.name;
    // this.nameText.setText(playerStore.name);
  }

  private postUpdate(
    sys: Phaser.Scenes.Systems,
    time: number,
    delta: number
  ): void {}

  private shutdown(): void {
    this.events.off(
      Phaser.Scenes.Events.UPDATE,
      this.player.update,
      this.player
    );
    this.events.off(
      Phaser.Scenes.Events.POST_UPDATE,
      this.player.postUpdate,
      this.player
    );
    this.mapManager.clear();
  }

  public openPlayerInventory(): void {
    this.UIScene.openPlayerInventory();
  }

  public openChestInventory(): void {
    this.UIScene.openChestInventory();
  }

  public updatePlayerInventory(
    newInventoryObjects: SW_InventoryObject[]
  ): void {
    this.UIScene.updatePlayerInventory(newInventoryObjects);
  }

  public updateChestInventory(newInventoryObjects: SW_InventoryObject[]): void {
    this.UIScene.updateChestInventory(newInventoryObjects);
  }

  protected inventoryObjectClicked(
    inventoryObjectData: SW_InventoryObject
  ): void {
    playerStore.setName(`You clicked on ${inventoryObjectData.name}`);
  }

  public canPlayerEnter(player: SW_Player, entrance: SW_Entrance): boolean {
    return player.getCurrentDirection().includes(entrance.enterDirection);
  }

  public onPlayerEnter(player: SW_Player, entrance: SW_Entrance): void {
    this.UIScene.showLoadingScreen();
    this.shutdown();
    this.scene.restart({
      worldName: entrance.worldName,
      previousWorldName: this.worldName,
      spawnPositionName: entrance.spawnPositionName,
    });
  }

  public onPlayerOverlapInteractable(
    interactionComponent: SW_InteractionComponent,
    interactable: FocusType
  ): void {
    interactionComponent.onInteractableOverlapped(interactable);
  }

  public onWizhWellRequested(): void {
    this.UIScene.showWizhWellMenu();
  }

  public requestDialogue(dialogue: string): void {
    this.UIScene.requestDialogue(dialogue);
  }

  protected onPlayerRequestToggleRunState(): void {
    this.player.toggleRunState();
  }

  protected onPlayerRunStateChanged(isPlayerRunning: boolean): void {
    this.UIScene.onPlayerRunStateChanged(isPlayerRunning);
  }

  protected onPlayerRequestInteract(): void {
    this.player.interact();
  }
}
