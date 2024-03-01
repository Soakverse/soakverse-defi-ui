import { SW_CST } from '~/game/SW_CST';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_TextButton } from '~/game/UI/buttons/SW_TextButton';
import { useWizhingWellStore } from '@/stores/wizhingWellStore';

const wizhingWellStore = useWizhingWellStore();

export class SW_WizhMenu extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;

  protected background: Phaser.GameObjects.Image;
  protected header: Phaser.GameObjects.Image;
  protected headerText: Phaser.GameObjects.Text;

  constructor(scene: SW_BaseScene, x: number, y: number) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.background = this.scene.add
      .image(0, 0, 'menuBackground')
      .setOrigin(0.5);
    this.add(this.background);

    this.width = this.background.width;
    this.height = this.background.height;

    this.header = this.scene.add
      .image(0, -this.height * 0.5 + 8, 'menuHeader')
      .setOrigin(0.5);
    this.add(this.header);

    this.headerText = this.scene.add
      .text(this.header.x, this.header.y - 8, 'Wizhes'.toUpperCase(), {
        color: SW_CST.STYLE.COLOR.WHITE,
        strokeThickness: 3,
        stroke: SW_CST.STYLE.COLOR.BLACK,
        fontSize: '23px',
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
      })
      .setOrigin(0.5);
    this.add(this.headerText);

    const makeAWizhText = this.scene.add
      .text(
        this.header.x,
        this.header.y + this.header.height * 0.5 + 20,
        'You found the magic fountain',
        {
          color: SW_CST.STYLE.COLOR.WHITE,
          strokeThickness: 3,
          stroke: SW_CST.STYLE.COLOR.BLACK,
          fontSize: '21px',
          fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        }
      )
      .setOrigin(0.5, 0);
    this.add(makeAWizhText);

    const makeAWizhButton = new SW_TextButton(
      this.scene,
      makeAWizhText.x,
      makeAWizhText.y + makeAWizhText.height + 76,
      'Make a Wizh',
      {}
    );
    this.add(makeAWizhButton);
    makeAWizhButton.onClicked(this.onMakeAWizhButtonClicked, this);

    const self = this;

    wizhingWellStore.$onAction(function (element) {
      if (element.name == 'triggerAction1') {
        console.log(element);
        self.emit('wizhingWellResult', ['jackpot']);
      }
    }, true);
  }

  protected async onMakeAWizhButtonClicked(): Promise<void> {
    this.emit('makeAWizhButtonClicked');
    const name = await wizhingWellStore.triggerAction1();
    console.log('PLAYER NAME:' + name);
  }
}
