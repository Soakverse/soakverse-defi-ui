/** TODO
 * Cleanup the codeand the widgets
 * Make our own SW_Dialog instead of using rex version. We need more flexibility on the layout
 * Add the entity backgrounds to the SW_Dialog
 * Remove QuestionJSON that was just meant for testing purpose
 * Use json files instead and have a system of ids to know which json and question to start
 * Make possible to change the focused entity and even the actual entities in a single question step.
 * Add navigation to the dialog choices
 */

import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import DialogQuest from "phaser3-rex-plugins/templates/dialog-quest/DialogQuest";
import { SW_Dialog } from "./SW_Dialog";
import { SW_DialogChoiceButton } from "./SW_DialogChoiceButton";

declare type SW_DialogOption = {
    /** Unique id of this option */
    key: string;

    /** The text displayed for this option */
    text: string;

    /** The question this option should trigger if selected */
    nextQuestionKey?: string | undefined;
}

const enum SW_DialogFocusSide {
    Left = "Left",
    Right = "Right",
    None = "None",
    All = "All"
}

declare type SW_DialogQuestion = {
    key: string;
    title?: string;
    text: string;
    backgroundEntityLeft?: string | undefined;
    backgroundEntityRight?: string | undefined;
    focusSide?: SW_DialogFocusSide | undefined;
    options?: SW_DialogOption[] | undefined;
}

const QuestionJSON: SW_DialogQuestion[] = [
    {
        key: "q0",
        title: "FriendlyStranger",
        text: "Hello newcomer. Welcome to the soakworld! Great adventures await you, are you ready to get in?\nHello newcomer. Welcome to the soakworld! Great adventures await you, are you ready to get in? Hello newcomer. Welcome to the soakworld! Great adventures await you, are you ready to get in?\nHello newcomer. Welcome to the soakworld! Great adventures await you, are you ready to get in?\nHello newcomer. Welcome to the soakworld! Great adventures await you, are you ready to get in?",
        backgroundEntityLeft: "dialogueImage_YB",
        backgroundEntityRight: "GPADJK_d2_1",
        focusSide: SW_DialogFocusSide.Left,
        options: [
            {
                key: "o0",
                text: "Hell yeah!",
                nextQuestionKey: "q2"
            },
            {
                key: "o1",
                text: "Well, I'm not sure...",
                nextQuestionKey: "q1"
            }
        ]
    },
    {
        key: "q1",
        title: "You",
        text: "Oh... really?",
        backgroundEntityLeft: "dialogueImage_YB",
        backgroundEntityRight: "GPADJK_d2_1",
        focusSide: SW_DialogFocusSide.Right,
        options: [
            {
                key: "o10",
                text: "OF COURSE I AM!",
                nextQuestionKey: "q2"
            }
        ]
    },
    {
        key: "q2",
        title: "FriendlyStranger",
        text: "Wonderful! Enjour your time here!",
        backgroundEntityLeft: "dialogueImage_YB",
        backgroundEntityRight: "GPADJK_d2_1",
        focusSide: SW_DialogFocusSide.Right,
        options: [
            {
                key: "o10",
                text: "Close",
                nextQuestionKey: "q3"
            },
            {
                key: "os10",
                text: "Close",
                nextQuestionKey: "q3"
            }
        ]
    },
    {
        key: "q3",
        title: "FriendlyStranger",
        text: "Wonderful! Enjour your time here!",
        backgroundEntityLeft: "dialogueImage_YB",
        backgroundEntityRight: "Scribb",
        focusSide: SW_DialogFocusSide.Left,
        options: [
            {
                key: "o10",
                text: "AAAAAA",
                nextQuestionKey: "q4"
            },
            {
                key: "os10",
                text: "BBBBBBBBB",
                nextQuestionKey: "q4"
            }
        ]
    },
    {
        key: "q4",
        title: "FriendlyStranger",
        text: "Wonderful! Enjour your time here!",
        backgroundEntityLeft: "dialogueImage_YB",
        backgroundEntityRight: "Scribb",
        focusSide: SW_DialogFocusSide.All,
        options: [
            {
                key: "o10",
                text: "Close"
            }
        ]
    }
]

export declare type SW_DialogQuestConfig = {
    x: number,
    y: number,
    width: number,
    originX: number;
    originY: number;
}

export class SW_DialogQuest extends DialogQuest {
    declare public scene: SW_BaseScene;
    protected dialog: SW_Dialog;

    private backgroundEntityLeft: Phaser.GameObjects.Image;
    private backgroundEntityRight: Phaser.GameObjects.Image;

    private currentQuestion: SW_DialogQuestion | undefined;

    constructor(scene: SW_BaseScene, config: SW_DialogQuestConfig) {
        const backgroundEntityLeft = scene.add.image(0, 0, "").setOrigin(0.5, 1);
        const backgroundEntityRight = scene.add.image(0, 0, "").setOrigin(0.5, 1).setFlipX(true);

        const dialog = new SW_Dialog(scene, {
            x: config.x,
            y: config.y,
            width: config.width
        });

        super({
            questions: QuestionJSON,
            // @ts-ignore
            dialog: dialog,
            choices: []
        });

        this.scene = scene;

        this.backgroundEntityLeft = backgroundEntityLeft.setVisible(false);
        this.backgroundEntityRight = backgroundEntityRight.setVisible(false);

        this.dialog = dialog;
        this.dialog.setOrigin(config.originX, config.originY);
        this.dialog.setVisible(false);
        this.dialog.on("contentTextCompleted", this.updateAllChoices, this);

        this.on("update-dialog", this.onUpdateDialog, this);
        this.on("click-choice", this.onClickChoice, this);

        this.setPosition(config.x, config.y);
    }

