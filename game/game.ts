import Phaser from "phaser";
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import SW_BootScene from "~/game/scenes/SW_BootScene";

function launch(containerId: string) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      parent: "phaser-game-holder",
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 600,
    },
    parent: containerId,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 300 },
        debug: false,
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
