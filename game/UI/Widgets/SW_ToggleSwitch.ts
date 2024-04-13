import ToggleSwitch from 'phaser3-rex-plugins/plugins/toggleswitch.js';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';

export class SW_ToggleSwitch extends ToggleSwitch {
  public declare scene: SW_BaseScene;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const width = 40;
    const height = 40;

    const config = {
      x: x,
      y: y,
      width: width,
      height: height,
      color: 0xe1b67e,
      falseValueTrackColor: 0xe4dcce,

      trackHeight: 0.3,
      thumbHeight: 0.5,
      thumbLeft: 0.25,
      thumbColor: 0xdacbb8,
    };
    super(scene, x, y, width, height, config.color, config);

    // faire son propre switch avec le control du thuimb, de la track et de la transition de movement et de gradient de couleur du switch
  }
}
