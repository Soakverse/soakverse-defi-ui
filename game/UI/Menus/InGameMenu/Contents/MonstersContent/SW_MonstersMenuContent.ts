import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_InGameMenuContent } from '../SW_InGameMenuContent';
import { SW_InGameMenuContentConfig } from '../SW_InGameMenuContent';
import { SW_CST } from '~/game/SW_CST';
import { SW_MonsterSpecialEffectWidget } from './SW_MonsterSpecialEffectWidget';
import { SW_MonsterStatWidget } from './SW_MonsterStatWidget';
import { SW_MonsterCard } from './MonstersCard/SW_MonsterCard';
import { SW_InGameMenuTab } from '../SW_InGameMenuTab';

declare type SW_MonsterStatData = {
  name: string;
  value: integer;
};

declare type SW_MonsterData = {
  name: string;
  level: integer;
  stats: SW_MonsterStatData[];
  effects: string[];
};

export class SW_MonstersMenuContent extends SW_InGameMenuContent {
  public declare scene: SW_BaseScene;

  protected declare monsterCard: SW_MonsterCard;
  protected declare monsterNameTitle: Phaser.GameObjects.Text;
  protected declare monsterSpecialEffectWidgets: SW_MonsterSpecialEffectWidget[];
  protected declare monsterStatWidgets: Map<string, SW_MonsterStatWidget>;
  protected declare levelText: Phaser.GameObjects.Text;

  protected declare tabs: SW_InGameMenuTab[];
  protected declare currentTab: SW_InGameMenuTab | undefined;
  protected declare currentTabIndex: number;

  protected declare monstersData: SW_MonsterData[];

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
    this.add(this.scene.add.image(0, 0, 'monstersMenuBackground'));
    this.createMiddleDelimiter();
    this.createMonsterHeaderTitle();
    this.createMonsterProfilImage();
    this.createMonsterSpecialEffectWidgets();
    this.createMonsterStats();

    // TODO: Get monsters data from the server once we are ready
    const monstersData = this.TEMP_generateMonsterData(
      Phaser.Math.Between(2, 6)
    );

    this.updateMonsters(monstersData);
  }

  public setVisible(value: boolean): this {
    if (this.monsterCard) {
      this.monsterCard.setVisible(value);
    }
    return super.setVisible(value);
  }

  private TEMP_generateMonsterData(monsterCount: number): SW_MonsterData[] {
    const randomStatsFn = () => {
      return [
        { name: 'Magic', value: Phaser.Math.Between(1, 100) },
        { name: 'Attack', value: Phaser.Math.Between(1, 100) },
        { name: 'Defense', value: Phaser.Math.Between(1, 100) },
        { name: 'Speed', value: Phaser.Math.Between(1, 100) },
        { name: 'Accuracy', value: Phaser.Math.Between(1, 100) },
        { name: 'Luck', value: Phaser.Math.Between(1, 100) },
      ];
    };

    const monstersData: SW_MonsterData[] = [];

    for (let i = 0; i < monsterCount; ++i) {
      const effectCount = Phaser.Math.Between(1, 2);
      let effects = [];

      for (let i = 0; i < effectCount; ++i) {
        effects.push(`Monster Effect ${Phaser.Math.Between(1, 9)}`);
      }

      monstersData.push({
        stats: randomStatsFn(),
        name: `Monster ${Phaser.Math.Between(1, 100)}`,
        level: Phaser.Math.Between(1, 100),
        effects: effects,
      });
    }
    return monstersData;
  }

  protected createMonsterTabs(): void {
    const monsterTabsSizer = this.scene.rexUI.add.sizer({
      x: 0,
      y: -this.height * 0.5 + 24,
      space: { item: 0 },
      orientation: 'left-to-right',
    });
    this.add(monsterTabsSizer);

    this.tabs = [];
    const maxMonsterCount = 6;
    for (let i = 0; i < maxMonsterCount; ++i) {
      const tab = new SW_InGameMenuTab(this.scene, 0, 0);
      tab.onClicked(() => {
        this.onMonsterTabClicked(tab, i);
      }, this);
      monsterTabsSizer.add(tab);
      this.tabs.push(tab);
    }

    this.tabs[0].select();
    this.currentTab = this.tabs[0];
    this.currentTabIndex = 0;
    monsterTabsSizer.layout();
  }

  protected createMonsterHeaderTitle(): void {
    this.monsterNameTitle = this.scene.add.text(
      28,
      -this.height * 0.5 + 72,
      'Monster',
      {
        fontSize: '24px',
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        color: SW_CST.STYLE.COLOR.TEXT,
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

  protected updateMonsters(monstersData: SW_MonsterData[]): void {
    this.monstersData = monstersData;

    const visibleTabCount = Math.min(
      this.tabs.length,
      this.monstersData.length
    );

    for (let i = 0; i < visibleTabCount; ++i) {
      const tab = this.tabs[i];
      tab.setText(monstersData[i].name);
      tab.setVisible(true);
    }

    for (let i = visibleTabCount; i < this.tabs.length; ++i) {
      this.tabs[i].setVisible(false);
    }

    if (this.currentTabIndex < visibleTabCount) {
      this.showMonsterAtIndex(this.currentTabIndex);
    } else {
      this.onMonsterTabClicked(this.tabs[0], 0);
    }
  }

  protected showMonsterAtIndex(monsterIndex: number): void {
    const monsterData = this.monstersData[monsterIndex];

    this.monsterNameTitle.setText(monsterData.name);
    this.monsterCard.updateFrontCard(
      `monsterProfil_prototype${(monsterIndex % 2) + 1}`
    );
    this.showMonsterStats(monsterData.stats);
    this.showLevel(monsterData.level);
    this.showEffects(monsterData.effects);
  }

  protected showMonsterStats(
    statsData: { name: string; value: number }[]
  ): void {
    for (const statData of statsData) {
      const statWidget = this.monsterStatWidgets.get(statData.name);
      statWidget?.updateStatValue(statData.value);
    }
  }

  protected showLevel(level: number): void {
    this.levelText.setText(`Level ${level}`);
  }

  protected showEffects(effects: string[]): void {
    const visibleEffectCount = Math.min(
      this.monsterSpecialEffectWidgets.length,
      effects.length
    );

    for (let i = 0; i < visibleEffectCount; ++i) {
      const widget = this.monsterSpecialEffectWidgets[i];
      widget.setText(effects[i]);
      widget.setVisible(true);
    }

    for (
      let i = visibleEffectCount;
      i < this.monsterSpecialEffectWidgets.length;
      ++i
    ) {
      this.monsterSpecialEffectWidgets[i].setVisible(false);
    }
  }

  protected onMonsterTabClicked(tab: SW_InGameMenuTab, tabIndex: number): void {
    if (tab && tab != this.currentTab) {
      this.currentTab?.unselect();
      tab.select();
      this.currentTab = tab;
      this.currentTabIndex = tabIndex;

      this.showMonsterAtIndex(tabIndex);
    }
  }
}
