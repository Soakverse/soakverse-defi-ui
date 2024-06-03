import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_InGameMenuContent } from './SW_InGameMenuContent';
import { SW_InGameMenuContentConfig } from './SW_InGameMenuContent';
import { SW_CST } from '~/game/SW_CST';
import { SW_Quest, SW_QuestManager } from '~/game/quests/SW_QuestManager';

export class SW_QuestsMenuContent extends SW_InGameMenuContent {
  public declare scene: SW_BaseScene;

  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    config?: SW_InGameMenuContentConfig
  ) {
    super(scene, x, y, config);

    this.createLeftPage();
    this.createRightPage();

    SW_QuestManager.on(
      'questStarted',
      (quest: SW_Quest) => {
        console.log('quest started', quest);
      },
      this
    );

    SW_QuestManager.on(
      'questUpdated',
      (quest: SW_Quest) => {
        console.log('quest updated', quest);
      },
      this
    );

    SW_QuestManager.on(
      'questCompleted',
      (quest: SW_Quest) => {
        console.log('quest completed', quest);
      },
      this
    );
  }

  protected createLeftPage(): void {
    const leftX = Math.floor(-this.width * 0.5 + 64);

    const settingsIcon = this.scene.add.image(
      leftX,
      Math.floor(-this.height * 0.5) + 64,
      'settingsIconTitle'
    );
    settingsIcon.setOrigin(0, 0);
    this.add(settingsIcon);

    const questsTitle = this.scene.add.text(
      Math.floor(settingsIcon.x + settingsIcon.width + 8),
      Math.floor(settingsIcon.y + settingsIcon.height * 0.5),
      'Quests',
      {
        fontSize: '20px',
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        fontStyle: 'bold',
        color: SW_CST.STYLE.COLOR.TEXT,
        align: 'left',
      }
    );
    questsTitle.setOrigin(0, 0.5);
    this.add(questsTitle);
  }

  protected createRightPage(): void {}
}
