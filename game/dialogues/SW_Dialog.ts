import SW_BaseScene from "../scenes/SW_BaseScene";
import { Dialog, Label } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { SW_DialogActionButton } from "./SW_DialogActionButton";
import { SW_DialogChoiceButton } from "./SW_DialogChoiceButton";
import { SW_DialogTextBox } from "./SW_DialogTextBox";

export class SW_Dialog extends Dialog {
    declare public scene: SW_BaseScene;

    protected titleText: Phaser.GameObjects.Text;
    protected contentTextBox: SW_DialogTextBox;
    public titleLabel: Label;

    constructor(scene: SW_BaseScene, config: Dialog.IConfig) {
        config.background = scene.rexUI.add.roundRectangle(0, 0, 100, 100, 3, 0xf68f25);

        const titleBackground = scene.rexUI.add.roundRectangle(0, 0, 100, 40, 3, 0x000000, 0.2);
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
        this.layout();

        this.titleText = titleText;
        this.titleText.setText("");

        this.titleLabel = titleLabel;

        this.contentTextBox = contentTextBox;
    }

    public setTitleText(title: string): void {
        this.titleText.setText(title);
    }

    public setContentText(text: string): void {
        this.contentTextBox.showMessage(text);
    }
}

// class Demo extends Phaser.Scene {
//     constructor() {
//         super({
//             key: 'examples'
//         })
//     }

//     preload() {
//         this.load.scenePlugin({
//             key: 'rexuiplugin',
//             url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
//             sceneKey: 'rexUI'
//         });
//         this.load.script('rexdialogquest', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdialogquest.min.js');
//     }

//     create() {
//         var print = this.add.text(0, 0, '');

//         var dialog = CreateDialog(this)
//             .layout();
//         dialog.clearChoices = function () {
//             dialog.forEachChoice(function (choice) {
//                 choice.getElement('background').setStrokeStyle();
//             });
//             return dialog;
//         }

//         var quest = new rexdialogquest({
//             dialog: dialog,
//             questions: Questions,
//         })            
//             .on('update-choice', function (choice, option, quest) {
//                 choice
//                     .setText(option.key)
//                     .setData('option', option);
//             })
//             .on('update-dialog', function (dialog, question, quest) {
//                 dialog.getElement('title').setText(question.key);
//                 dialog.getElement('actions')[0].setText((question.end) ? 'End' : 'Next');
//                 quest.setData('nextKey', null);
//                 dialog
//                     .clearChoices()
//                     .layout();

//                 print.text += `${question.key}`;
//                 if (question.end) {
//                     print.text += ' (End)\n';
//                 }
//             })
//             .on('click-choice', function (choice, dialog, quest) {
//                 dialog.clearChoices();
//                 choice.getElement('background').setStrokeStyle(1, 0xffffff);
//                 quest.setData('option', choice.getData('option'));
//             })
//             .on('click-action', function (action, dialog, quest) {
//                 if (action.text === 'Next') {
//                     var option = quest.getData('option');
//                     var nextKey = option.next;
//                     var optionKey = option.key;
//                     print.text += ` --> |${optionKey}| ${nextKey}\n`;

//                     // Clear option reference
//                     quest.setData('option', undefined);
//                     dialog.forEachChoice(function (choice) {
//                         choice.setData('option', undefined);
//                     });

//                     // Next question
//                     if (nextKey !== null) {
//                         quest.next(nextKey);
//                     } else {
//                         quest.emit('complete', quest);
//                     }
//                 }
//             })
//             .start();
//     }

//     update() { }
// }


// var CreateButton = function (scene, text, backgroundColor) {
//     return scene.rexUI.add.label({
//         background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, backgroundColor),

//         text: scene.add.text(0, 0, text, {
//             fontSize: '24px'
//         }),

//         space: {
//             left: 10,
//             right: 10,
//             top: 10,
//             bottom: 10
//         }
//     });
// }

// /*
// A --> |Z| B
// A --> |X| C
// B --> |Z| D
// B --> |X| E
// C --> |Z| F
// C --> |X| G
// D --> |Z| H
// D --> |X| I
// E --> |Z| J
// E --> |X| K
// F --> |Z| L
// F --> |X| M
// */

// const Questions = `type,key,next,end
// q,A,,
// ,R,B,
// ,L,C,
// q,B,,
// ,R,D,
// ,L,E,
// q,C,,
// ,R,F,
// ,L,G,
// q,D,,
// ,R,H,
// ,L,I,
// q,E,,
// ,R,J,
// ,L,K,
// q,F,,
// ,R,L,
// ,L,M,
// q,G,,1
// q,H,,1
// q,I,,1
// q,J,,1
// q,K,,1
// q,L,,1
// q,M,,1`;

// var config = {
//     type: Phaser.AUTO,
//     parent: 'phaser-example',
//     width: 800,
//     height: 600,
//     scale: {
//         mode: Phaser.Scale.FIT,
//         autoCenter: Phaser.Scale.CENTER_BOTH,
//     },  
//     scene: Demo
// };

// var game = new Phaser.Game(config);