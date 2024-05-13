import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_InGameMenuContent } from './SW_InGameMenuContent';
import { SW_InGameMenuContentConfig } from './SW_InGameMenuContent';
import { SW_CST } from '~/game/SW_CST';
import { SW_Slider } from '~/game/UI/Widgets/SW_Slider';
import { SW_AudioManager } from '~/game/audio/SW_AudioManager';
import { SW_ToggleSwitch } from '~/game/UI/Widgets/SW_ToggleSwitch';
import { SW_ButtonBase } from '~/game/UI/Widgets/buttons/SW_ButtonBase';

export class SW_SettingsMenuContent extends SW_InGameMenuContent {
  public declare scene: SW_BaseScene;

  protected declare fullscreenToggle: SW_ToggleSwitch;
  protected declare sliderMusic: SW_Slider;
  protected declare sliderSoundEffects: SW_Slider;

  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    config?: SW_InGameMenuContentConfig
  ) {
    super(scene, x, y, config);

    this.createLeftPage();
    this.createRightPage();

    this.resetSettings();
  }

  protected createLeftPage(): void {
    const leftX = Math.floor(-this.width * 0.5 + 64);
    const rightX = -32;
    const delimiterSpacing = 8;
    const sliderHeight = 4;
    const sliderTrackHeight = 4;

    const settingsIcon = this.scene.add.image(
      leftX,
      Math.floor(-this.height * 0.5) + 64,
      'settingsIconTitle'
    );
    settingsIcon.setOrigin(0, 0);
    this.add(settingsIcon);

    const settingsTitle = this.scene.add.text(
      Math.floor(settingsIcon.x + settingsIcon.width + 8),
      Math.floor(settingsIcon.y + settingsIcon.height * 0.5),
      'Settings',
      {
        fontSize: '20px',
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
      Math.floor(settingsTitle.y + settingsTitle.height * 0.5 + 20),
      'Screen size',
      SW_CST.STYLE.TEXT.SECTION
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

    const windowedModeLabel = this.scene.add.text(
      leftX,
      screenSizeTitle.y + screenSizeTitle.height + 16,
      'Windowed mode',
      SW_CST.STYLE.TEXT.LABEL
    );
    windowedModeLabel.setOrigin(0, 0);
    this.add(windowedModeLabel);

    const fullScreenModeLabel = this.scene.add.text(
      rightX,
      windowedModeLabel.y,
      'Full screen mode',
      SW_CST.STYLE.TEXT.LABEL
    );
    fullScreenModeLabel.setOrigin(1, 0);
    this.add(fullScreenModeLabel);

    this.fullscreenToggle = new SW_ToggleSwitch(
      this.scene,
      windowedModeLabel.x + windowedModeLabel.width + 32,
      0
    );
    this.fullscreenToggle.setY(
      Math.floor(windowedModeLabel.y + fullScreenModeLabel.height * 0.5)
    );
    this.fullscreenToggle.setValue(this.scene.scale.isFullscreen);
    this.fullscreenToggle.on('valuechange', this.onFullscreenChanged);
    this.add(this.fullscreenToggle);

    this.scene.scale.on(
      Phaser.Scale.Events.ENTER_FULLSCREEN,
      () => {
        this.fullscreenToggle.setValue(true);
      },
      this
    );
    this.scene.scale.on(
      Phaser.Scale.Events.LEAVE_FULLSCREEN,
      () => {
        this.fullscreenToggle.setValue(false);
      },
      this
    );

    //////// Volume
    const volumeTitle = this.scene.add.text(
      leftX,
      Math.floor(windowedModeLabel.y + windowedModeLabel.height + 24),
      'Volume',
      SW_CST.STYLE.TEXT.SECTION
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
      SW_CST.STYLE.TEXT.LABEL
    );
    musicLabel.setOrigin(0, 0);
    this.add(musicLabel);

    const soundEffectsLabel = this.scene.add.text(
      leftX,
      musicLabel.y + musicLabel.height + 16,
      'Sound Effects',
      SW_CST.STYLE.TEXT.LABEL
    );
    soundEffectsLabel.setOrigin(0, 0);
    this.add(soundEffectsLabel);

    const musicVolumeValueText = this.scene.add.text(
      Math.floor(soundEffectsLabel.x + soundEffectsLabel.width + 16),
      Math.floor(musicLabel.y + musicLabel.height * 0.5),
      '100%',
      SW_CST.STYLE.TEXT.SETTINGS_VALUE
    );
    musicVolumeValueText.setOrigin(0, 0.5);
    this.add(musicVolumeValueText);

    const soundEffectVolumeValueText = this.scene.add.text(
      musicVolumeValueText.x,
      Math.floor(soundEffectsLabel.y + soundEffectsLabel.height * 0.5),
      '100%',
      SW_CST.STYLE.TEXT.SETTINGS_VALUE
    );
    soundEffectVolumeValueText.setOrigin(0, 0.5);
    this.add(soundEffectVolumeValueText);

    const sliderWidth =
      Math.abs(rightX - soundEffectVolumeValueText.x) -
      soundEffectVolumeValueText.width -
      delimiterSpacing;

    this.sliderMusic = new SW_Slider(
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
    this.sliderMusic.setOrigin(0, 0);
    this.sliderMusic.layout();
    this.add(this.sliderMusic);

    this.sliderSoundEffects = new SW_Slider(
      this.scene,
      this.sliderMusic.x,
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
    this.sliderSoundEffects.setOrigin(0, 0);
    this.sliderSoundEffects.layout();
    this.add(this.sliderSoundEffects);

    const buttonResetSettings = new SW_ButtonBase(this.scene, 0, 0, {
      width: 120,
      height: 28,
      backgroundObject: this.scene.rexUI.add.roundRectangle(0, 0, 1, 1, 4),
      colorBackgroundNormal: 0xdacbb8,
      colorBackgroundPressed: 0xc4b6a5,
      colorBackgroundHovered: 0xddd0bf,
      text: 'Reset Settings',
    });
    buttonResetSettings.onClicked(this.resetSettings, this);
    this.add(buttonResetSettings);

    buttonResetSettings.setPosition(
      Math.floor(soundEffectsLabel.x + buttonResetSettings.width * 0.5),
      Math.floor(
        soundEffectsLabel.y +
          soundEffectsLabel.height +
          buttonResetSettings.height * 0.5 +
          24
      )
    );
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

  protected resetSettings(): void {
    this.scene.scale.stopFullscreen();
    this.sliderMusic.setValue(0.1);
    this.sliderSoundEffects.setValue(0.2);
  }
}
