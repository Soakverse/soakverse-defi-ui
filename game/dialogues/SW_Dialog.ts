import SW_BaseScene from "../scenes/SW_BaseScene";
import { Dialog, Label, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { SW_DialogActionButton } from "./SW_DialogActionButton";
import { SW_DialogChoiceButton } from "./SW_DialogChoiceButton";
import { SW_DialogTextBox } from "./SW_DialogTextBox";

export class SW_Dialog extends Dialog {
    declare public scene: SW_BaseScene;

    protected titleText: Phaser.GameObjects.Text;
    protected contentTextBox: SW_DialogTextBox;
    public titleLabel: Label;
    protected maxChoiceCount: number;

    constructor(scene: SW_BaseScene, config: Dialog.IConfig) {
        // config.background = scene.rexUI.add.roundRectangle(0, 0, 100, 100, 8, 0x00000, 0.5);

        const titleBackground = scene.rexUI.add.roundRectangle(0, 0, 100, 40, 3, 0x000000, 0.5);
        const titleText = scene.add.text(0, 0, "", { fontSize: "24px", align: "center" });
        const titleLabel = scene.rexUI.add.label({
            background: titleBackground,
            text: titleText,
            space: { left: 8, right: 8, top: 8, bottom: 8 }
        }).layout();

        config.title = titleLabel;
        
        const contentTextBox = new SW_DialogTextBox(scene, {
            x: 0,
            y: 0,
            height: 80,
            page: { maxLines: 3, pageBreak: "\n" }
        });
        config.content = contentTextBox;

        config.choices = [
            new SW_DialogChoiceButton(scene, {}),
            new SW_DialogChoiceButton(scene, {}),
            new SW_DialogChoiceButton(scene, {}),
            new SW_DialogChoiceButton(scene, {}),
            new SW_DialogChoiceButton(scene, {})
        ];
        
        config.actions = undefined;//[ new SW_DialogActionButton(scene, {}) ];

        config.space = { title: 4, content: 25, choices: 60, choice: 8, action: 0, left: 25, right: 25, top: 25, bottom: 25 };
        config.expand = {
            title: false
        };

        super(scene, config);
        this.scene.add.existing(this);

        this.maxChoiceCount = config.choices.length;

        this.titleText = titleText;
        this.titleText.setText("");

        this.titleLabel = titleLabel;
        this.contentTextBox = contentTextBox;
        this.contentTextBox.on("complete", () => { this.emit("contentTextCompleted") }, this);
        
        this.layout();
    }

    public setTitleText(title: string): void {
        this.titleText.setText(title);
    }

    public setContentText(text: string): void {
        this.contentTextBox.showMessage(text);
    }

    public continueDialog(): void {
        if (this.contentTextBox.isTyping) {
            this.contentTextBox.stop(true);
        }
        else if (!this.contentTextBox.isLastPage) {
            this.contentTextBox.typeNextPage();
        }
    }

    public getChoice(index: number): SW_DialogChoiceButton | undefined {
        let choicesSizer = this.childrenMap.choicesSizer as Sizer;
        if (choicesSizer) {
            // @ts-ignore
            return choicesSizer.getButton(index);
        }
        return undefined;
    }

    public getMaxChoiceCount(): number {
        return this.maxChoiceCount;
    }
}