import { SW_CST } from '~/game/SW_CST';
import { useWizhingWellStore } from '@/stores/wizhingWellStore';
import { SW_ButtonBase } from '../../Widgets/SW_ButtonBase';
import { SW_BaseMenu } from '../SW_BaseMenu';
import { SW_MenuManager } from '../SW_MenuManager';
import { SW_GameEventManager } from '~/game/SW_GameEventManager';

const wizhingWellStore = useWizhingWellStore();

export class SW_WizhMenu extends SW_BaseMenu {
  constructor(menuManager: SW_MenuManager, x: number, y: number) {
    super(menuManager, x, y);
    this.scene.add.existing(this);

    const background = this.scene.add.image(0, 0, 'wizhingWellBackground');
    background.setScale(0.75);
    background.setOrigin(0.5);
    this.add(background);

    this.width = background.width;
    this.height = background.height;

    const leftX = Math.floor(-this.width * 0.5) + 176;
    const rightX = Math.floor(this.width * 0.5) - 180;

    const wizhingWellImage = this.scene.add.image(
      leftX,
      -20,
      'wizhingWellImage'
    );
    wizhingWellImage.setScale(background.scale);
    wizhingWellImage.setOrigin(0, 0.5);
    this.add(wizhingWellImage);

    const photoStrapTopLeft = this.scene.add.image(
      wizhingWellImage.x + 12,
      wizhingWellImage.y - wizhingWellImage.height * 0.5 + 40,
      'photoStrap'
    );
    photoStrapTopLeft.setScale(0.5);
    photoStrapTopLeft.setFlipX(true);
    this.add(photoStrapTopLeft);

    const photoStrapTopRight = this.scene.add.image(
      wizhingWellImage.x + wizhingWellImage.width - 72,
      photoStrapTopLeft.y,
      'photoStrap'
    );
    photoStrapTopRight.setScale(photoStrapTopLeft.scale);
    this.add(photoStrapTopRight);

    const photoStrapBottomLeft = this.scene.add.image(
      photoStrapTopLeft.x,
      wizhingWellImage.y + wizhingWellImage.height * 0.5 - 40,
      'photoStrap'
    );
    photoStrapBottomLeft.setScale(photoStrapTopLeft.scale);
    photoStrapBottomLeft.setFlipX(true);
    photoStrapBottomLeft.setFlipY(true);
    this.add(photoStrapBottomLeft);

    const photoStrapBottomRight = this.scene.add.image(
      photoStrapTopRight.x,
      photoStrapBottomLeft.y,
      'photoStrap'
    );
    photoStrapBottomRight.setScale(photoStrapTopLeft.scale);
    photoStrapBottomRight.setFlipX(false);
    photoStrapBottomRight.setFlipY(true);
    this.add(photoStrapBottomRight);

    const wizhTitle = this.scene.add.text(-36, -92, 'The Wizhing Well', {
      fontSize: '18px',
      fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
      fontStyle: SW_CST.STYLE.TEXT.FONT_STYLE_BOLD,
      color: SW_CST.STYLE.COLOR.TEXT,
      align: 'left',
    });
    wizhTitle.setOrigin(0, 0.5);
    this.add(wizhTitle);

    const headerDelimiter = this.scene.add.line(
      0,
      0,
      wizhTitle.x + wizhTitle.width + 8,
      wizhTitle.y,
      rightX,
      wizhTitle.y,
      0xd9cbb8,
      1
    );
    headerDelimiter.setLineWidth(2);
    headerDelimiter.setOrigin(0);
    this.add(headerDelimiter);

    const contentText = this.scene.add.text(
      wizhTitle.x,
      wizhTitle.y + wizhTitle.height * 0.5 + 16,
      'You have found the Wizhing Well! It draws from a source of incredible energy.\nUse your wishes to get new treasures.',
      {
        color: SW_CST.STYLE.COLOR.TEXT,
        fontSize: '12px',
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        fontStyle: SW_CST.STYLE.TEXT.FONT_STYLE_MEDIUM,
        align: 'left',
      }
    );
    contentText.setFixedSize(rightX - wizhTitle.x, 0);
    contentText.setWordWrapWidth(contentText.width);
    contentText.setOrigin(0);
    this.add(contentText);

    const buttonWidth = 110;
    const buttonHeight = 32;

    const buttonStyle = {
      width: buttonWidth,
      height: buttonHeight,
      backgroundObject: this.scene.rexUI.add.roundRectangle(0, 0, 1, 1, 4),
      colorBackgroundNormal: 0xe1b67e,
      colorBackgroundPressed: 0xd4a972,
      colorBackgroundHovered: 0xe1b67e,
      strokeThicknessBackgroundNormal: 2,
      strokeColorBackgroundNormal: 0xffffff,
      text: 'Make a wizh!',
      textStyle: {
        fontStyle: SW_CST.STYLE.TEXT.FONT_STYLE_MEDIUM,
        fontSize: '13px',
        color: SW_CST.STYLE.COLOR.TEXT,
      },
    };

    const makeAWizhButton = new SW_ButtonBase(
      this.scene,
      contentText.x + contentText.width * 0.5 + 70,
      this.height * 0.5 - buttonHeight * 0.5 - 150,
      buttonStyle
    );
    this.add(makeAWizhButton);
    makeAWizhButton.onClicked(this.onMakeAWizhButtonClicked, this);

    buttonStyle.backgroundObject = this.scene.rexUI.add.roundRectangle(
      0,
      0,
      1,
      1,
      4
    );
    buttonStyle.colorBackgroundNormal = 0xdacbb8;
    buttonStyle.colorBackgroundHovered = 0xddd0bf;
    buttonStyle.colorBackgroundPressed = 0xc4b6a5;
    buttonStyle.strokeThicknessBackgroundNormal = 0;
    buttonStyle.text = 'Back';

    const backButton = new SW_ButtonBase(
      this.scene,
      contentText.x + contentText.width * 0.5 - 70,
      this.height * 0.5 - buttonHeight * 0.5 - 150,
      buttonStyle
    );
    this.add(backButton);
    backButton.onClicked(this.hideMenu, this);

    const self = this;
    wizhingWellStore.$onAction(function (element) {
      if (element.name == 'triggerAction1') {
        self.emit('wizhingWellResult', ['jackpot']);
      }
    }, true);
  }

  protected async onMakeAWizhButtonClicked(): Promise<void> {
    this.emit('makeAWizhButtonClicked');
    const name = await wizhingWellStore.triggerAction1();
    SW_GameEventManager.sendGameplayEvent({
      key: 'Event.WizhingWell.WizhMade',
    });
  }
}
