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
  targetCount: number;
  currentCount: number;
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
      `${config.questData.name}`,
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

    if (config.questData.isOgQuest) {
      const questOgIndicator = this.scene.add.text(
        this.titleText.x + this.titleText.width + 4,
        this.titleText.y,
        'OG',
        {
          fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
          fontSize: '10px',
          color: '#95262B',
          align: 'left',
          fontStyle: 'bold',
        }
      );
      questOgIndicator.setOrigin(0, 0);
      this.add(questOgIndicator);
    }

    this.descriptionText = this.scene.add.text(
      this.titleText.x,
      this.titleText.y + this.titleText.height * 0.5 + 10,
      config.questData.description,
      {
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        fontSize: '11px',
        color: SW_CST.STYLE.COLOR.TEXT,
        align: 'left',
        maxLines: 1,
        wordWrap: { useAdvancedWrap: true },
      }
    );
    this.descriptionText.setWordWrapWidth(
      this.width - this.descriptionText.x - 28
    );
    this.descriptionText.setOrigin(0, 0);
    this.add(this.descriptionText);

    const shouldElideDescription = true; // For now let's say it's always true

    if (shouldElideDescription) {
      const dotText = this.scene.add.text(
        this.descriptionText.x + this.descriptionText.displayWidth - 2,
        this.descriptionText.y,
        '...',
        this.descriptionText.style
      );
      dotText.setOrigin(0, 0);
      this.add(dotText);
    }

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
    this.setAlpha(questData.isCompleted ? 0.6 : 1);
  }
}

class SW_TaskWidget extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;

  protected descriptionText: Phaser.GameObjects.Text;
  protected completedImage: Phaser.GameObjects.Image;
  protected counterText: Phaser.GameObjects.Text;

  constructor(scene: SW_BaseScene, config: SW_TaskWidgetConfig) {
    super(scene, config.x, config.y);
    this.scene.add.existing(this);

    this.width = config.width;
    this.height = config.height;

    this.descriptionText = this.scene.add.text(0, this.height * 0.5, '', {
      fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
      fontSize: '14px',
      color: SW_CST.STYLE.COLOR.TEXT,
      align: 'left',
    });
    this.descriptionText.setWordWrapWidth(this.width - 44);
    this.descriptionText.setOrigin(0, 0.5);
    this.add(this.descriptionText);

    this.counterText = this.scene.add.text(this.width, this.height * 0.5, '', {
      fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
      fontSize: '12px',
      color: SW_CST.STYLE.COLOR.TEXT,
      align: 'right',
      fontStyle: 'bold',
    });
    this.counterText.setOrigin(1, 0.5);
    this.add(this.counterText);

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
    this.descriptionText.setText(`${taskData.description}`);
    this.counterText.setText(
      `${taskData.currentCount} / ${taskData.targetCount}`
    );
    this.counterText.setVisible(
      taskData.targetCount > 1 && !taskData.isCompleted
    );
    this.completedImage.setVisible(taskData.isCompleted);
  }
}

export class SW_QuestsMenuContent extends SW_InGameMenuContent {
  public declare scene: SW_BaseScene;

  protected questDatas: SW_QuestWidgetData[] = [];
  protected declare questsTable: SW_GridTable<SW_QuestWidgetData>;
  protected declare tasksTable: SW_GridTable<SW_QuestTaskWidgetData>;

  protected declare questTitle: Phaser.GameObjects.Text;
  protected declare questOgIndicator: Phaser.GameObjects.Text;
  protected declare questDelimiter: Phaser.GameObjects.Line;
  protected declare questDescription: Phaser.GameObjects.Text;
  protected declare objectivesTitle: Phaser.GameObjects.Text;
  protected declare objectivesCounterText: Phaser.GameObjects.Text;

  protected currentQuestWidget: SW_QuestWidget | null = null;

  protected declare tabs: SW_InGameMenuTab[];
  protected declare currentTab: SW_InGameMenuTab | undefined;
  protected declare currentTabIndex: number;
  protected declare rightContainer: Phaser.GameObjects.Container;

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
      this.tasksTable.setDepth(this.depth + this.parentContainer?.depth ?? 0);

