import { SW_ButtonBase } from '~/game/UI/Widgets/SW_ButtonBase';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';

export class SW_MonsterMenuTab extends SW_ButtonBase {
  public declare scene: SW_BaseScene;

  constructor(scene: SW_BaseScene, x: number, y: number) {
    super(scene, x, y, {
      width: 108,
      height: 40,
      backgroundObject: scene.add.image(0, 0, 'inGameMenuTabNormal'),
      textureNormal: 'inGameMenuTabNormal',
      textureNormalSelected: 'inGameMenuTabSelected',
      text: 'Monster 00',
      textStyle: { fontSize: '14px', color: '#684C3C', fontStyle: '' },
      textStyleSelected: {
        fontSize: '14px',
        color: '#4D2B1D',
        fontStyle: 'bold',
      },
    });
  }
}
