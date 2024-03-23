import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_InGameMenuContent } from './SW_InGameMenuContent';
import { SW_InGameMenuContentConfig } from './SW_InGameMenuContent';
import { SW_CST } from '~/game/SW_CST';

export class SW_MonstersMenuContent extends SW_InGameMenuContent {
  public declare scene: SW_BaseScene;

  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    config?: SW_InGameMenuContentConfig
  ) {
    super(scene, x, y, config);

    const comingSoonText = this.scene.add.text(0, 0, 'COMING SOON!', {
      fontSize: '44px',
      fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
      color: SW_CST.STYLE.COLOR.BLUE,
    });
    comingSoonText.setOrigin(0.5);
    this.add(comingSoonText);
  }
}
