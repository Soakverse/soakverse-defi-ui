import SW_GameScene from '~/game/scenes/SW_GameScene';
import { SW_IInteractable } from '~/game/Interactable/Interactable';
import { SW_Player } from '~/game/characters/players/SW_Player';
import { SW_GameEventManager } from '../SW_GameEventManager';

export default class SW_WizhWell
  extends Phaser.GameObjects.Zone
  implements SW_IInteractable
{
  public declare scene: SW_GameScene;
  public declare body: Phaser.Physics.Arcade.StaticBody;
  public hintOffsetY: number = 0;

  constructor(
    scene: SW_GameScene,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super(scene, x, y, width, height);
    this.scene.add.existing(this);
  }

  public getHintName(): string {
    return 'The Wizhing Well';
  }

  public getHintOffsetY(): number {
    return this.hintOffsetY;
  }

  public onInteract(source: SW_Player): void {
    this.scene.events.emit('wizhWellRequested');
    SW_GameEventManager.sendGameplayEvent({
      key: 'Event.WizhingWell.Interact',
    });
  }
}
