import { SW_CST } from '~/game/SW_CST';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import SW_GameScene from '~/game/scenes/SW_GameScene';
import SW_GameUIScene from '~/game/scenes/SW_GameUIScene';

import thudMp3 from '@/game/assets/thud.mp3';
import thudOgg from '@/game/assets/thud.ogg';

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

// Dialogue
import dialogueImage_YB from '@/game/assets/dialogueImage_YB.png';
import GPADJK_d2_1 from '@/game/assets/GPADJK_d2_1.png';
import Scribb from '@/game/assets/Scribb.png';

// Menus
import menuHeader from '@/game/assets/menuHeader.png';
import menuBackground from '@/game/assets/menuBackground.png';

export default class SW_BootScene extends SW_BaseScene {
  constructor () {
    super({ key: SW_CST.SCENES.BOOT });
  }

  // Preload
  ////////////////////////////////////////////////////////////////////////

  public preload(): void {
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

    this.load.spritesheet("player", player, { frameWidth: 100, frameHeight: 100 });

    this.load.atlas("inventoryItems", inventoryItemsImage, inventoryItemsJson);

    // Dialogue
    this.load.image("dialogueImage_YB", dialogueImage_YB);
    this.load.image("GPADJK_d2_1", GPADJK_d2_1);
    this.load.image("Scribb", Scribb);


    this.load.spritesheet("tree1D_ss", "/game/assets/maps/grassWorld/anim/trees/tree1D_ss.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("tree1B_ss", "/game/assets/maps/grassWorld/anim/trees/tree1B_ss.png", { frameWidth: 32, frameHeight: 32 });
  }

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    const animatableTiles = [
      { gid: 845, texture: "tree1D_ss", frames: [0, 5, 10, 15, 20, 125, 130, 135, 140, 145] },
      { gid: 846, texture: "tree1D_ss", frames: [1, 6, 11, 16, 21, 126, 131, 136, 141, 146] },
      { gid: 847, texture: "tree1D_ss", frames: [2, 7, 12, 17, 22, 127, 132, 137, 142, 147] },
      { gid: 848, texture: "tree1D_ss", frames: [3, 8, 13, 18, 23, 128, 133, 138, 143, 148] },
      { gid: 849, texture: "tree1D_ss", frames: [4, 9, 14, 19, 24, 129, 134, 139, 144, 149] },

      { gid: 877, texture: "tree1D_ss", frames: [25, 30, 35, 40, 45, 150, 155, 160, 165, 170] },
      { gid: 878, texture: "tree1D_ss", frames: [26, 31, 36, 41, 46, 151, 156, 161, 166, 171] },
      { gid: 879, texture: "tree1D_ss", frames: [27, 32, 37, 42, 47, 152, 157, 162, 167, 172] },
      { gid: 880, texture: "tree1D_ss", frames: [28, 33, 38, 43, 48, 153, 158, 163, 168, 173] },
      { gid: 881, texture: "tree1D_ss", frames: [29, 34, 39, 44, 49, 154, 159, 164, 169, 174] },
      
      { gid: 909, texture: "tree1D_ss", frames: [50, 55, 60, 65, 70, 175, 180, 185, 190, 195] },
      { gid: 910, texture: "tree1D_ss", frames: [51, 56, 61, 66, 71, 176, 181, 186, 191, 196] },
      { gid: 911, texture: "tree1D_ss", frames: [52, 57, 62, 67, 72, 177, 182, 187, 192, 197] },
      { gid: 912, texture: "tree1D_ss", frames: [53, 58, 63, 68, 73, 178, 183, 188, 193, 198] },
      { gid: 913, texture: "tree1D_ss", frames: [54, 59, 64, 69, 74, 179, 184, 189, 194, 199] },

      { gid: 941, texture: "tree1D_ss", frames: [75, 80, 85, 90, 95, 200, 205, 210, 215, 220] },
      { gid: 942, texture: "tree1D_ss", frames: [76, 81, 86, 91, 96, 201, 206, 211, 216, 221] },
      { gid: 943, texture: "tree1D_ss", frames: [77, 82, 87, 92, 97, 202, 207, 212, 217, 222] },
      { gid: 944, texture: "tree1D_ss", frames: [78, 83, 88, 93, 98, 203, 208, 213, 218, 223] },
      { gid: 945, texture: "tree1D_ss", frames: [79, 84, 89, 94, 99, 204, 209, 214, 219, 224] },

      

      { gid: 653, texture: "tree1B_ss", frames: [0, 5, 10, 15, 20, 125, 130, 135, 140, 145] },
      { gid: 654, texture: "tree1B_ss", frames: [1, 6, 11, 16, 21, 126, 131, 136, 141, 146] },
      { gid: 655, texture: "tree1B_ss", frames: [2, 7, 12, 17, 22, 127, 132, 137, 142, 147] },
      { gid: 656, texture: "tree1B_ss", frames: [3, 8, 13, 18, 23, 128, 133, 138, 143, 148] },
      { gid: 657, texture: "tree1B_ss", frames: [4, 9, 14, 19, 24, 129, 134, 139, 144, 149] },

      { gid: 685, texture: "tree1B_ss", frames: [25, 30, 35, 40, 45, 150, 155, 160, 165, 170] },
      { gid: 686, texture: "tree1B_ss", frames: [26, 31, 36, 41, 46, 151, 156, 161, 166, 171] },
      { gid: 687, texture: "tree1B_ss", frames: [27, 32, 37, 42, 47, 152, 157, 162, 167, 172] },
      { gid: 688, texture: "tree1B_ss", frames: [28, 33, 38, 43, 48, 153, 158, 163, 168, 173] },
      { gid: 689, texture: "tree1B_ss", frames: [29, 34, 39, 44, 49, 154, 159, 164, 169, 174] },
      
      { gid: 717, texture: "tree1B_ss", frames: [50, 55, 60, 65, 70, 175, 180, 185, 190, 195] },
      { gid: 718, texture: "tree1B_ss", frames: [51, 56, 61, 66, 71, 176, 181, 186, 191, 196] },
      { gid: 719, texture: "tree1B_ss", frames: [52, 57, 62, 67, 72, 177, 182, 187, 192, 197] },
      { gid: 720, texture: "tree1B_ss", frames: [53, 58, 63, 68, 73, 178, 183, 188, 193, 198] },
      { gid: 721, texture: "tree1B_ss", frames: [54, 59, 64, 69, 74, 179, 184, 189, 194, 199] },

      { gid: 749, texture: "tree1B_ss", frames: [75, 80, 85, 90, 95, 200, 205, 210, 215, 220] },
      { gid: 750, texture: "tree1B_ss", frames: [76, 81, 86, 91, 96, 201, 206, 211, 216, 221] },
      { gid: 751, texture: "tree1B_ss", frames: [77, 82, 87, 92, 97, 202, 207, 212, 217, 222] },
      { gid: 752, texture: "tree1B_ss", frames: [78, 83, 88, 93, 98, 203, 208, 213, 218, 223] },
      { gid: 753, texture: "tree1B_ss", frames: [79, 84, 89, 94, 99, 204, 209, 214, 219, 224] },
    ];

      for (const tileData of animatableTiles) {
        this.anims.create({ key: `${tileData.texture}${tileData.gid}`,
          frames: this.anims.generateFrameNumbers(`${tileData.texture}`, { frames: tileData.frames }),
          frameRate: 3,
          repeat: Phaser.FOREVER
        }) as Phaser.Animations.Animation;
      }

    const sceneUI = this.scene.add(SW_CST.SCENES.GAME_UI, SW_GameUIScene, true, undefined) as SW_GameUIScene;

    this.scene.add(SW_CST.SCENES.GAME, SW_GameScene, true, {
      worldName: "grassWorld",
      //startPosition: new Phaser.Math.Vector2(200, 200)
      previousWorldName: "Starter",
      spawnPositionName: "Starter"
    });
    sceneUI.scene.bringToTop();

    this.scene.remove(SW_CST.SCENES.BOOT);
  }
}
