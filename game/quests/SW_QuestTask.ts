import { SW_GameEventManager, SW_GameplayEvent } from '../SW_GameEventManager';

export declare type SW_EventData = {
  name: string;
  count: number;
  exactMatch?: boolean;
};

export declare type SW_QuestTaskConfig = {
  key: string;
  name: string;
  description: string;
  eventDatas: SW_EventData[];
};

export class SW_QuestTask extends Phaser.Events.EventEmitter {
  protected key: string;
  protected name: string;
  protected description: string;
  protected isCompleted: boolean = false;

  protected eventDatas: SW_EventData[] = [];

  constructor(config: SW_QuestTaskConfig) {
    super();

    this.key = config.key;
    this.name = config.name;
    this.description = config.description;
    this.eventDatas = config.eventDatas;
  }

  public startTask(): void {
    this.isCompleted = false;

    SW_GameEventManager.onGameplayEventTriggered(
      this.handleGameplayEvent,
      this
    );
  }

  protected handleGameplayEvent(event: SW_GameplayEvent): void {
    let wasUpdated = false;
    for (const eventData of this.eventDatas) {
      if (this.eventNamesMatches(eventData, event.key)) {
        --eventData.count;
        wasUpdated = true;
      }
    }

    if (wasUpdated) {
      this.emit('updated', this);
    }

    this.checkTaskState();
  }

  protected checkTaskState(): void {
    for (const eventData of this.eventDatas) {
      // Still at least one event to get so we can stop checking
      if (eventData.count > 0) {
        return;
      }
    }

    this.completeTask();
  }

  protected eventNamesMatches(
    eventData: SW_EventData,
    eventName: string
  ): boolean {
    if (eventData.exactMatch) {
      eventData.name == eventName;
    }
    return eventData.name.includes(eventName);
  }

  public isTaskCompleted(): boolean {
    return this.isCompleted;
  }

  public completeTask(): void {
    if (!this.isTaskCompleted()) {
      this.isCompleted = true;
      this.emit('completed', this);
    }
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
}
