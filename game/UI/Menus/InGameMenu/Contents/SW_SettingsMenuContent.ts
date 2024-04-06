import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_InGameMenuContent } from './SW_InGameMenuContent';
import { SW_InGameMenuContentConfig } from './SW_InGameMenuContent';
import { SW_CST } from '~/game/SW_CST';
import { SW_TextButton } from '~/game/UI/buttons/SW_TextButton';

export class SW_SettingsMenuContent extends SW_InGameMenuContent {
  public declare scene: SW_BaseScene;

  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    config?: SW_InGameMenuContentConfig
  ) {
    super(scene, x, y, config);

    this.createLeftPage();
    this.createRightPage();
  }

  protected createLeftPage(): void {
    const leftX = Math.floor(-this.width * 0.5 + 64);
    const rightX = -32;
    const delimiterSpacing = 8;

    const sectionStyle = {
      fontSize: '16px',
      fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
      fontStyle: 'bold',
      color: SW_CST.STYLE.COLOR.TEXT,
      align: 'left',
    };

    const labelStyle = {
      fontSize: '13px',
      fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
      // fontStyle: 'bold',
      color: SW_CST.STYLE.COLOR.TEXT,
      align: 'left',
    };

    const settingsIcon = this.scene.add.image(
      leftX,
      Math.floor(-this.height * 0.5) + 72,
      'settingsIconTitle'
    );
    settingsIcon.setOrigin(0, 0);
    this.add(settingsIcon);

    const settingsTitle = this.scene.add.text(
      Math.floor(settingsIcon.x + settingsIcon.width + 8),
      Math.floor(settingsIcon.y + settingsIcon.height * 0.5),
      'Settings',
      {
        fontSize: '24px',
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        fontStyle: 'bold',
        color: SW_CST.STYLE.COLOR.TEXT,
        align: 'left',
      }
    );
    settingsTitle.setOrigin(0, 0.5);
    this.add(settingsTitle);

    //////// Screen Size
    const screenSizeTitle = this.scene.add.text(
      leftX,
      Math.floor(settingsTitle.y + settingsTitle.height * 0.5 + 32),
      'Screen size',
      sectionStyle
    );
    screenSizeTitle.setOrigin(0, 0);
    this.add(screenSizeTitle);

    const delimiterScreenSizeSection = this.scene.add.line(
      screenSizeTitle.x + screenSizeTitle.width + delimiterSpacing,
      Math.floor(screenSizeTitle.y + screenSizeTitle.height * 0.5),
      0,
      0,
      Math.abs(rightX - leftX) - screenSizeTitle.width - delimiterSpacing,
      0,
      0xd9cbb8,
      1
    );
    delimiterScreenSizeSection.setOrigin(0, 0);
    delimiterScreenSizeSection.setLineWidth(2);
    this.add(delimiterScreenSizeSection);

    const windowedModeText = this.scene.add.text(
      leftX,
      screenSizeTitle.y + screenSizeTitle.height + 14,
      'Windowed mode',
      labelStyle
    );
    windowedModeText.setOrigin(0, 0);
    this.add(windowedModeText);

    const fullScreenModeText = this.scene.add.text(
      rightX,
      windowedModeText.y,
      'Full screen mode',
      labelStyle
    );
    fullScreenModeText.setOrigin(1, 0);
    this.add(fullScreenModeText);

    const fullscreenButton = new SW_TextButton(
      this.scene,
      windowedModeText.x + windowedModeText.width + 32,
      -30,
      ''
    );
    this.add(fullscreenButton);
    fullscreenButton.onClicked(this.onFullscreenButtonClicked, this);
    fullscreenButton.setDisplaySize(40, 24);

    //////// Volume
    const volumeTitle = this.scene.add.text(
      leftX,
      Math.floor(windowedModeText.y + windowedModeText.height + 32),
      'Volume',
      sectionStyle
    );
    volumeTitle.setOrigin(0, 0);
    this.add(volumeTitle);

    const delimiterVolumeSection = this.scene.add.line(
      volumeTitle.x + volumeTitle.width + delimiterSpacing,
      Math.floor(volumeTitle.y + volumeTitle.height * 0.5),
      0,
      0,
      Math.abs(rightX - leftX) - volumeTitle.width - delimiterSpacing,
      0,
      0xd9cbb8,
      1
    );
    delimiterVolumeSection.setOrigin(0, 0);
    delimiterVolumeSection.setLineWidth(2);
    this.add(delimiterVolumeSection);

    const musicText = this.scene.add.text(
      leftX,
      volumeTitle.y + volumeTitle.height + 14,
      'Music',
      labelStyle
    );
    musicText.setOrigin(0, 0);
    this.add(musicText);

    const soundEffectsText = this.scene.add.text(
      leftX,
      musicText.y + musicText.height + 16,
      'Sound Effects',
      labelStyle
    );
    soundEffectsText.setOrigin(0, 0);
    this.add(soundEffectsText);
  }

  protected createRightPage(): void {
    const settingsBackground = this.scene.add.image(
      172,
      -4,
      'settingsBackground'
    );
    settingsBackground.setScale(0.88);
    this.add(settingsBackground);
  }

  protected onToggleSoundButtonClicked(): void {}

  protected onFullscreenButtonClicked(): void {
    if (this.scene.scale.isFullscreen) {
      this.scene.scale.stopFullscreen();
    } else {
      this.scene.scale.startFullscreen();
    }
  }
}
