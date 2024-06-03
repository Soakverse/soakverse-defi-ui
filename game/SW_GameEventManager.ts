export declare type SW_GameplayEventCallback = (
  event: SW_GameplayEvent
) => void;

export declare type SW_GameplayEvent = {
  key: string;
  source?: any;
};

export class SW_GameEventManager extends Phaser.Events.EventEmitter {
  protected static _internalInstance: SW_GameEventManager | undefined;

  private constructor() {
    super();
  }

  public static init(): void {
    this._internalInstance = new SW_GameEventManager();
  }

  public static sendGameplayEvent(event: SW_GameplayEvent): void {
    this._internalInstance?.emit('gameplayEventTriggered', event);
  }

  public static onGameplayEventTriggered(
    fn: SW_GameplayEventCallback,
    context?: any
  ): void {
    this._internalInstance?.on('gameplayEventTriggered', fn, context);
  }
}
