declare type SW_SoundManagerTypes =
  | Phaser.Sound.NoAudioSoundManager
  | Phaser.Sound.HTML5AudioSoundManager
  | Phaser.Sound.WebAudioSoundManager;

declare type SW_SoundTypes =
  | Phaser.Sound.HTML5AudioSound
  | Phaser.Sound.WebAudioSound
  | Phaser.Sound.NoAudioSound;

export class SW_AudioManager extends Phaser.Events.EventEmitter {
  protected static phaserSoundManager: SW_SoundManagerTypes;
  protected static volumeMusics: number = 0.1;
  protected static volumeSoundEffects: number = 0.1;

  protected static loopingMusics: SW_SoundTypes[];

  constructor() {
    super();

    console.error('SW_AudioManager should not be instance!');
  }

  public static init(phaserSoundManager: SW_SoundManagerTypes): void {
    phaserSoundManager.volume = 1;
    phaserSoundManager.pauseOnBlur = false;

    SW_AudioManager.phaserSoundManager = phaserSoundManager;
    SW_AudioManager.loopingMusics = [];
  }

  public static playMusic(key: string, loop: boolean): void {
    if (loop) {
      const music = SW_AudioManager.phaserSoundManager.add(key, {
        loop: true,
        volume: SW_AudioManager.volumeMusics,
      });
      music.play();
      SW_AudioManager.loopingMusics.push(music);
    } else {
      SW_AudioManager.phaserSoundManager.play(key, {
        loop: loop,
        volume: SW_AudioManager.volumeMusics,
      });
    }
  }

  public static setMusicVolume(volume: number): void {
    SW_AudioManager.volumeMusics = volume;

    for (const music of SW_AudioManager.loopingMusics) {
      music.setVolume(volume);
    }
  }

  public static getMusicVolume(): number {
    return SW_AudioManager.volumeMusics;
  }
}
