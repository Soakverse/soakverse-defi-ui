import { SW_CST } from '~/game/SW_CST';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import SW_GameScene from '~/game/scenes/SW_GameScene';
import SW_GameUIScene from '~/game/scenes/SW_GameUIScene';

import thudMp3 from '@/game/assets/thud.mp3';
import thudOgg from '@/game/assets/thud.ogg';

import assetCityTiled from '@/game/assets/maps/assetCityTiled.png';
import cityMap from '@/game/assets/maps/cityMap.json';

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

    this.load.image("assetCityTiled", assetCityTiled);
    this.load.tilemapTiledJSON("cityMap", cityMap);

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

    this.scene.add(SW_CST.SCENES.GAME, SW_GameScene, true, undefined);
    sceneUI.scene.bringToTop();

    this.scene.remove(SW_CST.SCENES.BOOT);
  }
}
