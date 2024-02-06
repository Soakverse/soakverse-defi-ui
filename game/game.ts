import Phaser from "phaser";
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import SW_BootScene from "~/game/scenes/SW_BootScene";
import { SW_CST } from "./SW_CST";

function launch(containerId: string) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      parent: "phaser-game-holder",
      //autoCenter: Phaser.Scale.CENTER_BOTH,
      width: SW_CST.GAME.WIDTH,
      height: SW_CST.GAME.HEIGHT,
    },
    parent: containerId,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 300 },
        debug: SW_CST.DEBUG.PHYSIC,
      },
    },
    scene: [SW_BootScene],
    plugins: {
      scene: [
          {key: 'rexUI',  plugin: UIPlugin, mapping: 'rexUI'}
      ]
  }
  });
}

export default launch;
export { launch };