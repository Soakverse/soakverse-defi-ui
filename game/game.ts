import Phaser from 'phaser';
import SW_BootScene from '~/game/scenes/SW_BootScene';
import { SW_CST } from './SW_CST';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

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
        gravity: { y: 300 },
        debug: SW_CST.DEBUG.PHYSIC,
      },
    },
    input: {
      activePointers: 3,
    },
    scene: [SW_BootScene],
    plugins: {
      scene: [{ key: 'rexUI', plugin: UIPlugin, mapping: 'rexUI' }],
      global: [],
    },
  });
}

export default launch;
export { launch };
