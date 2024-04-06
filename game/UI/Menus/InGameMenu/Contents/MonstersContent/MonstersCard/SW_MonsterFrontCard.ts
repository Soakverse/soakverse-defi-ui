import { Label } from 'phaser3-rex-plugins/templates/ui/ui-components';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';

declare type SW_MonsterFrontCardConfig = {
  width: number;
  height: number;
  iconSize: number;
  texture: string;
};

export class SW_MonsterFrontCard extends Label {
  protected frontDynamicTexture: Phaser.Textures.DynamicTexture;

  constructor(scene: SW_BaseScene, config: SW_MonsterFrontCardConfig) {
    const background = scene.add.image(0, 0, '');
    super(scene, { background: background, iconSize: config.iconSize });
    this.scene.add.existing(this);

    this.frontDynamicTexture = this.scene.textures.addDynamicTexture(
      `frontMonsterTexture${Phaser.Math.RND.uuid()}`,
      config.width,
      config.height
    ) as Phaser.Textures.DynamicTexture;
    this.frontDynamicTexture.setIsSpriteTexture(true);
    background.setTexture(this.frontDynamicTexture.key);

    this.updateTexture(config.texture, config.width, config.height);
  }

  public destroy(fromScene?: boolean | undefined): void {
    if (this.frontDynamicTexture) {
      this.frontDynamicTexture.destroy(); // Should be safe to destroy since only this card should use this dynamic texture
    }
    super.destroy(fromScene);
  }

  public updateTexture(texture: string, width?: number, height?: number): void {
    width = width ?? this.width;
    height = height ?? this.height;

    const strapOffsetX = 14;
    const strapOffsetY = 14;

    const texturesData = [
      {
        texture: texture,
        x: 0,
        y: 0,
        originX: 0,
        originY: 0,
        scale: 0.84,
        flipX: false,
        flipY: false,
      },
      {
        // top-left
        texture: 'photoStrap',
        x: strapOffsetX,
        y: strapOffsetY,
        originX: 0.5,
        originY: 0.5,
        scale: 0.8,
        flipX: true,
        flipY: false,
      },
      {
        // top-right
        texture: 'photoStrap',
        x: width - strapOffsetX,
        y: strapOffsetY,
        originX: 0.5,
        originY: 0.5,
        scale: 0.8,
        flipX: false,
        flipY: false,
      },
      {
        // bottom-left
        texture: 'photoStrap',
        x: strapOffsetX,
        y: height - strapOffsetY,
        originX: 0.5,
        originY: 0.5,
        scale: 0.8,
        flipX: true,
        flipY: true,
      },
      {
        // bottom-right
        texture: 'photoStrap',
        x: width - strapOffsetX,
        y: height - strapOffsetY,
        originX: 0.5,
        originY: 0.5,
        scale: 0.8,
        flipX: false,
        flipY: true,
      },
    ];

    this.frontDynamicTexture.clear();
    this.frontDynamicTexture.beginDraw();

    for (const textureData of texturesData) {
      const image = this.scene.add.image(0, 0, textureData.texture);
      image.setOrigin(textureData.originX, textureData.originY);
      image.setScale(textureData.scale, textureData.scale);
      image.setFlip(textureData.flipX, textureData.flipY);
      this.frontDynamicTexture.batchDraw([image], textureData.x, textureData.y);
      image.destroy();
    }

    this.frontDynamicTexture.endDraw();
  }
}
