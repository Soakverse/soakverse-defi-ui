import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_InGameMenuContent } from '../SW_InGameMenuContent';
import { SW_InGameMenuContentConfig } from '../SW_InGameMenuContent';
import { SW_CST } from '~/game/SW_CST';
import { SW_MonsterSpecialEffectWidget } from './SW_MonsterSpecialEffectWidget';
import { SW_MonsterStatWidget } from './SW_MonsterStatWidget';
import { SW_MonsterCard } from './MonstersCard/SW_MonsterCard';

export class SW_MonstersMenuContent extends SW_InGameMenuContent {
  public declare scene: SW_BaseScene;

  protected declare monsterCard: SW_MonsterCard;
  protected declare monsterNameTitle: Phaser.GameObjects.Text;
  protected declare monsterSpecialEffectWidgets: SW_MonsterSpecialEffectWidget[];
  protected declare monsterStatWidgets: Map<string, SW_MonsterStatWidget>;
  protected declare levelText: Phaser.GameObjects.Text;

  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    config?: SW_InGameMenuContentConfig
  ) {
    super(scene, x, y, config);

    if (!SW_CST.DEBUG.UI) {
      const comingSoonText = this.scene.add.text(0, 0, 'COMING SOON!', {
        fontSize: '44px',
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        color: SW_CST.STYLE.COLOR.BLUE,
      });
      comingSoonText.setOrigin(0.5);
      this.add(comingSoonText);
      return;
    }

    this.createMonsterTabs();
    this.createMonsterHeaderTitle();
    this.createMonsterProfilImage();
    this.createMonsterSpecialEffectWidgets();
    this.createMonsterStats();

    const randomStats = [
      { name: 'Magic', value: Phaser.Math.Between(1, 100) },
      { name: 'Attack', value: Phaser.Math.Between(1, 100) },
      { name: 'Defense', value: Phaser.Math.Between(1, 100) },
      { name: 'Speed', value: Phaser.Math.Between(1, 100) },
      { name: 'Accuracy', value: Phaser.Math.Between(1, 100) },
      { name: 'Luck', value: Phaser.Math.Between(1, 100) },
    ];
    this.updateMonsterStats(randomStats);
    this.updateLevel(Phaser.Math.Between(1, 100));
  }

  public setVisible(value: boolean): this {
    if (this.monsterCard) {
      this.monsterCard.setVisible(value);
    }
    return super.setVisible(value);
  }

  protected createMonsterTabs(): void {}

  protected createMonsterHeaderTitle(): void {
    this.monsterNameTitle = this.scene.add.text(
      28,
      -this.height * 0.5 + 72,
      'Monster',
      {
        fontSize: '24px',
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        color: '#4D2B1D',
        fontStyle: 'bold',
      }
    );
    this.monsterNameTitle.setOrigin(0, 0);
    this.add(this.monsterNameTitle);

    this.levelText = this.scene.add.text(
      this.width * 0.5 - 64,
      this.monsterNameTitle.y + this.monsterNameTitle.height,
      'Level 1',
      {
        fontSize: '12px',
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        color: '#684C3C',
      }
    );
    this.levelText.setOrigin(1, 1);
    this.add(this.levelText);
  }

  protected createMonsterProfilImage(): void {
    this.monsterCard = new SW_MonsterCard(
      this.scene,
      this.scene.game.canvas.width * 0.5 - this.width * 0.25 + 24,
      this.scene.game.canvas.height * 0.57 - 4,
      '',
      '',
      300
    );

    this.monsterCard.updateFrontCard(
      `monsterProfil_prototype${Phaser.Math.Between(1, 2)}`
    );

    this.monsterCard.setDepth(1);

    this.monsterCard.onClick(() => {
      this.monsterCard.flipCard();
    });
  }

  protected createMonsterSpecialEffectWidgets(): void {
    const maxEffectCount = 2;
    const effectWidgetSpacing = 8;

    const effectWidgetsSizer = this.scene.rexUI.add.sizer(
      this.monsterNameTitle.x,
      this.monsterNameTitle.y + this.monsterNameTitle.height + 8,
      { height: 24, space: { item: effectWidgetSpacing } }
    );
    effectWidgetsSizer.setOrigin(0, 0);

    this.monsterSpecialEffectWidgets = [];
    for (let i = 0; i < maxEffectCount; ++i) {
      const effectWidget = new SW_MonsterSpecialEffectWidget(this.scene, {
        width: 110,
      });
      effectWidget.setText('Monster Effect ' + (i + 1).toString());
      effectWidgetsSizer.add(effectWidget);
      this.add(effectWidget);
      this.monsterSpecialEffectWidgets.push(effectWidget);
    }
    effectWidgetsSizer.layout();
  }

  protected createMonsterStats(): void {
    this.monsterStatWidgets = new Map<string, SW_MonsterStatWidget>();

    const widgetWidth = this.levelText.x - this.monsterNameTitle.x;
    const widgetHeight = 24;
    const widgetSpacing = 8;

    const statsData = [
      { name: 'Magic', displayName: 'Magic' },
      { name: 'Attack', displayName: 'Attack Skill' },
      { name: 'Defense', displayName: 'Defense Skill' },
      { name: 'Speed', displayName: 'Speed' },
      { name: 'Accuracy', displayName: 'Accuracy' },
      { name: 'Luck', displayName: 'Luck' },
    ];

    const startPositionY =
      this.monsterSpecialEffectWidgets[0].y +
      this.monsterSpecialEffectWidgets[0].height +
      12;

    for (let i = 0; i < statsData.length; ++i) {
      const statData = statsData[i];

      const statWidgetX = this.monsterNameTitle.x + widgetWidth * 0.5;
      const statWidgetY = startPositionY + i * (widgetHeight + widgetSpacing);

      const statWidget = new SW_MonsterStatWidget(
        this.scene,
        statWidgetX,
        statWidgetY,
        widgetWidth,
        widgetHeight,
        statData.name,
        statData.displayName
      );
      this.add(statWidget);
      this.monsterStatWidgets.set(statData.name, statWidget);

      if (i < statsData.length - 1) {
        const line = this.scene.add.line(
          statWidgetX,
          statWidgetY + widgetHeight * 0.5 + widgetSpacing * 0.5,
          0,
          0,
          widgetWidth,
          0
        );
        line.setStrokeStyle(10, 0xdaccba, 1);
        this.add(line);
      }
    }
  }

  protected updateMonsterStats(
    statsData: { name: string; value: number }[]
  ): void {
    for (const statData of statsData) {
      const statWidget = this.monsterStatWidgets.get(statData.name);
      statWidget?.updateStatValue(statData.value);
    }
  }

  protected updateLevel(level: number): void {
    this.levelText.setText(`Level ${level}`);
  }
}
