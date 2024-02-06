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

declare type SW_DialogQuestion = {
    key: string;
    title?: string;
    text: string;
    options?: SW_DialogOption[] | undefined;
}

const QuestionJSON: SW_DialogQuestion[] = [
    {
        key: "q0",
        title: "FriendlyStranger",
        text: "Hello newcomer. Welcome to the soakworld! Great adventures await you, are you ready to get in?",
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
        title: "FriendlyStranger",
        text: "Oh... really?",
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
}

export class SW_DialogQuest extends DialogQuest {
    declare public scene: SW_BaseScene;
    protected dialog: SW_Dialog;

    constructor(scene: SW_BaseScene, config: SW_DialogQuestConfig) {        
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

        this.dialog = dialog;

        this.on("update-dialog", this.onUpdateDialog, this);
        this.on("update-choice", this.onUpdateChoice, this);
        this.on("click-choice", this.onClickChoice, this);
    }

    protected onUpdateDialog(dialog: SW_Dialog, question: SW_DialogQuestion, quest: SW_DialogQuest): void {
        dialog.setTitleText(question.title ?? "");
        dialog.setContentText(question.text);
        dialog.layout();
    }

    protected onUpdateChoice(choice: SW_DialogChoiceButton, option: SW_DialogOption, quest: SW_DialogQuest): void {
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
            quest.clearData();
        }
        else {
            const nextOption = choice.getData("option") as SW_DialogOption | undefined;
            const nextKey = nextOption ? nextOption.nextQuestionKey : undefined;

            console.log(nextOption, nextKey);

            if (nextKey) {
                quest.next(nextKey);
            }
            else {
                quest.next();
            }
        }   
    }
}