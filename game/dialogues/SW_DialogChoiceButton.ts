import { Label } from 'phaser3-rex-plugins/templates/ui/ui-components';
import SW_BaseScene from '../scenes/SW_BaseScene';

export class SW_DialogChoiceButton extends Label {
  public declare scene: SW_BaseScene;

  constructor(scene: SW_BaseScene, config: Label.IConfig) {
    config.background = scene.rexUI.add.roundRectangle(
      0,
      0,
      100,
      30,
      4,
      0x000000,
      0.33
    );
    config.text = scene.add.text(0, 0, '', { fontSize: '24px' });
    config.space = { left: 12, right: 8, top: 8, bottom: 8 };

    super(scene, config);
    this.scene.add.existing(this);
    this.layout();
  }
}
