import { Scene } from "phaser";
import { CST } from "~/game/CST";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import SW_GameUIScene from "~/game/scenes/SW_GameUIScene";

import { usePlayerStore } from "@/stores/game/player";

const playerStore = usePlayerStore();

export default class SW_GameScene extends SW_BaseScene {
  public name: string;
  public nameText: any = null;

  declare private UIscene: SW_GameUIScene;

  constructor() {
    super({ key: CST.SCENES.GAME });
    this.name = playerStore.name;
  }

  // Create
  ////////////////////////////////////////////////////////////////////////

  public create(): void {
    this.createUI();
    this.createShortcuts();

    this.add.image(400, 300, "sky");
    this.nameText = this.add.text(0, 0, playerStore.name);
    const bomb = this.physics.add.image(400, 200, "bomb");

    bomb.setCollideWorldBounds(true);
    bomb.body.onWorldBounds = true; // enable worldbounds collision event
    bomb.setBounce(1);
    bomb.setVelocity(200, 20);

    this.sound.add("thud");
    this.physics.world.on("worldbounds", () => {
      this.sound.play("thud", { volume: 0.75 });
    });

    const clickButton = this.add
      .text(100, 100, "Click me!", { fill: "#0f0" })
      .setInteractive()
      .on("pointerdown", () => this.stateUpdate());
  }

  private createUI(): void {
    this.UIscene = this.scene.get<SW_GameUIScene>(CST.SCENES.GAME_UI);
  }

  private createShortcuts(): void {
    const keys = this.input.keyboard?.addKeys({
      inventory: Phaser.Input.Keyboard.KeyCodes.O
    }, false);

    if (keys) {
      keys.inventory.on("down", () => {
        this.UIscene.toggleInventory();
      }, this);
    }
  }

  // Update
  ////////////////////////////////////////////////////////////////////////

  public update(): void {
    this.name = playerStore.name;
    this.nameText.setText(playerStore.name);
  }

  protected stateUpdate(): void {
    this.name = "Helllloooo";
    this.nameText.setText(this.name);
    playerStore.setName(this.name);
  }
}
