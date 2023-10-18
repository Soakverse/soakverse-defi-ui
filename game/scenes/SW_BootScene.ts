import { Scene } from 'phaser'
import { CST } from '~/game/CST'
import SW_BaseScene from '~/game/scenes/SW_BaseScene'
import SW_GameScene from '~/game/scenes/SW_GameScene'

import sky from '@/game/assets/sky.png'
import bomb from '@/game/assets/bomb.png'
import thudMp3 from '@/game/assets/thud.mp3'
import thudOgg from '@/game/assets/thud.ogg'
import SW_GameUIScene from './SW_GameUIScene'

export default class SW_BootScene extends SW_BaseScene {
  constructor () {
    super({ key: 'BootScene' })
  }

  // Preload
  ////////////////////////////////////////////////////////////////////////

  public preload(): void {
    this.load.image('sky', sky);
    this.load.image('bomb', bomb);
    this.load.audio('thud', [thudMp3, thudOgg]);
  }

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    const sceneUI = this.scene.add(CST.SCENES.GAME_UI, SW_GameUIScene, true, undefined) as SW_GameUIScene;

    this.scene.add(CST.SCENES.GAME, SW_GameScene, true, undefined);
    sceneUI.scene.bringToTop();

    this.scene.remove(CST.SCENES.BOOT);
  }
}
