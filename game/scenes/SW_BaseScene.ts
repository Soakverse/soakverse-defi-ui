import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

export default class SW_BaseScene extends Phaser.Scene {
  public declare rexUI: UIPlugin;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  /**
   * Add a unique listener for a given event removing any existing listener
   * @param event The event name.
   * @param fn The listener function.
   * @param context The context to invoke the listener with. Default this.
   */
  public addUniqueListener(
    event: string | symbol,
    fn: Function,
    context?: any
  ): Phaser.Events.EventEmitter {
    this.events.removeListener(event, fn, context);
    return this.events.addListener(event, fn, context);
  }
}
