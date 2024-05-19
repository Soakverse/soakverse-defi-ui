/** TODO
 * Cleanup the code and the widgets
 * Make our own SW_Dialog instead of using rex version. We need more flexibility on the layout
 * Add the entity backgrounds to the SW_Dialog
 * Remove QuestionJSON that was just meant for testing purpose
 * Use json files instead and have a system of ids to know which json and question to start
 * Make possible to change the focused entity and even the actual entities in a single question step.
 * Add navigation to the dialog choices
 */

import { SW_BaseMenu } from '../UI/Menus/SW_BaseMenu';
import { SW_DialogTextBox } from './SW_DialogTextBox';
import { SW_MenuManager } from '../UI/Menus/SW_MenuManager';
import Quest from 'phaser3-rex-plugins/plugins/quest.js';
import { SW_ButtonBase } from '../UI/Widgets/SW_ButtonBase';
import { Sizer } from 'phaser3-rex-plugins/templates/ui/ui-components';
import { SW_AudioManager } from '../audio/SW_AudioManager';

declare type SW_DialogOption = {
  /** Unique id of this option */
  key: string;

  /** The text displayed for this option */
  text: string;

  /** The question this option should trigger if selected */
  nextQuestionKey?: string | undefined;
};

const enum SW_DialogFocusSide {
  Left = 'Left',
  Right = 'Right',
  None = 'None',
  All = 'All',
}

declare type SW_DialogTextPart = {
  text: string;
  backgroundEntityLeft?: string | undefined;
  backgroundEntityRight?: string | undefined;
  focusSide?: SW_DialogFocusSide | undefined;
};

declare type SW_DialogQuestion = {
  key: string;
  title?: string;
  texts: SW_DialogTextPart[];
  options?: SW_DialogOption[] | undefined;
};

const QuestionJSON: SW_DialogQuestion[] = [
  {
    key: 'q0',
    title: 'FriendlyStranger',
    texts: [
      {
        text: 'Hello newcomer. Welcome to the soakworld! Great adventures await you, are you ready to get in?',
        backgroundEntityLeft: 'dialogueImage_YB',
        backgroundEntityRight: 'GPADJK_d2_1',
        focusSide: SW_DialogFocusSide.Right,
      },
    ],
    options: [
      {
        key: 'o0',
        text: 'Yes!',
        nextQuestionKey: 'q2',
      },
      {
        key: 'o1',
        text: 'No',
        nextQuestionKey: 'q1',
      },
    ],
  },
  {
    key: 'q1',
    title: 'You',
    texts: [
      {
        text: "Well, to be honest I don't know yet...",
        backgroundEntityLeft: 'dialogueImage_YB',
        backgroundEntityRight: 'GPADJK_d2_1',
        focusSide: SW_DialogFocusSide.Left,
      },
      {
        text: 'Oh... really?',
        backgroundEntityLeft: 'dialogueImage_YB',
        backgroundEntityRight: 'GPADJK_d2_1',
        focusSide: SW_DialogFocusSide.Right,
      },
    ],
    options: [
      {
        key: 'o10',
        text: 'Of course I am!',
        nextQuestionKey: 'q2',
      },
    ],
  },
  {
    key: 'q2',
    title: 'FriendlyStranger',
    texts: [
      {
        text: 'Of course I am! I have been waiting for so long.',
        backgroundEntityLeft: 'dialogueImage_YB',
        backgroundEntityRight: 'GPADJK_d2_1',
        focusSide: SW_DialogFocusSide.Left,
      },
      {
        text: 'Wonderful! Please take a tour and let me know if you have any question. We have a lot of time before we start your training.',
        backgroundEntityLeft: 'dialogueImage_YB',
        backgroundEntityRight: 'GPADJK_d2_1',
        focusSide: SW_DialogFocusSide.Right,
      },
      {
        text: 'My training?',
        backgroundEntityLeft: 'dialogueImage_YB',
        backgroundEntityRight: 'GPADJK_d2_1',
        focusSide: SW_DialogFocusSide.Left,
      },
      {
        text: 'Do you really think I will let you wander aimlessly? Monsters are hidden everywhere. They are usually harmless but you must be prepared.',
        backgroundEntityLeft: 'dialogueImage_YB',
        backgroundEntityRight: 'GPADJK_d2_1',
        focusSide: SW_DialogFocusSide.Right,
      },
      {
        text: 'Monsters... I see...',
        backgroundEntityLeft: 'dialogueImage_YB',
        backgroundEntityRight: 'GPADJK_d2_1',
        focusSide: SW_DialogFocusSide.Left,
      },
      {
        text: "Don't worry everything will be ok since I'm here. Are you ready or do you have any question?",
        backgroundEntityLeft: 'dialogueImage_YB',
        backgroundEntityRight: 'GPADJK_d2_1',
        focusSide: SW_DialogFocusSide.Right,
      },
    ],
    options: [
      {
        key: 'o11',
        text: 'All good',
      },
      {
        key: 'o12',
        text: 'I have a question',
        nextQuestionKey: 'q3',
      },
    ],
  },
  {
    key: 'q3',
    title: 'FriendlyStranger',
    texts: [
      {
        text: 'How can I help you?',
        backgroundEntityLeft: 'dialogueImage_YB',
        backgroundEntityRight: 'GPADJK_d2_1',
        focusSide: SW_DialogFocusSide.Right,
      },
    ],
    options: [
      {
        key: 'o0',
        text: 'Who are you?',
      },
      {
        key: 'o1',
        text: 'What is a monster?',
      },
      {
        key: 'o3',
        text: 'All good',
      },
    ],
  },
];

