import SW_GameScene from "~/game/scenes/SW_GameScene";
import { SW_IInteractable } from "~/game/Interactable/Interactable";
import { SW_Player } from "~/game/characters/players/SW_Player";

export default class SW_WizhWell extends Phaser.GameObjects.Zone implements SW_IInteractable {
    declare public scene: SW_GameScene;
    declare public body: Phaser.Physics.Arcade.StaticBody;

    constructor(scene: SW_GameScene, x: number, y: number, width: number, height: number) {
      super(scene, x, y, width, height);
      this.scene.add.existing(this);
    }

    public getHintName(): string {
      return "Wizh Well";
    }

    public getHintOffsetY(): number {
      return 0;
    }

    public onInteract(source: SW_Player): void {
      this.scene.events.emit("wizhWellRequested");
    }
}