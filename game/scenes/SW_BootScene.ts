import { SW_CST } from '~/game/SW_CST';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import SW_GameScene from '~/game/scenes/SW_GameScene';
import SW_GameUIScene from '~/game/scenes/SW_GameUIScene';

import thudMp3 from '@/game/assets/thud.mp3';
import thudOgg from '@/game/assets/thud.ogg';

//Credit goes to Zerudez - See https://www.deviantart.com/zerudez/art/Public-Tileset-295115322
import outsideAssetTiled from '@/game/assets/maps/outsideAssetTiled.png';
import interiorAssetTiled from '@/game/assets/maps/interiorAssetTiled.png';

import villageMap from '@/game/assets/maps/villageMap.json';
import homePlayerMap from '@/game/assets/maps/homePlayerMap.json';
import home1 from '@/game/assets/maps/home1.json';
import home2 from '@/game/assets/maps/home2.json';
import road1 from '@/game/assets/maps/road1.json';
import road2 from '@/game/assets/maps/road2.json';
import road3 from '@/game/assets/maps/road3.json';

import objectCounterBackground from '@/game/assets/inventory/objectCounterBackground.png';
import objectCounterMinusButton from '@/game/assets/inventory/objectCounterMinusButton.png';
import objectCounterPlusButton from '@/game/assets/inventory/objectCounterPlusButton.png';
import objectCounterMoveButton from '@/game/assets/inventory/objectCounterMoveButton.png';

import inventorySlider from '@/game/assets/inventory/inventorySlider.png';
import inventorySliderLine from '@/game/assets/inventory/inventorySliderLine.png';
import inventorySlot from '@/game/assets/inventory/inventorySlot.png';
import inventoryTableBackground from '@/game/assets/inventory/inventoryTableBackground.png';
import inventoryWidgetBackground from '@/game/assets/inventory/inventoryWidgetBackground.png';
import inventoryItemsImage from '@/game/assets/inventory/items/inventoryItems.png';
import inventoryItemsJson from '@/game/assets/inventory/items/inventoryItems.json';

import player from '@/game/assets/characters/player.png';

export default class SW_BootScene extends SW_BaseScene {
  constructor () {
    super({ key: SW_CST.SCENES.BOOT });
  }

  // Preload
  ////////////////////////////////////////////////////////////////////////

  public preload(): void {
    this.load.audio("thud", [thudMp3, thudOgg]);

    this.load.image("interiorAssetTiled", interiorAssetTiled);
    this.load.image("outsideAssetTiled", outsideAssetTiled);

    this.load.tilemapTiledJSON("villageMap", villageMap);
    this.load.tilemapTiledJSON("homePlayerMap", homePlayerMap);
    this.load.tilemapTiledJSON("home1", home1);
    this.load.tilemapTiledJSON("home2", home2);
    this.load.tilemapTiledJSON("road1", road1);
    this.load.tilemapTiledJSON("road2", road2);
    this.load.tilemapTiledJSON("road3", road3);

    this.load.image("objectCounterBackground", objectCounterBackground);
    this.load.image("objectCounterMinusButton", objectCounterMinusButton);
    this.load.image("objectCounterPlusButton", objectCounterPlusButton);
    this.load.image("objectCounterMoveButton", objectCounterMoveButton);

    this.load.image("inventorySlider", inventorySlider);
    this.load.image("inventorySliderLine", inventorySliderLine);
    this.load.image("inventorySlot", inventorySlot);
    this.load.image("inventoryTableBackground", inventoryTableBackground);
    this.load.image("inventoryWidgetBackground", inventoryWidgetBackground);

    this.load.spritesheet("player", player, { frameWidth: 64, frameHeight: 64 });

    this.load.atlas("inventoryItems", inventoryItemsImage, inventoryItemsJson);
  }

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    const sceneUI = this.scene.add(SW_CST.SCENES.GAME_UI, SW_GameUIScene, true, undefined) as SW_GameUIScene;

    this.scene.add(SW_CST.SCENES.GAME, SW_GameScene, true, { mapName: "villageMap", mapAsset: "outsideAssetTiled" });
    sceneUI.scene.bringToTop();

    this.scene.remove(SW_CST.SCENES.BOOT);
  }
}
