import { Scene } from "phaser";
import { usePlayerStore } from "@/stores/game/player";
import SW_BaseScene from "./SW_BaseScene";

const playerStore = usePlayerStore();

export default class SW_PlayScene extends SW_BaseScene {
  public name: string;
  public nameText: any = null;
  constructor() {
    super({ key: "PlayScene" });
    this.name = playerStore.name;
  }

  create() {
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

  update() {
    this.name = playerStore.name;
    this.nameText.setText(playerStore.name);
  }

  stateUpdate() {
    this.name = "Helllloooo";
    this.nameText.setText(this.name);
    playerStore.setName(this.name);
  }
}
