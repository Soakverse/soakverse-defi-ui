import Label from 'phaser3-rex-plugins/templates/ui/label/Label';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_CST } from '~/game/SW_CST';

export class SW_MonsterSpecialEffectWidget extends Label {
  public declare scene: SW_BaseScene;
  protected title: Phaser.GameObjects.Text;

  constructor(scene: SW_BaseScene, config: Label.IConfig) {
    const background = scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10, 0xe1b77e);
    const title = scene.add.text(0, 0, '', {
      fontSize: '12px',
      fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
      color: SW_CST.STYLE.COLOR.WHITE,
      align: 'center',
      padding: { top: 4, bottom: 4, left: 4, right: 4 },
    });
    config.text = title;

    super(scene, config);
    this.scene.add.existing(this);
    this.setChildrenAlignMode('center');
    this.addBackground(background);

    this.title = title;
    this.layout();
  }
}
