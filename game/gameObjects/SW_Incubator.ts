import SW_GameScene from "~/game/scenes/SW_GameScene";
import { SW_IInteractable } from "~/game/Interactable/Interactable";
import { SW_Player } from "~/game/characters/players/SW_Player";

export default class SW_Incubator extends Phaser.GameObjects.Zone implements SW_IInteractable {
    declare public scene: SW_GameScene;
    declare public body: Phaser.Physics.Arcade.StaticBody;

    /** Which map this entrance should open */
    public mapName: string = "";

    /** Which map image asset this entrance should use with mapName */
    public mapAsset: string = "";

    constructor(scene: SW_GameScene, x: number, y: number, width: number, height: number) {
      super(scene, x, y, width, width);
      this.scene.add.existing(this);
    }

    public onInteract(source: SW_Player): void {
      console.log("Incubator in progress !");
    }
}