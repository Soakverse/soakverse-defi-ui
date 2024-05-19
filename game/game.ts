import Phaser from 'phaser';
import SW_BootScene from '~/game/scenes/SW_BootScene';
import { SW_CST } from './SW_CST';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import QuestPlugin from 'phaser3-rex-plugins/plugins/quest-plugin.js';

// @ts-ignore
import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin';

function launch(containerId: string) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    mode: Phaser.Scale.FIT,
    scale: {
      mode: Phaser.Scale.FIT,
      parent: containerId,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: SW_CST.GAME.WIDTH,
      height: SW_CST.GAME.HEIGHT,
    },
    parent: containerId,
    fullscreenTarget: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: SW_CST.DEBUG.PHYSIC,
      },
    },
    input: {
      activePointers: 3,
    },
    scene: [SW_BootScene],
    plugins: {
      scene: [{ key: 'rexUI', plugin: UIPlugin, mapping: 'rexUI' }],
      global: [
        { key: 'rexWebFontLoader', plugin: WebFontLoaderPlugin, start: true },
        { key: 'rexQuest', plugin: QuestPlugin, start: true },
      ],
    },
  });
}

export default launch;
export { launch };