export class SW_DialogQuest extends SW_BaseMenu {
  protected questionManager: Quest;
  protected currentQuestion: SW_DialogQuestion | undefined;

  protected declare dialogTextBox: SW_DialogTextBox;

  protected declare choiceSizer: Sizer;
  protected declare dialogChoices: SW_ButtonBase[];
  protected declare selectedChoice: SW_ButtonBase | undefined;
  protected declare arrowSelectChoice: Phaser.GameObjects.Image;

  private contentStep: number = 0;
  private maxChoiceCount: number = 5;

  protected declare backgroundEntityLeft: Phaser.GameObjects.Image;
  protected declare backgroundEntityRight: Phaser.GameObjects.Image;

  constructor(menuManager: SW_MenuManager, x: number, y: number) {
    super(menuManager, x, y);

    this.width = this.scene.game.canvas.width;
    this.height = this.scene.game.canvas.height;

    this.questionManager = new Quest({
      questions: QuestionJSON,
      // format: 'json',
    });

    this.createBackgroundEntities();
    this.createDialogTextBox();
    this.createDialogChoices();

    this.questionManager.on('quest', this.updateQuestion, this);
  }

  protected createBackgroundEntities(): void {
    this.backgroundEntityLeft = this.scene.add.image(
      -320,
      this.height * 0.5,
      ''
    );
    this.backgroundEntityLeft.setOrigin(0.5, 1);
    this.add(this.backgroundEntityLeft);

    this.backgroundEntityRight = this.scene.add.image(
      320,
      this.height * 0.5,
      ''
    );
    this.backgroundEntityRight.setOrigin(0.5, 1);
    this.backgroundEntityRight.setFlipX(true);
    this.add(this.backgroundEntityRight);
  }

  protected createDialogTextBox(): void {
    this.dialogTextBox = new SW_DialogTextBox(this.scene, {
      x: 0,
      y: this.height * 0.5 - 24,
      width: this.width - 200,
      height: 80,
      page: { maxLines: 3, pageBreak: '\n' },
    });
    this.dialogTextBox.setOrigin(0.5, 1);
    this.dialogTextBox.layout();

    this.dialogTextBox.on('complete', this.onDialogTextAnimationComplete, this);
    this.dialogTextBox.on(
      Phaser.Input.Events.POINTER_DOWN,
      this.continueDialog,
      this
    );

    this.add(this.dialogTextBox);
  }

