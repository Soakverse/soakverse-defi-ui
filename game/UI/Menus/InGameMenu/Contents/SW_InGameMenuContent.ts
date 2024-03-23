import SW_BaseScene from '~/game/scenes/SW_BaseScene';

export declare type SW_InGameMenuContentConfig = {
  width?: number;
  height?: number;
};

export class SW_InGameMenuContent extends Phaser.GameObjects.Container {
  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    config?: SW_InGameMenuContentConfig
  ) {
    super(scene, x, y);
    this.scene.add.existing(this);

    if (config) {
      this.width = config.width ?? 0;
      this.height = config.height ?? 0;
    }
  }
}
