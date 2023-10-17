import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";

export default class SW_BaseScene extends Phaser.Scene {
    public rexUI: UIPlugin;

    constructor(config: string | Phaser.Types.Scenes.SettingsConfig)
    {
        super(config);
    }
};