  protected createDialogChoices(): void {
    this.choiceSizer = this.scene.rexUI.add.sizer({
      x: 0,
      y: 0,
      width: 220,
      orientation: 'top-to-bottom',
      space: { item: 20 },
    });
    this.choiceSizer.setOrigin(0.5);
    this.choiceSizer.layout();
    this.add(this.choiceSizer);

    this.dialogChoices = [];

    for (let i = 0; i < this.maxChoiceCount; ++i) {
      const choice = new SW_ButtonBase(this.scene, 0, 0, {
        width: this.choiceSizer.width,
        height: 48,
        backgroundObject: this.scene.rexUI.add.roundRectangle(0, 0, 1, 1, 4),
        colorBackgroundNormal: 0xdacbb8,
        text: '',
        textStyle: { fontSize: '22px' },
      });
      choice.onHovered(() => {
        this.selectChoice(choice);
      }, this);
      choice.onClicked(() => {
        this.onChoiceClicked(choice);
      }, this);

      this.choiceSizer.add(choice);
      this.dialogChoices.push(choice);
    }

    this.arrowSelectChoice = this.scene.add.image(
      0,
      0,
      'arrowSelectDialogueOption'
    );
    this.arrowSelectChoice.setOrigin(1, 0.5);

    this.add(this.arrowSelectChoice);
    this.choiceSizer.layout();
  }

  public start(dialogID: string): void {
    this.menuManager.showMenu(this);
    this.questionManager.startQuest({
      shuffleQuestions: false,
      shuffleOptions: false,
    });
    this.questionManager.getNextQuestion();
  }

  protected selectChoice(newChoice: SW_ButtonBase) {
    if (newChoice != this.selectedChoice) {
      if (this.selectedChoice) {
        this.selectedChoice.setX(newChoice.x); // Bring back to its original x-position
      }

      newChoice.setX(newChoice.x + 8);
      this.arrowSelectChoice.setX(
        this.choiceSizer.x - this.choiceSizer.width * 0.5 + newChoice.x - 12
      );
      this.arrowSelectChoice.setY(newChoice.y);

      this.selectedChoice = newChoice;
    }
  }

  protected updateQuestion(question: SW_DialogQuestion): void {
    this.currentQuestion = question;

    this.hideAllChoices();
    this.dialogTextBox.setVisible(true);

    this.contentStep = 0;
    this.updateContent(this.contentStep);
  }

  protected updateContent(contentStep: number): void {
    if (this.currentQuestion) {
      this.dialogTextBox.showMessage(
        this.currentQuestion.texts[contentStep].text,
        this.currentQuestion.title
      );

      this.updateEntityBackgrounds(
        this.currentQuestion.texts[contentStep].backgroundEntityLeft,
        this.currentQuestion.texts[contentStep].backgroundEntityRight,
        this.currentQuestion.texts[contentStep].focusSide
      );
    }
  }

  protected updateEntityBackgrounds(
    leftTexture: string | undefined,
    rightTexture: string | undefined,
    focusSide: SW_DialogFocusSide | undefined
  ): void {
    if (leftTexture && leftTexture.length > 0) {
      this.backgroundEntityLeft.setTexture(leftTexture);
      this.backgroundEntityLeft.setVisible(true);
    } else {
      this.backgroundEntityLeft.setVisible(false);
    }

    if (rightTexture && rightTexture.length > 0) {
      this.backgroundEntityRight.setTexture(rightTexture);
      this.backgroundEntityRight.setVisible(true);
    } else {
      this.backgroundEntityRight.setVisible(false);
    }

    if (focusSide) {
      switch (focusSide) {
        case SW_DialogFocusSide.Left:
          this.animateFocusBackground(
            [this.backgroundEntityLeft],
            [this.backgroundEntityRight]
          );
          break;
        case SW_DialogFocusSide.Right:
          this.animateFocusBackground(
            [this.backgroundEntityRight],
            [this.backgroundEntityLeft]
          );
          break;
        case SW_DialogFocusSide.None:
          this.animateFocusBackground(
            [],
            [this.backgroundEntityRight, this.backgroundEntityLeft]
          );
          break;
        case SW_DialogFocusSide.All:
          this.animateFocusBackground(
            [this.backgroundEntityRight, this.backgroundEntityLeft],
            []
          );
          break;
      }
    }
  }

