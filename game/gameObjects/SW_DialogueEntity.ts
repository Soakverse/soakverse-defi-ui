import SW_GameScene from '~/game/scenes/SW_GameScene';
import { SW_IInteractable } from '~/game/Interactable/Interactable';
import { SW_Player } from '~/game/characters/players/SW_Player';

export default class SW_DialogueEntity
  extends Phaser.GameObjects.Zone
  implements SW_IInteractable
{
  public declare scene: SW_GameScene;
  public declare body: Phaser.Physics.Arcade.StaticBody;

  /** The ID to find the right dialogue asset */
  public dialogueID: string = '';

  /** The key to find the right question to start with */
  public dialogQuestionKey: string | undefined;

  /** The name displayed on top of this entity before trying to interact with it */
  public hintName: string = '';

  /** The name displayed on top of this entity before trying to interact with it */
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

  public onInteract(source: SW_Player): void {
    this.scene.requestDialog(this.dialogueID, this.dialogQuestionKey);
  }

  public getHintName(): string {
    return this.hintName;
  }

  public getHintOffsetY(): number {
    return 0;
  }
}
