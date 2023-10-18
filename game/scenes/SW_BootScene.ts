import { Scene } from 'phaser'
import { CST } from '~/game/CST'
import SW_BaseScene from '~/game/scenes/SW_BaseScene'
import SW_PlayScene from '~/game/scenes/SW_PlayScene'

import sky from '@/game/assets/sky.png'
import bomb from '@/game/assets/bomb.png'
import thudMp3 from '@/game/assets/thud.mp3'
import thudOgg from '@/game/assets/thud.ogg'

export default class SW_BootScene extends SW_BaseScene {
  constructor () {
    super({ key: 'BootScene' })
  }

  public preload(): void {
    this.load.image('sky', sky);
    this.load.image('bomb', bomb);
    this.load.audio('thud', [thudMp3, thudOgg]);
  }

  public create(): void {
    this.scene.add(CST.SCENES.GAME, SW_PlayScene, true, undefined);
    this.scene.remove(CST.SCENES.BOOT);
  }
}
