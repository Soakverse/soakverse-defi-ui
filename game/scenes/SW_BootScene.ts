import { SW_CST } from '~/game/SW_CST';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import SW_GameScene from '~/game/scenes/SW_GameScene';
import SW_GameUIScene from '~/game/scenes/SW_GameUIScene';

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

////// Menus
import menuBackground from '@/game/assets/ui/menus/menuBackground.png';
import settingsBackground from '@/game/assets/ui/menus/settingsBackground.png';
import wizhingWellBackground from '@/game/assets/ui/menus/wizhingWellBackground.png';

import backButton from '@/game/assets/ui/menus/backButton.png';
import eggzButton from '@/game/assets/ui/menus/eggzButton.png';
import closeButtonNormal from '@/game/assets/ui/menus/closeButtonNormal.png';
import closeButtonHovered from '@/game/assets/ui/menus/closeButtonHovered.png';
import closeButtonPressed from '@/game/assets/ui/menus/closeButtonPressed.png';
import characterButton from '@/game/assets/ui/menus/characterButton.png';
import settingsButton from '@/game/assets/ui/menus/settingsButton.png';
import settingsIconTitle from '@/game/assets/ui/menus/settingsIconTitle.png';
import wizhIconTitle from '@/game/assets/ui/menus/wizhIconTitle.png';

import inGameMenuBackground from '@/game/assets/ui/menus/inGameMenuBackground.png';
import inGameMenuTab from '@/game/assets/ui/menus/inGameMenuTab.png';

// Monsters
import photoStrap from '@/game/assets/ui/menus/photoStrap.png';
import monsterProfil_prototype1 from '@/game/assets/ui/monsters/monsterProfil_prototype1.png';
import monsterProfil_prototype2 from '@/game/assets/ui/monsters/monsterProfil_prototype2.png';

// Stats
import statAccuracyIcon from '@/game/assets/ui/stats/statAccuracy.png';
import statAttackIcon from '@/game/assets/ui/stats/statAttack.png';
import statDefenseIcon from '@/game/assets/ui/stats/statDefense.png';
import statLuckIcon from '@/game/assets/ui/stats/statLuck.png';
import statMagicIcon from '@/game/assets/ui/stats/statMagic.png';
import statSpeedIcon from '@/game/assets/ui/stats/statSpeed.png';

// Mobile
import menuButtonMobile from '@/game/assets/ui/mobile/menuButton.png';
import runButtonMobile from '@/game/assets/ui/mobile/runButton.png';
import walkButtonMobile from '@/game/assets/ui/mobile/walkButton.png';
import interactButtonMobile from '@/game/assets/ui/mobile/interactButton.png';
import SW_SceneDebug from './SW_SceneDebug';
import { SW_AudioManager } from '../audio/SW_AudioManager';

export default class SW_BootScene extends SW_BaseScene {
  constructor() {
    super({
      key: SW_CST.SCENES.BOOT,
      pack: {
        files: [
          {
            type: 'rexWebFont',
            key: SW_CST.STYLE.TEXT.FONT_FAMILY,
            config: {
              google: {
                families: [SW_CST.STYLE.TEXT.FONT_FAMILY],
              },
            },
          },
        ],
      },
    });
  }

  // Preload
  ////////////////////////////////////////////////////////////////////////

  public preload(): void {
    SW_CST.GAME.IS_MOBILE = !this.sys.game.device.os.desktop;

    this.preloadAudioAssets();

    this.preloadMenuAssets();

    if (SW_CST.GAME.IS_MOBILE) {
      this.preloadMobileAssets();
    }

    this.load.image('objectCounterBackground', objectCounterBackground);
    this.load.image('objectCounterMinusButton', objectCounterMinusButton);
    this.load.image('objectCounterPlusButton', objectCounterPlusButton);
    this.load.image('objectCounterMoveButton', objectCounterMoveButton);

    this.load.image('inventorySlider', inventorySlider);
    this.load.image('inventorySliderLine', inventorySliderLine);
    this.load.image('inventorySlot', inventorySlot);
    this.load.image('inventoryTableBackground', inventoryTableBackground);
    this.load.image('inventoryWidgetBackground', inventoryWidgetBackground);

    this.load.spritesheet('player', player, {
      frameWidth: 100,
      frameHeight: 100,
    });

    this.load.atlas('inventoryItems', inventoryItemsImage, inventoryItemsJson);

    // Dialogue
    this.load.image('dialogueImage_YB', dialogueImage_YB);
    this.load.image('GPADJK_d2_1', GPADJK_d2_1);
    this.load.image('Scribb', Scribb);
  }

