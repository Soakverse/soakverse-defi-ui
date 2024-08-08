import { SW_CST } from '~/game/SW_CST';
import { useWizhingWellStore } from '@/stores/wizhingWellStore';
import { SW_ButtonBase } from '../../Widgets/SW_ButtonBase';
import { SW_BaseMenu } from '../SW_BaseMenu';
import { SW_MenuManager } from '../SW_MenuManager';
import { SW_Utils } from '~/game/SW_Utils';
import { SW_GameEventManager } from '~/game/SW_GameEventManager';

const wizhingWellStore = useWizhingWellStore();

export class SW_WizhMenu extends SW_BaseMenu {
  constructor(menuManager: SW_MenuManager, x: number, y: number) {
    super(menuManager, x, y);
    this.scene.add.existing(this);

    const background = this.scene.add.image(0, 0, 'menuBackground');
    background.setOrigin(0.5);
    this.add(background);

    this.width = background.width;
    this.height = background.height;

    const leftX = Math.floor(-this.width * 0.5) + 48;
    const rightX = Math.floor(this.width * 0.5) - 48;

    const closeButton = new SW_ButtonBase(
      this.scene,
      rightX,
      Math.floor(-this.height * 0.5) + 48,
      {
        backgroundObject: this.scene.add.image(0, 0, 'closeButton'),
        textureNormal: 'closeButtonNormal',
        textureHovered: 'closeButtonHovered',
        texturePressed: 'closeButtonPressed',
      }
    );
    closeButton.onClicked(this.hideMenu, this);
    this.add(closeButton);

    const wizhIcon = this.scene.add.image(
      leftX,
      Math.floor(-this.height * 0.5) + 56,
      'wizhIconTitle'
    );
    wizhIcon.setOrigin(0, 0);
    this.add(wizhIcon);

    const wizhTitle = this.scene.add.text(
      Math.floor(wizhIcon.x + wizhIcon.width + 8),
      Math.floor(wizhIcon.y + wizhIcon.height * 0.5),
      'The Wizhing Well',
      {
        fontSize: '20px',
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        fontStyle: 'bold',
        color: SW_CST.STYLE.COLOR.TEXT,
        align: 'left',
      }
    );
    wizhTitle.setOrigin(0, 0.5);
    this.add(wizhTitle);

    const headerDelimiter = SW_Utils.drawDashLineOnX(
      this.scene,
      leftX,
      rightX,
      wizhTitle.y + wizhTitle.height * 0.5 + 24,
      [4, 4]
    );
    this.add(headerDelimiter);

    const contentText = this.scene.add.text(
      leftX,
      10,
      'You have found the Wizhing Well. It draws from a source of incredible energy.\n\nUse your wizhes to get new treasures.',
      {
        color: SW_CST.STYLE.COLOR.BLACK,
        fontSize: '16px',
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        align: 'justify',
      }
    );
    contentText.setFixedSize(230, 0);
    contentText.setWordWrapWidth(contentText.width);
    contentText.setOrigin(0, 0.5);
    this.add(contentText);

    const wizhingWellBackground = this.scene.add.image(
      rightX,
      36,
      'wizhingWellBackground'
    );
    wizhingWellBackground.setOrigin(1, 0.5);
    this.add(wizhingWellBackground);

    const wizhButtonWidth = 140;
    const wizhButtonHeight = 36;

    const makeAWizhButton = new SW_ButtonBase(
      this.scene,
      contentText.x + contentText.width * 0.5,
      this.height * 0.5 - wizhButtonHeight * 0.5 - 36,
      {
        width: wizhButtonWidth,
        height: wizhButtonHeight,
        backgroundObject: this.scene.rexUI.add.roundRectangle(0, 0, 1, 1, 4),
        colorBackgroundNormal: 0xdacbb8,
        colorBackgroundPressed: 0xc4b6a5,
        colorBackgroundHovered: 0xddd0bf,
        text: 'Make a Wizh',
        textStyle: {
          fontStyle: SW_CST.STYLE.TEXT.FONT_STYLE_MEDIUM,
          fontSize: '13px',
          color: SW_CST.STYLE.COLOR.TEXT,
        },
      }
    );
    this.add(makeAWizhButton);
    makeAWizhButton.onClicked(this.onMakeAWizhButtonClicked, this);

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
