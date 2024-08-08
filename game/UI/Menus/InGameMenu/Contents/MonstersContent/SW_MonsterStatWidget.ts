import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_CST } from '~/game/SW_CST';

export class SW_MonsterStatWidget extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;

  protected icon: Phaser.GameObjects.Image;
  protected statText: Phaser.GameObjects.Text;
  protected valueText: Phaser.GameObjects.Text;

  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    width: number,
    height: number,
    statName: string,
    statDisplayName: string
  ) {
    super(scene, x, y);

    this.width = width;
    this.height = height;

    this.icon = this.scene.add.image(
      -this.width * 0.5,
      0,
      `stat${statName}Icon`
    );
    this.icon.setOrigin(0, 0.5);
    this.add(this.icon);

    this.statText = this.scene.add.text(
      this.icon.x + this.icon.width + 8,
      0,
      statDisplayName,
      {
        color: '#684C3C',
        fontSize: '12px',
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
      }
    );
    this.statText.setOrigin(0, 0.5);
    this.add(this.statText);

    this.valueText = this.scene.add.text(this.width * 0.5, 0, '0', {
      color: '#4D2B1D',
      fontSize: '15px',
      fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
      fontStyle: SW_CST.STYLE.TEXT.FONT_STYLE_BOLD,
    });
    this.valueText.setOrigin(1, 0.5);
    this.add(this.valueText);
  }

  public updateData(icon: string, statName: string, value: number): void {
    this.icon.setTexture(icon);
    this.statText.setText(statName);
    this.valueText.setText(`${value}`);
  }

  public updateStatValue(value: number): void {
    this.valueText.setText(`${value}`);
  }
}
