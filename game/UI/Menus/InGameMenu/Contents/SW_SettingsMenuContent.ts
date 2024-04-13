import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_InGameMenuContent } from './SW_InGameMenuContent';
import { SW_InGameMenuContentConfig } from './SW_InGameMenuContent';
import { SW_CST } from '~/game/SW_CST';
import { SW_TextButton } from '~/game/UI/Widgets/buttons/SW_TextButton';
import { SW_Slider } from '~/game/UI/Widgets/SW_Slider';
import { SW_AudioManager } from '~/game/audio/SW_AudioManager';
import { SW_ToggleSwitch } from '~/game/UI/Widgets/SW_ToggleSwitch';

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
    const sliderHeight = 4;
    const sliderTrackHeight = 4;

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

    const valueStyle = {
      fontSize: '13px',
      fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
      fontStyle: 'bold',
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

    const fullscreenToggle = new SW_ToggleSwitch(
      this.scene,
      windowedModeText.x + windowedModeText.width + 32,
      -30
    );
    fullscreenToggle.setValue(this.scene.scale.isFullscreen);
    fullscreenToggle.on('valuechange', this.onFullscreenChanged);
    this.add(fullscreenToggle);

    this.scene.scale.on(
      Phaser.Scale.Events.ENTER_FULLSCREEN,
      () => {
        fullscreenToggle.setValue(true);
      },
      this
    );
    this.scene.scale.on(
      Phaser.Scale.Events.LEAVE_FULLSCREEN,
      () => {
        fullscreenToggle.setValue(false);
      },
      this
    );

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

    const musicLabel = this.scene.add.text(
      leftX,
      volumeTitle.y + volumeTitle.height + 14,
      'Music',
      labelStyle
    );
    musicLabel.setOrigin(0, 0);
    this.add(musicLabel);

    const soundEffectsLabel = this.scene.add.text(
      leftX,
      musicLabel.y + musicLabel.height + 16,
      'Sound Effects',
      labelStyle
    );
    soundEffectsLabel.setOrigin(0, 0);
    this.add(soundEffectsLabel);

    const musicVolumeValueText = this.scene.add.text(
      Math.floor(soundEffectsLabel.x + soundEffectsLabel.width + 16),
      Math.floor(musicLabel.y + musicLabel.height * 0.5),
      '100%',
      valueStyle
    );
    musicVolumeValueText.setOrigin(0, 0.5);
    this.add(musicVolumeValueText);

    const soundEffectVolumeValueText = this.scene.add.text(
      musicVolumeValueText.x,
      Math.floor(soundEffectsLabel.y + soundEffectsLabel.height * 0.5),
      '100%',
      valueStyle
    );
    soundEffectVolumeValueText.setOrigin(0, 0.5);
    this.add(soundEffectVolumeValueText);

    const sliderWidth =
      Math.abs(rightX - soundEffectVolumeValueText.x) -
      soundEffectVolumeValueText.width -
      delimiterSpacing;

    const sliderMusic = new SW_Slider(
      this.scene,
      Math.floor(
        musicVolumeValueText.x + musicVolumeValueText.width + delimiterSpacing
      ),
      Math.floor(musicLabel.y + musicLabel.height * 0.5),
      {
        width: sliderWidth,
        height: sliderHeight,
        trackHeight: sliderTrackHeight,
        input: 'drag',
        value: SW_AudioManager.getMusicVolume(),
        valuechangeCallback: (newValue: number, oldValue: number) => {
          SW_AudioManager.setMusicVolume(newValue);
          musicVolumeValueText.setText(`${(newValue * 100).toFixed(0)}%`);
        },
      }
    );
    sliderMusic.setOrigin(0, 0);
    sliderMusic.layout();
    this.add(sliderMusic);

    const sliderSoundEffects = new SW_Slider(
      this.scene,
      sliderMusic.x,
      Math.floor(soundEffectsLabel.y + soundEffectsLabel.height * 0.5),
      {
        width: sliderWidth,
        height: sliderHeight,
        trackHeight: sliderTrackHeight,
        min: 0,
        max: 1,
        input: 'drag',
        value: SW_AudioManager.getSoundEffectsVolume(),
        valuechangeCallback: (newValue: number, oldValue: number) => {
          SW_AudioManager.setSoundEffectsVolume(newValue);
          soundEffectVolumeValueText.setText(`${(newValue * 100).toFixed(0)}%`);
        },
      }
    );
    sliderSoundEffects.setOrigin(0, 0);
    sliderSoundEffects.layout();
    this.add(sliderSoundEffects);
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

  protected onFullscreenChanged(value: boolean): void {
    if (value) {
      this.scene.scale.startFullscreen();
    } else {
      this.scene.scale.stopFullscreen();
    }
  }
}
