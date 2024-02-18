import { SW_CST } from "~/game/SW_CST";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import SW_GameScene from "~/game/scenes/SW_GameScene";
import SW_GameUIScene from "~/game/scenes/SW_GameUIScene";

import thudMp3 from "@/game/assets/thud.mp3";
import thudOgg from "@/game/assets/thud.ogg";

import objectCounterBackground from "@/game/assets/inventory/objectCounterBackground.png";
import objectCounterMinusButton from "@/game/assets/inventory/objectCounterMinusButton.png";
import objectCounterPlusButton from "@/game/assets/inventory/objectCounterPlusButton.png";
import objectCounterMoveButton from "@/game/assets/inventory/objectCounterMoveButton.png";

import inventorySlider from "@/game/assets/inventory/inventorySlider.png";
import inventorySliderLine from "@/game/assets/inventory/inventorySliderLine.png";
import inventorySlot from "@/game/assets/inventory/inventorySlot.png";
import inventoryTableBackground from "@/game/assets/inventory/inventoryTableBackground.png";
import inventoryWidgetBackground from "@/game/assets/inventory/inventoryWidgetBackground.png";
import inventoryItemsImage from "@/game/assets/inventory/items/inventoryItems.png";
import inventoryItemsJson from "@/game/assets/inventory/items/inventoryItems.json";

import player from "@/game/assets/characters/player.png";

// Dialogue
import dialogueImage_YB from "@/game/assets/dialogueImage_YB.png";
import GPADJK_d2_1 from "@/game/assets/GPADJK_d2_1.png";
import Scribb from "@/game/assets/Scribb.png";

// Menus
import menuHeader from "@/game/assets/ui/menus/menuHeader.png";
import menuBackground from "@/game/assets/ui/menus/menuBackground.png";
import menuButtonNormal from "@/game/assets/ui/menus/menuButtonNormal.png";
import menuButtonPressed from "@/game/assets/ui/menus/menuButtonPressed.png";

export default class SW_BootScene extends SW_BaseScene {
  constructor() {
    super({ key: SW_CST.SCENES.BOOT });
  }

  // Preload
  ////////////////////////////////////////////////////////////////////////

  public preload(): void {
    this.preloadMenuAssets();

    this.load.audio("thud", [thudMp3, thudOgg]);

    this.load.image("objectCounterBackground", objectCounterBackground);
    this.load.image("objectCounterMinusButton", objectCounterMinusButton);
    this.load.image("objectCounterPlusButton", objectCounterPlusButton);
    this.load.image("objectCounterMoveButton", objectCounterMoveButton);

    this.load.image("inventorySlider", inventorySlider);
    this.load.image("inventorySliderLine", inventorySliderLine);
    this.load.image("inventorySlot", inventorySlot);
    this.load.image("inventoryTableBackground", inventoryTableBackground);
    this.load.image("inventoryWidgetBackground", inventoryWidgetBackground);

    this.load.spritesheet("player", player, {
      frameWidth: 100,
      frameHeight: 100,
    });

    this.load.atlas("inventoryItems", inventoryItemsImage, inventoryItemsJson);

    // Dialogue
    this.load.image("dialogueImage_YB", dialogueImage_YB);
    this.load.image("GPADJK_d2_1", GPADJK_d2_1);
    this.load.image("Scribb", Scribb);
  }

  private preloadMenuAssets(): void {
    this.load.image("menuHeader", menuHeader);
    this.load.image("menuBackground", menuBackground);
    this.load.image("menuButtonNormal", menuButtonNormal);
    this.load.image("menuButtonPressed", menuButtonPressed);
  }

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    this.input.setDefaultCursor(
      "url(/game/assets/cursors/cursorNormal.cur), pointer"
    );

    const sceneUI = this.scene.add(
      SW_CST.SCENES.GAME_UI,
      SW_GameUIScene,
      true,
      undefined
    ) as SW_GameUIScene;

    this.scene.add(SW_CST.SCENES.GAME, SW_GameScene, true, {
      worldName: "grassWorld",
      //startPosition: new Phaser.Math.Vector2(200, 200)
      previousWorldName: "Starter",
      spawnPositionName: "Starter",
    });
    sceneUI.scene.bringToTop();

    this.scene.remove(SW_CST.SCENES.BOOT);
  }
}
