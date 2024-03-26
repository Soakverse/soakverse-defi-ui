import VirtualJoyStick from 'phaser3-rex-plugins/plugins/virtualjoystick';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';

export class SW_Joystick extends VirtualJoyStick {
  public declare scene: SW_BaseScene;

  protected joystickZone: Phaser.GameObjects.Zone;
  public base: Phaser.GameObjects.GameObject &
    Phaser.GameObjects.Components.Depth;
  public thumb: Phaser.GameObjects.GameObject &
    Phaser.GameObjects.Components.Depth;

  constructor(scene: SW_BaseScene, x: number, y: number) {
    const joystick = scene.add.zone(
      0,
      0,
      scene.game.canvas.width,
      scene.game.canvas.height
    );

    const base = scene.add.circle(0, 0, 44, 0xbbbbbb, 0.42);
    const thumb = scene.add.circle(0, 0, 16, 0xdddddd, 0.6);

    super(scene, {
      x: x,
      y: y,
      radius: 38,
      dir: '8dir',
      forceMin: 14,
      fixed: true,
      enable: true,
      base: base,
      thumb: thumb,
    });

    this.base = base;
    this.thumb = thumb;

    this.on(
      Phaser.Input.Events.POINTER_UP,
      (pointer: Phaser.Input.Pointer) => {
        this.setVisible(false);
      },
      this
    );

    this.joystickZone = joystick;
    this.joystickZone.setOrigin(0, 0);
    this.joystickZone.setScrollFactor(0);
    this.joystickZone.setInteractive();

    this.joystickZone.on(
      Phaser.Input.Events.POINTER_DOWN,
      (pointer: Phaser.Input.Pointer) => {
        this.setPosition(pointer.x, pointer.y);
        this.setVisible(true);
      },
      this
    );

    this.joystickZone.on(
      Phaser.Input.Events.POINTER_UP,
      (pointer: Phaser.Input.Pointer) => {
        this.setVisible(false);
      },
      this
    );
  }

  public setDepth(value: number): void {
    this.joystickZone.setDepth(value);
    this.base.setDepth(value);
    this.thumb.setDepth(value);
  }

  public setEnable(enable?: boolean | undefined): this {
    if (enable) {
      this.joystickZone.setInteractive();
    } else {
      this.joystickZone.disableInteractive();
    }
    super.setEnable(enable);
    return this;
  }

  public destroy(): void {
    if (this.joystickZone) {
      this.joystickZone.destroy();
    }
  }
}
