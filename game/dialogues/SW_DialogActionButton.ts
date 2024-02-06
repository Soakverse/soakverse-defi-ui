import { Label } from "phaser3-rex-plugins/templates/ui/ui-components";
import SW_BaseScene from "../scenes/SW_BaseScene";

export class SW_DialogActionButton extends Label {
    declare public scene: SW_BaseScene;

    constructor(scene: SW_BaseScene, config: Label.IConfig) {
        config.background = scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0xAA44EE);
        config.text = scene.add.text(0, 0, "ActionText", { fontSize: "24px" });
        config.space = { left: 10, right: 10,  top: 10, bottom: 10 }

        super(scene, config);
        this.scene.add.existing(this);
        this.layout();
    }
}