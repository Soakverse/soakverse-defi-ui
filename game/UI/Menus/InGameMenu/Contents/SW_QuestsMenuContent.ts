import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_InGameMenuContent } from './SW_InGameMenuContent';
import { SW_InGameMenuContentConfig } from './SW_InGameMenuContent';
import { SW_CST } from '~/game/SW_CST';
import { SW_Quest, SW_QuestManager } from '~/game/quests/SW_QuestManager';
import SW_GridTable from '~/game/UI/Widgets/SW_GridTable';
import Cell from 'phaser3-rex-plugins/plugins/gameobjects/container/gridtable/table/Cell.js';
import { SW_InGameMenuTab } from './SW_InGameMenuTab';
import { Sizer } from 'phaser3-rex-plugins/templates/ui/ui-components';
import { Checkbox } from 'phaser3-rex-plugins/templates/ui/ui-components';

declare type SW_QuestTaskWidgetData = {
  key: string;
  name: string;
  // targetCount: number;
  // currentCount: number;
  description: string;
  isCompleted: boolean;
};

declare type SW_QuestWidgetData = {
  key: string;
  name: string;
  description: string;
  imagePreview: string;
  isCompleted: boolean;
  tasks: SW_QuestTaskWidgetData[];
  isOgQuest: boolean;
};

declare type SW_TaskWidgetConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  taskData: SW_QuestTaskWidgetData;
};

declare type SW_QuestWidgetConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  questData: SW_QuestWidgetData;
};

class SW_QuestWidget extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;

  protected background: Phaser.GameObjects.Rectangle;
  protected titleText: Phaser.GameObjects.Text;
  protected descriptionText: Phaser.GameObjects.Text;
  protected questImage: Phaser.GameObjects.Image;

  /** Whether the widget is still valid (ie not destroyed).
   * Used for the QuestTable in case the widget gets destroyed before the image is preloaded. */
  protected isValid: boolean = true;

  protected isSelected: boolean = false;
  protected isHovered: boolean = false;

  protected normalColor: number = 0xf2ede6;
  protected hoveredColor: number = 0xe5dbce;
  protected selectedColor: number = 0xd9cbb8;

  constructor(scene: SW_BaseScene, config: SW_QuestWidgetConfig) {
    super(scene, config.x, config.y);
    this.scene.add.existing(this);

    this.width = config.width;
    this.height = config.height;

    this.background = this.scene.add.rectangle(
      0,
      0,
      this.width,
      this.height,
      this.normalColor,
      1
    );
    this.background.setOrigin(0);
    this.add(this.background);

    const imagePreviewKey = config.questData.imagePreview;
    this.questImage = this.scene.add.image(
      0,
      this.height * 0.5,
      imagePreviewKey
    );
    this.questImage.setOrigin(0, 0.5);
    this.add(this.questImage);

    if (!this.scene.textures.exists(imagePreviewKey)) {
      this.scene.load.once(
        `${Phaser.Loader.Events.FILE_KEY_COMPLETE}image-${imagePreviewKey}`,
        () => {
          if (this.isValid) {
            this.questImage.setTexture(imagePreviewKey);
          }
        },
        this
      );

      this.scene.load.image(
        imagePreviewKey,
        `/game/assets/quests/${imagePreviewKey}.png`
      );

      this.scene.load.start();
    } else {
      this.questImage.setTexture(imagePreviewKey);
    }

    this.titleText = this.scene.add.text(
      this.questImage.x + this.questImage.width + 12,
      1,
      `${config.questData.name}${config.questData.isOgQuest ? ' [OG]' : ''}`,
      {
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        fontSize: '13px',
        color: SW_CST.STYLE.COLOR.TEXT,
        align: 'left',
        fontStyle: 'bold',
      }
    );
    this.titleText.setOrigin(0, 0);
    this.add(this.titleText);

    this.descriptionText = this.scene.add.text(
      this.titleText.x,
      this.titleText.y + this.titleText.height * 0.5 + 10,
      config.questData.description,
      {
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        fontSize: '11px',
        color: SW_CST.STYLE.COLOR.TEXT,
        align: 'left',
      }
    );
    this.descriptionText.setOrigin(0, 0);
    this.add(this.descriptionText);

    this.updateQuest(config.questData);
  }

  public destroy(fromScene?: boolean | undefined): void {
    this.isValid = false;
    super.destroy(fromScene);
  }

  public hover(): void {
    if (!this.isSelected) {
      this.background.setFillStyle(this.hoveredColor);
    }
    this.isHovered = true;
  }

  public unhover(): void {
    if (!this.isSelected) {
      this.background.setFillStyle(this.normalColor);
    }
    this.isHovered = false;
  }

  public select(): void {
    this.isSelected = true;
    this.background.setFillStyle(this.selectedColor);
  }

  public unselect(): void {
    this.isSelected = false;
    const newColor = this.isHovered ? this.hoveredColor : this.normalColor;
    this.background.setFillStyle(newColor);
  }

  public updateQuest(questData: SW_QuestWidgetData): void {
    this.descriptionText.setText(questData.description);
    this.setAlpha(questData.isCompleted ? 0.6 : 1);
  }
}

