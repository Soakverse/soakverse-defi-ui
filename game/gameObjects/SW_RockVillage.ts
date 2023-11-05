import SW_GameScene from "~/game/scenes/SW_GameScene";
import { SW_IInteractable } from "~/game/Interactable/Interactable";
import { SW_Player } from "~/game/characters/players/SW_Player";

export default class SW_RockVillage extends Phaser.GameObjects.Image implements SW_IInteractable {
    declare public scene: SW_GameScene;
    declare public body: Phaser.Physics.Arcade.StaticBody;

    constructor(scene: SW_GameScene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
      super(scene, x, y, texture, frame);
      this.scene.add.existing(this);
    }

    public onInteract(source: SW_Player): void {
      console.log("Welcome to the Soak village!");
    }
}