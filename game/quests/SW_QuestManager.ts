import SW_BaseScene from '../scenes/SW_BaseScene';
import { SW_QuestTask, SW_QuestTaskConfig } from './SW_QuestTask';

export declare type SW_QuestConfig = {
  key: string;
  name: string;
  imagePreview: string;
  description: string;
  tasks: SW_QuestTaskConfig[];
  isOgQuest?: boolean;
};

export class SW_Quest extends Phaser.Events.EventEmitter {
  protected key: string;
  protected name: string;
  protected description: string;
  protected imagePreview: string;
  protected isCompleted: boolean = false;
  protected tasks: SW_QuestTask[];
  protected _isOgQuest: boolean;

  constructor(config: SW_QuestConfig) {
    super();

    this.key = config.key;
    this.name = config.name;
    this.description = config.description;
    this.imagePreview = config.imagePreview;
    this._isOgQuest = !!config.isOgQuest;

    this.tasks = [];
    for (const taskConfig of config.tasks) {
      this.tasks.push(new SW_QuestTask(taskConfig));
    }
  }

  public startQuest(): void {
    this.isCompleted = false;

    for (const task of this.tasks) {
      task.startTask();
      task.once('completed', this.onTaskCompleted, this);
      task.on('updated', this.onTaskUpdated, this);
    }
  }

  public completeQuest(): void {
    if (!this.isCompleted) {
      for (const task of this.tasks) {
        task.off('completed', this.onTaskCompleted, this);
        task.off('updated', this.onTaskUpdated, this);
      }
      this.isCompleted = true;
      this.emit('completed', this);
    }
  }

  public isQuestCompleted(): boolean {
    return this.isCompleted;
  }

  protected onTaskUpdated(task: SW_QuestTask): void {
    this.emit('updated', this);
  }

  protected onTaskCompleted(task: SW_QuestTask): void {
    task.off('completed', this.onTaskCompleted, this);
    task.off('updated', this.onTaskUpdated, this);

    if (this.areAllTasksCompleted()) {
      this.completeQuest();
    } else {
      this.emit('updated', this);
    }
  }

  public areAllTasksCompleted(): boolean {
    for (const task of this.tasks) {
      if (!task.isTaskCompleted()) {
        return false;
      }
    }
    return true;
  }

  public getKey(): string {
    return this.key;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getImagePreview(): string {
    return this.imagePreview;
  }

  public isOgQuest(): boolean {
    return this._isOgQuest;
  }

  public getTasks(): SW_QuestTask[] {
    return this.tasks;
  }
}

export class SW_QuestManager extends Phaser.Events.EventEmitter {
  protected static _internalInstance: SW_QuestManager | undefined;

  protected activeQuests: SW_Quest[] = [];
  protected completedQuests: SW_Quest[] = [];
  protected questConfigs: SW_QuestConfig[] = [];

  private constructor() {
    super();
  }

  public static init(scene: SW_BaseScene): void {
    if (this._internalInstance) {
      this._internalInstance.clear();
      this._internalInstance = undefined;
    }

    this._internalInstance = new SW_QuestManager();
    this._internalInstance.questConfigs = scene.cache.json.get('quests');
  }

  private clear(): void {
    this.removeAllListeners();
    this.activeQuests = [];
    this.completedQuests = [];
    this.questConfigs = [];
  }

  public static startQuest(questKey: string): void {
    const questConfigs = this._internalInstance?.questConfigs ?? [];
    for (const questConfig of questConfigs) {
      if (questKey == questConfig.key) {
        this.addQuest(new SW_Quest(questConfig));
      }
    }
  }

  private static addQuest(quest: SW_Quest): void {
    if (this._internalInstance) {
      quest.on('updated', this.onQuestUpdated, this);
      quest.once('completed', this.onQuestCompleted, this);
      quest.startQuest();

      Phaser.Utils.Array.Add(this._internalInstance.activeQuests, quest);
      this._internalInstance.emit('questStarted', quest);
    }
  }

  private static completeQuest(questKey: string): void {
    if (this._internalInstance) {
      for (const quest of this._internalInstance.activeQuests) {
        if (quest.getKey() == questKey) {
          quest.completeQuest();
        }
      }
    }
  }

  private static onQuestUpdated(quest: SW_Quest): void {
    this._internalInstance?.emit('questUpdated', quest);
  }

  private static onQuestCompleted(quest: SW_Quest): void {
    quest.off('completed', this.onQuestCompleted, this);
    quest.off('updated', this.onQuestUpdated, this);

    if (this._internalInstance) {
      Phaser.Utils.Array.Remove(this._internalInstance.activeQuests, quest);
      Phaser.Utils.Array.Add(this._internalInstance.completedQuests, quest);
      this._internalInstance.emit('questCompleted', quest);
    }
  }

  public static on(event: string | symbol, fn: Function, context?: any): void {
    this._internalInstance?.on(event, fn, context);
  }
}