class SW_TaskWidget extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;

  protected descriptionText: Phaser.GameObjects.Text;
  protected completedImage: Phaser.GameObjects.Image;

  constructor(scene: SW_BaseScene, config: SW_TaskWidgetConfig) {
    super(scene, config.x, config.y);
    this.scene.add.existing(this);

    this.width = config.width;
    this.height = config.height;

    this.descriptionText = this.scene.add.text(
      0,
      this.height * 0.5,
      config.taskData.description,
      {
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        fontSize: '14px',
        color: SW_CST.STYLE.COLOR.TEXT,
        align: 'left',
      }
    );
    this.descriptionText.setWordWrapWidth(this.width);
    this.descriptionText.setOrigin(0, 0.5);
    this.add(this.descriptionText);

    this.completedImage = this.scene.add.image(
      this.width,
      this.height * 0.5,
      'questTaskCheckIcon'
    );
    this.completedImage.setOrigin(1, 0.5);
    this.add(this.completedImage);

    this.updateTask(config.taskData);
  }

  public updateTask(taskData: SW_QuestTaskWidgetData): void {
    this.descriptionText.setText(`◆ ${taskData.description}`);
    this.completedImage.setVisible(taskData.isCompleted);
  }
}

export class SW_QuestsMenuContent extends SW_InGameMenuContent {
  public declare scene: SW_BaseScene;

  protected questDatas: SW_QuestWidgetData[] = [];
  protected declare questsTitle: Phaser.GameObjects.Text;
  protected declare questsIcon: Phaser.GameObjects.Image;
  protected declare questsTable: SW_GridTable<SW_QuestWidgetData>;
  protected declare tasksTable: SW_GridTable<SW_QuestTaskWidgetData>;

  protected declare questTitle: Phaser.GameObjects.Text;
  protected declare questDescription: Phaser.GameObjects.Text;

  protected currentQuestWidget: SW_QuestWidget | null = null;

  protected declare tabs: SW_InGameMenuTab[];
  protected declare currentTab: SW_InGameMenuTab | undefined;
  protected declare currentTabIndex: number;
  protected declare sizerRightPageContent: Sizer;

  protected isShowingActiveQuest: boolean = true;
  protected isShowingOGsOnly: boolean = false;

