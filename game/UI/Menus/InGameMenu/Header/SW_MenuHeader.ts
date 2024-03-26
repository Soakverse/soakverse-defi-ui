import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import {
  SW_MenuHeaderButton,
  SW_MenuHeaderButtonConfig,
} from './SW_MenuHeaderButton';
import { Sizer } from 'phaser3-rex-plugins/templates/ui/ui-components';

export declare type SW_MenuHeaderConfig = {
  leftButtonsData: SW_MenuHeaderButtonConfig[];
  rightButtonsData: SW_MenuHeaderButtonConfig[];
  height: number;
};

export class SW_MenuHeader extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;

  protected rightButtonsContainer: Sizer;
  protected leftButtonsContainer: Sizer;

  protected selectedButton: SW_MenuHeaderButton | undefined;

  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    config: SW_MenuHeaderConfig
  ) {
    super(scene, x, y);

    this.scene.add.existing(this);
    this.width = this.scene.game.canvas.width;
    this.height = config.height;

    const headerBarBackground = this.scene.add.graphics();
    headerBarBackground.fillStyle(0x000000, 0.7);
    headerBarBackground.fillRect(0, 0, this.width, this.height);
    this.add(headerBarBackground);

    this.leftButtonsContainer = this.scene.rexUI.add.sizer({
      x: 24,
      y: this.height * 0.5,
      space: { item: 16 },
    });
    this.leftButtonsContainer.setOrigin(0, 0.5);
    this.add(this.leftButtonsContainer);

    this.rightButtonsContainer = this.scene.rexUI.add.sizer({
      x: this.width - 24,
      y: this.height * 0.5,
      space: { item: 16 },
    });
    this.rightButtonsContainer.setOrigin(1, 0.5);
    this.add(this.rightButtonsContainer);

    this.setupButtons(this.leftButtonsContainer, config.leftButtonsData);
    this.setupButtons(this.rightButtonsContainer, config.rightButtonsData);
  }

  protected setupButtons(
    buttonsContainer: Sizer,
    buttonsData: SW_MenuHeaderButtonConfig[]
  ): void {
    for (const buttonData of buttonsData) {
      const button = new SW_MenuHeaderButton(this.scene, 0, 0, buttonData);
      button.on(
        Phaser.Input.Events.POINTER_DOWN,
        () => {
          this.onButtonPressed(button);
        },
        this
      );
      buttonsContainer.add(button);
    }
    buttonsContainer.layout();
  }

  public selectButton(button: SW_MenuHeaderButton): void {
    if (button && button.isSelectable()) {
      if (this.selectedButton) {
        this.selectedButton.unselect();
      }

      this.selectedButton = button;
      this.selectedButton.select();
    }
  }

  public selectButtonById(buttonId: string | undefined): void {
    if (buttonId) {
      const leftButtons = this.leftButtonsContainer.getChildren();
      const rightButtons = this.rightButtonsContainer.getChildren();
      const buttons = leftButtons.concat(rightButtons) as SW_MenuHeaderButton[];

      const button = buttons.find((buttonCandidate: SW_MenuHeaderButton) => {
        return buttonCandidate.getId() == buttonId;
      });

      if (button && button.isSelectable()) {
        this.selectButton(button);
      }
    }
  }

  protected onButtonPressed(button: SW_MenuHeaderButton): void {
    this.selectButton(button);
  }
}
