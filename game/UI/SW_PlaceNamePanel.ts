import { SW_CST } from '../SW_CST';
import SW_BaseScene from '../scenes/SW_BaseScene';

export class SW_PlaceNamePanel extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;

  protected textObject: Phaser.GameObjects.Text;
  protected background: Phaser.GameObjects.Image;

  constructor(scene: SW_BaseScene, x: number, y: number) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.background = this.scene.add.image(0, 0, 'placeNameBackground');
    this.background.setOrigin(0.5);
    this.add(this.background);

    this.width = this.background.width;
    this.height = this.background.height;

    const compassIcon = this.scene.add.image(
      -this.width * 0.5 + 12,
      0,
      'compassIcon'
    );
    compassIcon.setOrigin(0, 0.5);
    this.add(compassIcon);

    this.textObject = this.scene.add.text(
      Math.floor(compassIcon.width * 0.5),
      2,
      '',
      {
        align: 'center',
        color: SW_CST.STYLE.COLOR.TEXT,
        fontStyle: SW_CST.STYLE.TEXT.FONT_STYLE_BOLD,
        fontSize: '15px',
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
      }
    );
    this.textObject.setOrigin(0.5);
    this.add(this.textObject);
  }

  public setText(text: string): void {
    this.textObject.setText(text.toUpperCase());

    this.width = this.background.width;
    this.height = this.background.height;
  }
}
