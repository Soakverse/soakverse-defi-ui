import { SW_CST } from '~/game/SW_CST';
import { SW_ButtonBase } from '~/game/UI/Widgets/SW_ButtonBase';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';

export class SW_InGameMenuTab extends SW_ButtonBase {
  public declare scene: SW_BaseScene;

  constructor(scene: SW_BaseScene, x: number, y: number, text?: string) {
    super(scene, x, y, {
      width: 108,
      height: 40,
      backgroundObject: scene.add.image(0, 0, 'inGameMenuTabNormal'),
      textureNormal: 'inGameMenuTabNormal',
      textureNormalSelected: 'inGameMenuTabSelected',
      text: text ?? 'Tab',
      textStyle: { fontSize: '14px', color: '#684C3C', fontStyle: '' },
      textStyleSelected: {
        fontSize: '14px',
        color: SW_CST.STYLE.COLOR.TEXT,
        fontStyle: SW_CST.STYLE.TEXT.FONT_STYLE_BOLD,
      },
    });
  }
}