      if (!value) {
        this.tasksTable.setVisible(false);
      }
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
    ogCheckboxText.setInteractive();
    ogCheckboxText.on(
      Phaser.Input.Events.POINTER_DOWN,
      () => {
        this.ogCheckbox.setChecked(!this.ogCheckbox.checked);
      },
      this
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
        targetCount: task.getTargetCount(),
        currentCount: task.getCurrentCount(),
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
          questData.tasks[i].targetCount = task.getTargetCount();
          questData.tasks[i].currentCount = task.getCurrentCount();
        }
      }
    }
    this.questsTable.refresh();
    this.tasksTable.refresh();
  }

  protected createRightPage(): void {
    this.rightContainer = this.scene.add.container(0, 0);
    this.add(this.rightContainer);

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
    this.rightContainer.add(this.questTitle);

    this.questOgIndicator = this.scene.add.text(
      this.questTitle.x + this.questTitle.width,
      this.questTitle.y - 4,
      'OG',
      {
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        fontSize: '11px',
        color: '#95262B',
        align: 'left',
        fontStyle: 'bold',
      }
    );
    this.questOgIndicator.setOrigin(0, 0);
    this.rightContainer.add(this.questOgIndicator);

    this.questDelimiter = this.scene.add.line(0, 0, 0, 0, 0, 0, 0xd9cbb8, 1);
    this.questDelimiter.width = 330;
    this.questDelimiter.height = 20;
    this.questDelimiter.lineWidth = 2;
    this.rightContainer.add(this.questDelimiter);

    this.questDescription = this.scene.add.text(
      this.questTitle.x,
      this.questTitle.y + this.questTitle.height + 12,
      'Quest description',
      {
        fontSize: '13px',
        fontFamily: 'Poppins',
        color: SW_CST.STYLE.COLOR.TEXT,
        align: 'left',
      }
    );
    this.questDescription.setWordWrapWidth(320);
    this.questDescription.setOrigin(0);
    this.rightContainer.add(this.questDescription);

    this.objectivesTitle = this.scene.add.text(
      this.questTitle.x,
      -40,
      'Objectives',
      {
        fontSize: '13px',
        fontFamily: 'Poppins',
        color: SW_CST.STYLE.COLOR.TEXT,
        align: 'left',
        fontStyle: 'bold',
      }
    );
    this.rightContainer.add(this.objectivesTitle);

    this.objectivesCounterText = this.scene.add.text(
      this.objectivesTitle.x + this.objectivesTitle.width + 4,
      this.objectivesTitle.y + this.objectivesTitle.height * 0.5,
      '(0/0)',
      {
        fontSize: '13px',
        fontFamily: 'Poppins',
        color: SW_CST.STYLE.COLOR.TEXT,
        align: 'left',
      }
    );
    this.objectivesCounterText.setOrigin(0, 0.5);
    this.rightContainer.add(this.objectivesCounterText);

    this.createTaskTable();
  }

  private createQuestTable(): void {
    const worldTransformMatrix = this.getWorldTransformMatrix();
    const cellWidth = 300;
    const cellHeight = 44;
    const columns = 1;
    const tableWidth = cellWidth;
    const tableHeight = 216;

    this.questsTable = new SW_GridTable(this.scene, {
      x: Math.floor(worldTransformMatrix.tx + -this.width * 0.5 + 44),
      y: Math.floor(worldTransformMatrix.ty - this.height * 0.5 + 56),
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
    const scrollerBarWidth = 12;

    const worldTransformMatrix = this.getWorldTransformMatrix();
    const tableX =
      worldTransformMatrix.tx + this.questTitle.x - scrollerBarWidth * 0.5;
    const tableY =
      worldTransformMatrix.ty +
      this.objectivesTitle.y +
      this.objectivesTitle.height +
      0;

    const cellWidth = 300;
    const cellHeight = 28;
    const columns = 1;
    const tableWidth = cellWidth;
    const tableHeight = 240;

    this.tasksTable = new SW_GridTable(this.scene, {
      x: tableX,
      y: tableY,
      width: tableWidth + scrollerBarWidth,
      height: tableHeight,
      space: {
        left: 0,
        right: 0,
        top: 0,
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
          .roundRectangle(0, 0, scrollerBarWidth, 20, 4, 0xdacbb8, 1)
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
        this.questTitle.setText(`${questData.name}`);
        this.questOgIndicator.setVisible(questData.isOgQuest);
        this.questOgIndicator.setX(
          this.questTitle.x + this.questTitle.width + 4
        );

        const delimiterStartX = this.questOgIndicator.visible
          ? this.questOgIndicator.x + this.questOgIndicator.width
          : this.questTitle.x + this.questTitle.width;

        this.questDelimiter.setTo(
          delimiterStartX + 8,
          this.questTitle.y + this.questTitle.height * 0.5,
          330,
          this.questTitle.y + this.questTitle.height * 0.5
        );
        this.questDescription.setText(questData.description);

        const completedTaskCount = questData.tasks.filter(
          (taskData: SW_QuestTaskWidgetData) => {
            return taskData.isCompleted;
          }
        ).length;
        this.objectivesCounterText.setText(
          `(${completedTaskCount}/${questData.tasks.length})`
        );
        this.tasksTable?.setItems(questData.tasks);

        this.currentQuestWidget = this.questsTable.getCellContainer(
          questIndex
        ) as SW_QuestWidget | null;
        this.currentQuestWidget?.select();

        this.rightContainer.setVisible(true);
        this.tasksTable.setVisible(this.visible);
      } else {
        this.questTitle.setText('');
        this.questDescription.setText('');
        this.tasksTable?.setItems([]);

        this.rightContainer.setVisible(false);
        this.tasksTable.setVisible(false);
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
    this.addQuestWidget(quest);
  }

  protected onQuestUpdated(quest: SW_Quest) {
    this.updateQuestWidget(quest);
  }

  protected onQuestCompleted(quest: SW_Quest) {
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
