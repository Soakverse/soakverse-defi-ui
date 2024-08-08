import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_InGameMenuContent } from './SW_InGameMenuContent';
import { SW_InGameMenuContentConfig } from './SW_InGameMenuContent';
import { SW_CST } from '~/game/SW_CST';

export class SW_CharacterMenuContent extends SW_InGameMenuContent {
  public declare scene: SW_BaseScene;

  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    config?: SW_InGameMenuContentConfig
  ) {
    super(scene, x, y, config);

    const pageBackground = this.scene.add.image(
      330,
      130,
      'magnifyingGlassBackground'
    );
    pageBackground.setScale(0.74);
    pageBackground.setOrigin(1);
    this.add(pageBackground);

    const messageBackground = this.scene.add.image(
      0,
      -24,
      'noCompletedQuestBackground'
    );
    messageBackground.setScale(0.8);
    messageBackground.setOrigin(0.5);
    this.add(messageBackground);

    const message = this.scene.add.text(0, -28, 'Coming soon!', {
      fontSize: '17px',
      fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
      fontStyle: SW_CST.STYLE.TEXT.FONT_STYLE_MEDIUM,
      color: SW_CST.STYLE.COLOR.TEXT,
    });
    message.setOrigin(0.5);
    this.add(message);
  }
}
