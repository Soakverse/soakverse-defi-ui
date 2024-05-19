import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle';
import { SW_CST } from '../../SW_CST';
import { SW_Utils } from '../../SW_Utils';
import SW_BaseScene from '../../scenes/SW_BaseScene';

export class SW_DialogTitle extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;

  protected textObject: Phaser.GameObjects.Text;
  protected background: RoundRectangle;

  constructor(scene: SW_BaseScene, x: number, y: number) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.background = this.scene.rexUI.add.roundRectangle(
      0,
      0,
      120,
      32,
      3,
      0xc4b6a5,
      1.0
    );
    this.background.setOrigin(0.5);
    this.background.setStrokeStyle(
      2,
      SW_Utils.hexColorToNumber(SW_CST.STYLE.COLOR.TEXT),
      1.0
    );
    this.add(this.background);

    this.width = this.background.width;
    this.height = this.background.height;

    this.textObject = this.scene.add.text(0, 0, '', {
      align: 'center',
      color: SW_CST.STYLE.COLOR.TEXT,
      //   fontStyle: 'bold',
      fontSize: '15px',
      fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
    });
    this.textObject.setOrigin(0.5);
    this.add(this.textObject);
  }

  public setText(text: string): void {
    this.textObject.setText(text);
    // this.background.resize(this.textObject.width + 16, this.background.height);

    this.width = this.background.width;
    this.height = this.background.height;
  }
}