    protected onUpdateDialog(dialog: SW_Dialog, question: SW_DialogQuestion, quest: SW_DialogQuest): void {
        this.currentQuestion = question;

        this.hideAllChoices();
        this.updateEntityBackgrounds(question.backgroundEntityLeft, question.backgroundEntityRight, question.focusSide);
        dialog.setTitleText(question.title ?? "");
        dialog.setContentText(question.text);

        dialog.layout();
    }

    protected updateEntityBackgrounds(leftTexture: string | undefined, rightTexture: string | undefined, focusSide: SW_DialogFocusSide | undefined): void {
        if (leftTexture && (leftTexture.length > 0)) {
            this.backgroundEntityLeft.setTexture(leftTexture);
            this.backgroundEntityLeft.setVisible(true);
        }
        else {
            this.backgroundEntityLeft.setVisible(false);
        }

        if (rightTexture && (rightTexture.length > 0)) {
            this.backgroundEntityRight.setTexture(rightTexture);
            this.backgroundEntityRight.setVisible(true);
        }
        else {
            this.backgroundEntityRight.setVisible(false);
        }

        if (focusSide) {
            switch (focusSide) {
                case SW_DialogFocusSide.Left:
                    this.animateFocusBackground([this.backgroundEntityLeft], [this.backgroundEntityRight]);
                    break;
                case SW_DialogFocusSide.Right:
                    this.animateFocusBackground([this.backgroundEntityRight], [this.backgroundEntityLeft]);
                    break;
                case SW_DialogFocusSide.None:
                    this.animateFocusBackground([], [this.backgroundEntityRight, this.backgroundEntityLeft]);
                    break;
                case SW_DialogFocusSide.All:
                    this.animateFocusBackground([this.backgroundEntityRight, this.backgroundEntityLeft], []);
                    break;
            }
        }
    }

    protected animateFocusBackground(backgroundsToFocus: Phaser.GameObjects.Image[], backgroundsToUnfocus: Phaser.GameObjects.Image[]): void {
        const tintFocused = 0xFFFFFF;
        const tintUnfocused = 0x333333;

        for (const background of backgroundsToFocus) {
            background.setTint(tintFocused);
        }

        for (const background of backgroundsToUnfocus) {
            background.setTint(tintUnfocused);
        }
    }

    protected hideAllChoices(): void {
        // @ts-ignore
        this.dialog.forEachChoice((button: SW_DialogChoiceButton) => {
            button.setVisible(false);
        });
    }

    protected updateAllChoices(): void {
        if (!this.currentQuestion || !this.currentQuestion.options) {
            return;
        }

        const visibleChoiceCount = Math.min(this.dialog.getMaxChoiceCount(), this.currentQuestion.options.length);
        for (let i = 0; i < visibleChoiceCount; ++i) {
            const choice = this.dialog.getChoice(i);
            if (choice) {
                this.updateChoice(choice, this.currentQuestion.options[i]);
                choice.setVisible(true);
            }
            else {
                console.warn("SW_DialogQuest::updateChoice - Invalid choice button");
            }
        }

        for (let i = visibleChoiceCount; i < this.currentQuestion.options.length; ++i) {
            const choice = this.dialog.getChoice(i);
            if (choice) {
                choice.setVisible(false);
            }
            else {
                console.warn("SW_DialogQuest::updateChoice - Invalid choice button");
            }
        }
    }

    protected updateChoice(choice: SW_DialogChoiceButton, option: SW_DialogOption | undefined): void {
        if (!choice) {
            console.warn("SW_DialogQuest::updateChoice - Invalid choice button");
            return;
        }

        if (option) {
            choice.setText(option.text);
            choice.setData("option", option);
        }
        else {
            console.warn("SW_DialogQuest::updateChoice - Invalid option");
        }
    }

    protected onClickChoice(choice: SW_DialogChoiceButton, dialog: SW_Dialog, quest: SW_DialogQuest): void {
        if (quest.isLast()) {
            dialog.setVisible(false);
            this.backgroundEntityLeft.setVisible(false);
            this.backgroundEntityRight.setVisible(false);
            quest.clearData();
        }
        else {
            const nextOption = choice.getData("option") as SW_DialogOption | undefined;
            const nextKey = nextOption ? nextOption.nextQuestionKey : undefined;

            if (nextKey) {
                quest.next(nextKey);
            }
            else {
                quest.next();
            }
        }   
    }

    public getDialogWidth(): number {
        return this.dialog.width;
    }

    public getDialogHeight(): number {
        return this.dialog.height;
    }

    public setPosition(x: number, y: number): void {
        this.dialog.setPosition(x, y);

        this.backgroundEntityLeft.setPosition(this.dialog.x - this.dialog.width * 0.5, this.dialog.y + 30);
        this.backgroundEntityRight.setPosition(this.dialog.x + this.dialog.width * 0.5, this.dialog.y + 30);
    }

    public continueDialog(): void {
        if (this.dialog.visible) {
            this.dialog.continueDialog();
        }
    }
}