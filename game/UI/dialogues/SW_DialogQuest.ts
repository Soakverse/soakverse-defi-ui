import { SW_BaseMenu } from '../Menus/SW_BaseMenu';
import { SW_DialogTextBox } from './SW_DialogTextBox';
import { SW_MenuManager } from '../Menus/SW_MenuManager';
import Quest from 'phaser3-rex-plugins/plugins/quest.js';
import { SW_ButtonBase } from '../Widgets/SW_ButtonBase';
import { Sizer } from 'phaser3-rex-plugins/templates/ui/ui-components';
import { SW_AudioManager } from '../../audio/SW_AudioManager';
import { SW_DialogTitle } from './SW_DialogTitle';

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

declare type SW_DialogStepData = {
  text: string;
  title?: string | undefined;
  backgroundEntityLeft?: string | undefined;
  backgroundEntityRight?: string | undefined;
  focusSide?: SW_DialogFocusSide | undefined;
};

declare type SW_DialogQuestion = {
  key: string;
  title?: string;
  flow: SW_DialogStepData[];
  options?: SW_DialogOption[] | undefined;
  nextQuestionKey?: string | undefined;
};

export class SW_DialogQuest extends SW_BaseMenu {
  protected questionManager: Quest;
  protected currentQuestion: SW_DialogQuestion | undefined;

  protected declare titleContent: SW_DialogTitle;
  protected declare dialogTextBox: SW_DialogTextBox;

  protected declare choiceSizer: Sizer;
  protected declare dialogChoices: SW_ButtonBase[];
  protected declare selectedChoice: SW_ButtonBase | undefined;
  protected declare arrowSelectChoice: Phaser.GameObjects.Image;

  private contentStep: number = 0;
  private maxChoiceCount: number = 5;

  protected declare backgroundEntityLeft: Phaser.GameObjects.Image;
  protected declare backgroundEntityRight: Phaser.GameObjects.Image;

  /** Dialog filename in cache, so we don't need to reload the file if used several times */
  protected declare cacheDialogJson: string;

  constructor(menuManager: SW_MenuManager, x: number, y: number) {
    super(menuManager, x, y);

    this.width = this.scene.game.canvas.width;
    this.height = this.scene.game.canvas.height;

    this.questionManager = new Quest({
      // format: 'json',
    });

    this.createBackgroundEntities();
    this.createDialogTextBox();
    this.createDialogTitle();
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
      height: 86,
      page: { maxLines: 2, pageBreak: '\n' },
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

  protected createDialogTitle(): void {
    this.titleContent = new SW_DialogTitle(
      this.scene,
      this.dialogTextBox.left,
      this.dialogTextBox.top
    );
    this.add(this.titleContent);
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

  public startDialog(
    dialogID: string,
    dialogQuestionKey?: string | undefined
  ): void {
    const dialogFilename = `dialog${dialogID}`;

    if (this.cacheDialogJson != dialogFilename) {
      this.scene.cache.json.remove(this.cacheDialogJson);
    }

    if (this.scene.cache.json.exists(dialogFilename)) {
      const questions = this.scene.cache.json.get(dialogFilename);
      this.startDialogInternal(questions, dialogQuestionKey);
    } else {
      this.scene.load.once(
        `${Phaser.Loader.Events.FILE_KEY_COMPLETE}json-${dialogFilename}`,
        () => {
          this.cacheDialogJson = dialogFilename;
          const questions = this.scene.cache.json.get(dialogFilename);
          this.startDialogInternal(questions, dialogQuestionKey);
        },
        this
      );
      this.scene.load.json(
        dialogFilename,
        `/game/assets/dialogues/${dialogID}.json`
      );
      this.scene.load.start();
    }
  }

  protected startDialogInternal(
    questions: SW_DialogQuestion[],
    dialogQuestionKey?: string | undefined
  ): void {
    this.questionManager.removeAll();
    this.questionManager.add(questions);

    this.menuManager.showMenu(this);
    this.questionManager.startQuest({
      shuffleQuestions: false,
      shuffleOptions: false,
    });
    this.questionManager.getNextQuestion(dialogQuestionKey);
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
      const dialogData = this.currentQuestion.flow[contentStep];
      this.dialogTextBox.showMessage(dialogData.text);

      const title = dialogData.title ?? this.currentQuestion.title;

      this.updateTitle(title, dialogData.focusSide);

      this.updateEntityBackgrounds(
        dialogData.backgroundEntityLeft,
        dialogData.backgroundEntityRight,
        dialogData.focusSide
      );
    }
  }

  protected updateNextContent(): void {
    ++this.contentStep;
    this.updateContent(this.contentStep);
  }

  protected hasRemainingDialogContent(): boolean {
    return (
      this.currentQuestion != undefined &&
      this.contentStep < this.currentQuestion.flow.length - 1
    );
  }

  protected hasCurrentChoices(): boolean {
    const options = this.currentQuestion?.options;
    return !!options && options.length > 0;
  }

  protected updateTitle(
    title?: string | undefined,
    focusSide?: SW_DialogFocusSide | undefined
  ): void {
    if (title && title.length > 0) {
      this.titleContent.setText(title);

      if (focusSide == SW_DialogFocusSide.Right) {
        this.titleContent.setX(
          this.dialogTextBox.right - this.titleContent.width * 0.5 + 12
        );
      } else {
        this.titleContent.setX(
          this.dialogTextBox.left + this.titleContent.width * 0.5 - 12
        );
      }

      this.titleContent.setVisible(true);
    } else {
      this.titleContent.setVisible(false);
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
      if (this.contentStep >= this.currentQuestion.flow.length - 1) {
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
    this.showNextQuestion(choice);
  }

  protected showNextQuestion(choice?: SW_ButtonBase | undefined): void {
    const nextOption = choice?.getData('option') as SW_DialogOption;
    let nextKey = nextOption?.nextQuestionKey;

    if (!nextKey) {
      nextKey = this.currentQuestion?.nextQuestionKey;
    }

    if (nextKey) {
      this.questionManager.getNextQuestion(nextKey);
    } else {
      this.closeDialog();
    }
  }

  public continueDialog(): void {
    if (this.visible) {
      SW_AudioManager.playSoundEffect('soundDialogue');

      if (this.dialogTextBox.isTyping) {
        this.dialogTextBox.stop(true);
      } else if (!this.dialogTextBox.isLastPage) {
        this.dialogTextBox.typeNextPage();
      } else if (this.hasRemainingDialogContent()) {
        this.updateNextContent();
      } else if (!this.hasCurrentChoices()) {
        this.showNextQuestion();
      }
    }
  }

  public closeDialog(): void {
    this.dialogTextBox.stop();
    this.questionManager.clearData();
    this.menuManager.hideMenu(this);
  }
}