  protected declare ogCheckbox: Checkbox;

  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    config?: SW_InGameMenuContentConfig
  ) {
    super(scene, x, y, config);
  }

  public init(): void {
    this.createTabs();
    this.add(this.scene.add.image(0, 0, 'monstersMenuBackground'));
    this.createMiddleDelimiter();
    this.createLeftPage();
    this.createRightPage();

    SW_QuestManager.on('questStarted', this.onQuestStarted, this);
    SW_QuestManager.on('questUpdated', this.onQuestUpdated, this);
    SW_QuestManager.on('questCompleted', this.onQuestCompleted, this);

    this.setShowOgQuestOnly(false);
    this.showActiveQuestList();
  }

  public setVisible(value: boolean): this {
    if (this.questsTable) {
      this.questsTable.setVisible(value);
      this.questsTable.setDepth(this.depth + this.parentContainer?.depth ?? 0);
    }

    if (this.tasksTable) {
      this.tasksTable.setVisible(value);
      this.tasksTable.setDepth(this.depth + this.parentContainer?.depth ?? 0);
    }

    if (value) {
      this.questsTable.refresh();
      this.showFirstQuest();
    }

    return super.setVisible(value);
  }

  public setDepth(value: number): this {
    if (this.questsTable) {
      this.questsTable.setDepth(this.depth + this.parentContainer?.depth ?? 0);
    }

    if (this.tasksTable) {
      this.tasksTable.setDepth(this.depth + this.parentContainer?.depth ?? 0);
    }

    return super.setDepth(value);
  }

  protected createTabs(): void {
    const tabsSizer = this.scene.rexUI.add.sizer({
      x: -this.width * 0.5 + 56,
      y: -this.height * 0.5 + 24,
      space: { item: 0 },
      orientation: 'left-to-right',
    });
    tabsSizer.setOrigin(0, 0.5);
    this.add(tabsSizer);

    this.tabs = [];

    const tabActiveQuest = new SW_InGameMenuTab(this.scene, 0, 0, 'Active');
    tabActiveQuest.onClicked(this.showActiveQuestList, this);
    tabsSizer.add(tabActiveQuest);
    this.tabs.push(tabActiveQuest);

    const tabCompletedQuest = new SW_InGameMenuTab(
      this.scene,
      0,
      0,
      'Completed'
    );
    tabCompletedQuest.onClicked(this.showCompletedQuestList, this);
    tabsSizer.add(tabCompletedQuest);
    this.tabs.push(tabCompletedQuest);

    for (let i = 0; i < this.tabs.length; ++i) {
      this.tabs[i].onClicked(() => {
        this.onTabClicked(this.tabs[i], i);
      }, this);
    }

    this.tabs[0].select();
    this.currentTab = this.tabs[0];
    this.currentTabIndex = 0;
    tabsSizer.layout();
  }

  protected onTabClicked(tab: SW_InGameMenuTab, tabIndex: number) {
    if (tab && tab != this.currentTab) {
      this.currentTab?.unselect();
      tab.select();
      this.currentTab = tab;
      this.currentTabIndex = tabIndex;
    }
  }

  protected createLeftPage(): void {
    const leftX = Math.floor(-this.width * 0.5 + 64);

    this.questsIcon = this.scene.add.image(
      leftX,
      Math.floor(-this.height * 0.5) + 64,
      'settingsIconTitle'
    );
    this.questsIcon.setOrigin(0, 0);
    this.add(this.questsIcon);

    this.questsTitle = this.scene.add.text(
      Math.floor(this.questsIcon.x + this.questsIcon.width + 8),
      Math.floor(this.questsIcon.y + this.questsIcon.height * 0.5),
      'Quests',
      {
        fontSize: '20px',
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        fontStyle: 'bold',
        color: SW_CST.STYLE.COLOR.TEXT,
        align: 'left',
      }
    );
    this.questsTitle.setOrigin(0, 0.5);
    this.add(this.questsTitle);

    this.createQuestTable();

    this.ogCheckbox = this.scene.add.rexCheckbox({
      x: -this.width * 0.5 + 68,
      y: this.height * 0.5 - 72,
      width: 20,
      height: 20,
      animationDuration: 50,
      boxLineWidth: 3,
      color: 0xdacbb8,
    });
    this.ogCheckbox.on('valuechange', (value: boolean) => {
      this.onOgCheckboxChange(value);
    });
    this.add(this.ogCheckbox);

    const ogCheckboxText = this.scene.add.text(
      this.ogCheckbox.x + this.ogCheckbox.width,
      this.ogCheckbox.y,
      'Only show OG quests',
      SW_CST.STYLE.TEXT.LABEL
    );
    ogCheckboxText.setOrigin(0, 0.5);
    this.add(ogCheckboxText);
  }

  protected addQuestWidget(quest: SW_Quest): void {
    const taskData = [] as SW_QuestTaskWidgetData[];
    for (const task of quest.getTasks()) {
      taskData.push({
        key: task.getKey(),
        name: task.getName(),
        description: task.getDescription(),
        isCompleted: task.isTaskCompleted(),
      });
    }

    const questData = {
      key: quest.getKey(),
      name: quest.getName(),
      description: quest.getDescription(),
      imagePreview: quest.getImagePreview(),
      isCompleted: quest.isQuestCompleted(),
      tasks: taskData,
      isOgQuest: quest.isOgQuest(),
    };
    this.questDatas.push(questData);
    this.questsTable.setItems(this.questDatas);
  }

  protected updateQuestWidget(quest: SW_Quest): void {
    for (const questData of this.questDatas) {
      if (questData.key == quest.getKey()) {
        questData.isCompleted = quest.isQuestCompleted();

        for (let i = 0; i < questData.tasks.length; ++i) {
          const task = quest.getTasks()[i];
          questData.tasks[i].isCompleted = task.isTaskCompleted();
          console.log('task', task);
        }
      }
    }
    this.questsTable.refresh();
    this.tasksTable.refresh();
  }

  protected createRightPage(): void {
    this.questTitle = this.scene.add.text(
      10,
      Math.floor(-this.height * 0.5) + 64,
      'Quest title',
      {
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        fontSize: '17px',
        color: SW_CST.STYLE.COLOR.TEXT,
        align: 'left',
        fontStyle: 'bold',
      }
    );
    this.questTitle.setOrigin(0);
    this.add(this.questTitle);

    this.sizerRightPageContent = this.scene.rexUI.add.sizer({
      x: this.questTitle.x - 6,
      y: this.questTitle.y + this.questTitle.height + 24,
      space: { item: 4 },
      orientation: 'top-to-bottom',
    });
    this.sizerRightPageContent.setOrigin(0);
    this.add(this.sizerRightPageContent);

    this.questDescription = this.scene.add.text(
      0,
      0,
      'Quest description',
      SW_CST.STYLE.TEXT.LABEL
    );
    this.questDescription.setWordWrapWidth(330);
    this.questDescription.setOrigin(0);
    this.sizerRightPageContent.add(this.questDescription);

    const questDelimiter = this.scene.add.line(
      0,
      0,
      -4,
      0,
      310,
      0,
      0xd9cbb8,
      1
    );
    questDelimiter.width = 330;
    questDelimiter.height = 20;
    questDelimiter.lineWidth = 2;
    this.sizerRightPageContent.add(questDelimiter);

    this.createTaskTable();
    this.sizerRightPageContent.add(this.tasksTable);

    this.sizerRightPageContent.layout();
  }

  private createQuestTable(): void {
    const worldTransformMatrix = this.getWorldTransformMatrix();
    const cellWidth = 300;
    const cellHeight = 44;
    const columns = 1;
    const tableWidth = cellWidth;
    const tableHeight = 216;

    this.questsTable = new SW_GridTable(this.scene, {
      x: worldTransformMatrix.tx + this.questsIcon.x - 20,
      y:
        worldTransformMatrix.ty +
        this.questsIcon.y +
        this.questsIcon.height +
        6,
      width: tableWidth,
      height: tableHeight,
      space: {
        left: 0,
        right: 8,
        top: 4,
        bottom: 4,
        table: { left: 4 },
      },
      table: {
        cellWidth: cellWidth,
        cellHeight: cellHeight,
        columns: columns,
        mask: {
          padding: 2,
        },
      },
      slider: {
        position: 'left',
        track: this.scene.rexUI.add.roundRectangle(0, 0, 8, 1, 0, 0xe4dcce, 1),
        thumb: this.scene.rexUI.add
          .roundRectangle(0, 0, 12, 20, 4, 0xdacbb8, 1)
          .setStrokeStyle(2, 0xffffff, 1),
        hideUnscrollableSlider: true,
      },
      scroller: { backDeceleration: false, threshold: 0 },
      createCellContainerCallback: (
        cell: Cell,
        cellContainer: SW_QuestWidget | null
      ) => {
        const questData = cell.item as SW_QuestWidgetData;

        if (cellContainer == null) {
          cellContainer = new SW_QuestWidget(this.scene, {
            x: 0,
            y: 0,
            width: cellWidth,
            height: cellHeight,
            questData: questData,
          });
          cellContainer.setDepth(this.depth + this.parentContainer?.depth ?? 0);
        } else {
          cellContainer.updateQuest(questData);
        }
        return cellContainer;
      },
      items: [],
    });
    this.questsTable.setOrigin(0, 0);
    this.questsTable.layout();
    this.questsTable.setVisible(this.visible);

    this.questsTable.on(
      'cell.over',
      (cellContainer: SW_QuestWidget, cellIndex: number) => {
        cellContainer.hover();
      },
      this
    );

    this.questsTable.on(
      'cell.out',
      (cellContainer: SW_QuestWidget, cellIndex: number) => {
        cellContainer.unhover();
      },
      this
    );

    this.questsTable.on(
      'cell.click',
      (cellContainer: SW_QuestWidget, cellIndex: number) => {
        this.showQuest(cellIndex);
      }
    );
  }

  protected createTaskTable(): void {
    const cellWidth = 300;
    const cellHeight = 28;
    const columns = 1;
    const tableWidth = cellWidth;
    const tableHeight = 240;

    this.tasksTable = new SW_GridTable(this.scene, {
      x: 0,
      y: 0,
      width: tableWidth,
      height: tableHeight,
      space: {
        left: -16,
        right: -4,
        top: 4,
        bottom: 0,
        table: { left: 0 },
      },
      table: {
        cellWidth: cellWidth,
        cellHeight: cellHeight,
        columns: columns,
        mask: {
          padding: 2,
        },
      },
      slider: {
        position: 'left',
        track: this.scene.rexUI.add.roundRectangle(0, 0, 8, 1, 0, 0xe4dcce, 1),
        thumb: this.scene.rexUI.add
          .roundRectangle(0, 0, 12, 20, 4, 0xdacbb8, 1)
          .setStrokeStyle(2, 0xffffff, 1),
        hideUnscrollableSlider: true,
      },
      scroller: { backDeceleration: false, threshold: 0 },
      createCellContainerCallback: (
        cell: Cell,
        cellContainer: SW_TaskWidget | null
      ) => {
        const taskData = cell.item as SW_QuestTaskWidgetData;

        if (cellContainer == null) {
          cellContainer = new SW_TaskWidget(this.scene, {
            x: 0,
            y: 0,
            width: cellWidth,
            height: cellHeight,
            taskData: taskData,
          });
          cellContainer.setDepth(this.depth + this.parentContainer?.depth ?? 0);
        } else {
          cellContainer.updateTask(taskData);
        }
        return cellContainer;
      },
      items: [],
    });
    this.tasksTable.setOrigin(0, 0);
    this.tasksTable.layout();
    this.tasksTable.setVisible(this.visible);
  }

  protected showFirstQuest(): void {
    this.showQuest(0);
  }

  protected showQuest(questIndex: number): void {
    if (this.questsTable) {
      this.currentQuestWidget?.unselect();

      if (questIndex >= 0 && questIndex < this.questsTable.items.length) {
        const questData = this.questsTable.items[questIndex];
        this.questTitle.setText(
          `${questData.name}${questData.isOgQuest ? ' [OG]' : ''}`
        );
        this.questDescription.setText(questData.description);
        this.tasksTable?.setItems(questData.tasks);

        this.currentQuestWidget = this.questsTable.getCellContainer(
          questIndex
        ) as SW_QuestWidget | null;
        this.currentQuestWidget?.select();

        this.sizerRightPageContent.layout();
        this.sizerRightPageContent.setVisible(true);
      } else {
        this.questTitle.setText('');
        this.questDescription.setText('');
        this.tasksTable?.setItems([]);
      }
    }
  }

  protected showActiveQuestList(): void {
    const activeQuestList = [] as SW_QuestWidgetData[];
    for (const questData of this.questDatas) {
      if (!questData.isCompleted) {
        if (!this.isShowingOGsOnly || questData.isOgQuest) {
          activeQuestList.push(questData);
        }
      }
    }
    this.questsTable.setItems(activeQuestList);
    this.questsTable.refresh();
    this.showFirstQuest();
    this.isShowingActiveQuest = true;
  }

  protected showCompletedQuestList(): void {
    const completedQuestList = [] as SW_QuestWidgetData[];
    for (const questData of this.questDatas) {
      if (questData.isCompleted) {
        if (!this.isShowingOGsOnly || questData.isOgQuest) {
          completedQuestList.push(questData);
        }
      }
    }
    this.questsTable.setItems(completedQuestList);
    this.questsTable.refresh();
    this.showFirstQuest();
    this.isShowingActiveQuest = false;
  }

  protected onQuestStarted(quest: SW_Quest) {
    console.log('quest started', quest.getKey());
    this.addQuestWidget(quest);
  }

  protected onQuestUpdated(quest: SW_Quest) {
    console.log('quest updated', quest.getKey());
    this.updateQuestWidget(quest);
  }

  protected onQuestCompleted(quest: SW_Quest) {
    console.log('quest completed', quest.getKey());
    this.updateQuestWidget(quest);
    this.refreshQuestList();
  }

  protected refreshQuestList(): void {
    if (this.isShowingActiveQuest) {
      this.showActiveQuestList();
    } else {
      this.showCompletedQuestList();
    }

    this.showFirstQuest();
  }

  protected setShowOgQuestOnly(value: boolean): void {
    this.isShowingOGsOnly = value;

    if (value != this.ogCheckbox.value) {
      this.ogCheckbox.setChecked(value);
    }

    this.refreshQuestList();
  }

  protected onOgCheckboxChange(value: boolean): void {
    this.setShowOgQuestOnly(value);
  }
}
