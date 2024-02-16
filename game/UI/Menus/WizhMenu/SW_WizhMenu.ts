import { SW_CST } from "~/game/SW_CST";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";

export class SW_WizhMenu extends Phaser.GameObjects.Container
{
    declare public scene: SW_BaseScene;

    protected background: Phaser.GameObjects.Image;
    protected header: Phaser.GameObjects.Image;
    protected headerText: Phaser.GameObjects.Text;

    constructor(scene: SW_BaseScene, x: number, y: number) {
        super(scene, x, y);
        this.scene.add.existing(this);
        
        this.background = this.scene.add.image(0, 0, "menuBackground").setOrigin(0.5);
        this.add(this.background);

        this.width = this.background.width;
        this.height = this.background.height;

        this.header = this.scene.add.image(0, -this.height * 0.5 + 8, "menuHeader").setOrigin(0.5);
        this.add(this.header);

        this.headerText = this.scene.add.text(this.header.x, this.header.y - 8, "Wizhes", { color: SW_CST.STYLE.COLOR.WHITE, strokeThickness: 3, stroke: SW_CST.STYLE.COLOR.BLACK, fontSize: "23px", fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY }).setOrigin(0.5);
        this.add(this.headerText);

        const makeAWizhText = this.scene.add.text(this.header.x, this.header.y + this.header.height * 0.5 + 12, "You found the magic fountain", { color: SW_CST.STYLE.COLOR.WHITE, strokeThickness: 3, stroke: SW_CST.STYLE.COLOR.BLACK, fontSize: "18px", fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY }).setOrigin(0.5, 0);
        this.add(makeAWizhText);
        
        const makeAWizhButton = this.scene.add.image(makeAWizhText.x, makeAWizhText.y + makeAWizhText.height + 40, "menuButtonNormal").setOrigin(0.5, 0);
        this.add(makeAWizhButton);
        makeAWizhButton.setInteractive();
        makeAWizhButton.on(Phaser.Input.Events.POINTER_DOWN, this.makeAWizh, this);

        const makeAWizhButtonText = this.scene.add.text(makeAWizhButton.x, makeAWizhButton.y + makeAWizhButton.height * 0.5, "Make a Wizh", { color: SW_CST.STYLE.COLOR.WHITE, strokeThickness: 3, stroke: SW_CST.STYLE.COLOR.BLACK, fontSize: "16px", fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY }).setOrigin(0.5, 0.5);
        this.add(makeAWizhButtonText);
    }

    protected makeAWizh(): void {
        this.setVisible(false);
    }
}