  protected animateFocusBackground(
    backgroundsToFocus: Phaser.GameObjects.Image[],
    backgroundsToUnfocus: Phaser.GameObjects.Image[]
  ): void {
    const tintFocused = 0xffffff;
    const tintUnfocused = 0x444444;

    for (const background of backgroundsToFocus) {
      background.setTint(tintFocused);
      background.setScale(1.02);
    }

    for (const background of backgroundsToUnfocus) {
      background.setTint(tintUnfocused);
      background.setScale(0.98);
    }
  }

  protected onDialogTextAnimationComplete(): void {
    if (this.currentQuestion) {
      if (this.contentStep >= this.currentQuestion.texts.length - 1) {
        this.updateAllChoices();
      }
    }
  }

  protected hideAllChoices(): void {
    for (const option of this.dialogChoices) {
      option.setVisible(false);
    }
    this.arrowSelectChoice.setVisible(false);
  }

  protected updateAllChoices(): void {
    if (!this.currentQuestion || !this.currentQuestion.options) {
      return;
    }

    const optionCount = this.currentQuestion.options.length;
    const dialogChoiceCount = this.dialogChoices.length;
    const visibleChoiceCount = Math.min(dialogChoiceCount, optionCount);

    for (let i = 0; i < visibleChoiceCount; ++i) {
      const choice = this.dialogChoices[i];
      this.updateChoice(choice, this.currentQuestion.options[i]);
      this.choiceSizer.show(choice);
    }

    for (let i = visibleChoiceCount; i < dialogChoiceCount; ++i) {
      this.choiceSizer.hide(this.dialogChoices[i]);
    }

    this.choiceSizer.layout();

    this.selectChoice(this.dialogChoices[0]);
    this.arrowSelectChoice.setVisible(true);
  }

  protected updateChoice(choice: SW_ButtonBase, option: SW_DialogOption): void {
    choice.setText(option.text);
    choice.setData('option', option);
  }

  protected onChoiceClicked(choice: SW_ButtonBase): void {
    if (this.questionManager.isLastQuestion()) {
      this.closeDialog();
    } else {
      const nextOption = choice.getData('option') as SW_DialogOption;
      const nextKey = nextOption ? nextOption.nextQuestionKey : undefined;

      if (nextKey) {
        this.questionManager.getNextQuestion(nextKey);
      } else {
        this.closeDialog();
      }
    }
  }

  public continueDialog(): void {
    if (this.visible) {
      SW_AudioManager.playSoundEffect('soundDialogue');

      if (this.dialogTextBox.isTyping) {
        this.dialogTextBox.stop(true);
      } else if (!this.dialogTextBox.isLastPage) {
        this.dialogTextBox.typeNextPage();
      } else if (
        this.currentQuestion &&
        this.contentStep < this.currentQuestion?.texts.length - 1
      ) {
        ++this.contentStep;
        this.updateContent(this.contentStep);
      } else if (this.questionManager.isLastQuestion()) {
        this.closeDialog();
      }
    }
  }

  public closeDialog(): void {
    this.dialogTextBox.stop();
    this.questionManager.clearData();
    this.menuManager.hideMenu(this);
  }
}