  private preloadAudioAssets(): void {
    this.load.audio('audioWaterfall', '/game/assets/audio/SV_Waterfall.m4a');
    this.load.audio(
      'soundButtonHovered',
      '/game/assets/audio/soundButtonHovered.m4a'
    );
    this.load.audio(
      'soundButtonPressed',
      '/game/assets/audio/soundButtonPressed.m4a'
    );
    this.load.audio('soundInteract', '/game/assets/audio/soundInteract.m4a');
    this.load.audio('soundDialogue', '/game/assets/audio/soundDialogue.m4a');

    SW_AudioManager.init(this.sound);
  }

  private preloadMenuAssets(): void {
    this.load.image('menuBackground', menuBackground);
    this.load.image('settingsBackground', settingsBackground);
    this.load.image('wizhingWellBackground', wizhingWellBackground);

    this.load.image('inGameMenuBackground', inGameMenuBackground);
    this.load.image('inGameMenuTab', inGameMenuTab);

    this.load.image('photoStrap', photoStrap);
    this.load.image('monsterProfil_prototype1', monsterProfil_prototype1);
    this.load.image('monsterProfil_prototype2', monsterProfil_prototype2);

    this.load.image('backButton', backButton);
    this.load.image('closeButtonNormal', closeButtonNormal);
    this.load.image('closeButtonHovered', closeButtonHovered);
    this.load.image('closeButtonPressed', closeButtonPressed);
    this.load.image('characterButton', characterButton);
    this.load.image('eggzButton', eggzButton);
    this.load.image('settingsButton', settingsButton);
    this.load.image('settingsIconTitle', settingsIconTitle);
    this.load.image('wizhIconTitle', wizhIconTitle);

    this.load.image('statAccuracyIcon', statAccuracyIcon);
    this.load.image('statAttackIcon', statAttackIcon);
    this.load.image('statDefenseIcon', statDefenseIcon);
    this.load.image('statLuckIcon', statLuckIcon);
    this.load.image('statMagicIcon', statMagicIcon);
    this.load.image('statSpeedIcon', statSpeedIcon);
  }

  private preloadMobileAssets(): void {
    this.load.image('runButtonMobile', runButtonMobile);
    this.load.image('menuButtonMobile', menuButtonMobile);
    this.load.image('walkButtonMobile', walkButtonMobile);
    this.load.image('interactButtonMobile', interactButtonMobile);
  }

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    this.input.setDefaultCursor(
      'url(/game/assets/cursors/cursorNormal.cur), pointer'
    );

    const sceneUI = this.scene.add(
      SW_CST.SCENES.GAME_UI,
      SW_GameUIScene,
      true,
      undefined
    ) as SW_GameUIScene;

    this.scene.add(SW_CST.SCENES.GAME, SW_GameScene, true, {
      worldName: 'grassWorld',
      //startPosition: new Phaser.Math.Vector2(200, 200)
      previousWorldName: 'Starter',
      spawnPositionName: 'Starter',
    });
    sceneUI.scene.bringToTop();

    if (SW_CST.DEBUG.GAME) {
      const sceneDebug = this.scene.add(
        SW_CST.SCENES.DEBUG,
        SW_SceneDebug,
        true
      ) as Phaser.Scene;
      sceneDebug.scene.bringToTop();
    }

    this.scene.remove(SW_CST.SCENES.BOOT);
  }
}
