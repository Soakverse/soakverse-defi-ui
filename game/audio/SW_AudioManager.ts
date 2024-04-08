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
  protected static volumeMusics: number = 0.05;
  protected static volumeSoundEffects: number = 0.1;

  protected static loopingMusics: SW_SoundTypes[];
  protected static loopingSoundEffects: SW_SoundTypes[];

  constructor() {
    super();

    console.error('SW_AudioManager should not be instance!');
  }

  public static init(phaserSoundManager: SW_SoundManagerTypes): void {
    phaserSoundManager.volume = 1;
    phaserSoundManager.pauseOnBlur = false;

    SW_AudioManager.phaserSoundManager = phaserSoundManager;
    SW_AudioManager.loopingMusics = [];
    SW_AudioManager.loopingSoundEffects = [];
  }

  protected static playAudio(
    key: string,
    loop: boolean,
    volume: number,
    audioArray?: SW_SoundTypes[] | undefined
  ) {
    if (loop) {
      if (audioArray) {
        const music = SW_AudioManager.phaserSoundManager.add(key, {
          loop: true,
          volume: volume,
        });
        music.play();
        audioArray.push(music);
      } else {
        console.warn(
          'Tried to play loop music but no audio array was provided'
        );
      }
    } else {
      SW_AudioManager.phaserSoundManager.play(key, {
        loop: loop,
        volume: volume,
      });
    }
  }

  public static playMusic(key: string, loop: boolean = false): void {
    SW_AudioManager.playAudio(
      key,
      loop,
      SW_AudioManager.volumeMusics,
      SW_AudioManager.loopingMusics
    );
  }

  public static playSoundEffect(key: string, loop: boolean = false): void {
    SW_AudioManager.playAudio(
      key,
      loop,
      SW_AudioManager.volumeSoundEffects,
      SW_AudioManager.loopingSoundEffects
    );
  }

  public static setMusicVolume(volume: number): void {
    SW_AudioManager.volumeMusics = volume;

    for (const music of SW_AudioManager.loopingMusics) {
      music.setVolume(volume);
    }
  }

  public static setSoundEffectsVolume(volume: number): void {
    SW_AudioManager.volumeSoundEffects = volume;

    for (const music of SW_AudioManager.loopingSoundEffects) {
      music.setVolume(volume);
    }
  }

  public static getMusicVolume(): number {
    return SW_AudioManager.volumeMusics;
  }

  public static getSoundEffectsVolume(): number {
    return SW_AudioManager.volumeSoundEffects;
  }
}
