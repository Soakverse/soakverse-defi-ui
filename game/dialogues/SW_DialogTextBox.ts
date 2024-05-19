import { SW_CST } from '~/game/SW_CST';
import { SW_Utils } from '~/game/SW_Utils';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import TextBox from 'phaser3-rex-plugins/templates/ui/textbox/TextBox';

export class SW_DialogTextBox extends TextBox {
  public declare scene: SW_BaseScene;

  constructor(scene: SW_BaseScene, config: TextBox.IConfig) {
    config.width = config.width ?? 400;
    config.height = config.height ?? 80;
    config.space = {
      left: 12,
      right: 12,
      top: 12,
      bottom: 12,
      icon: 16,
      text: 0,
      separator: 6,
      separatorRight: 200,
    };

    config.layoutMode = 1;
    const background = scene.rexUI.add.roundRectangle(
      0,
      0,
      config.width -
        (config.space.left as number) -
        (config.space.right as number),
      config.height -
        (config.space.top as number) -
        (config.space.bottom as number),
      3,
      SW_Utils.hexColorToNumber(SW_CST.STYLE.COLOR.BLACK),
      0.86
    );
    background.strokeColor = SW_Utils.hexColorToNumber(
      SW_CST.STYLE.COLOR.BLACK
    );
    background.lineWidth = 0;
    background.setInteractive();

    config.background = background;
    // config.separator = scene.rexUI.add.roundRectangle(0, 0, 10, 1, 0, SW_Utils.hexColorToNumber(CST.STYLE.COLOR.BLUE));
    //config.title = scene.add.text(0, 0, "", { fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY, fontSize: "16px", fontStyle: "bold", color: SW_CST.STYLE.COLOR.BLUE, align: "left"});
    // config.icon = scene.add.image(0, 0, "").setScale(1.1);
    config.text = scene.add
      .text(0, 0, '', {
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        fontSize: '14px',
        color: SW_CST.STYLE.COLOR.WHITE,
        align: 'left',
        wordWrap: {
          width:
            config.width -
            (config.space.left as number) -
            (config.space.right as number),
        },
      })
      .setFixedSize(
        config.width -
          (config.space.left as number) -
          (config.space.right as number),
        config.height -
          (config.space.top as number) -
          (config.space.bottom as number)
      );
    config.page = config.page ? config.page : { maxLines: 4, pageBreak: '\n' };

    config.width = 0; // Prevent warnings as we don't care about the minimum size
    config.height = 0; // Prevent warnings as we don't care about the minimum size

    super(scene, config);
    scene.add.existing(this);

    background.on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
    background.on(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this);

    this.setOrigin(0.5, 0.5);

    this.layout();
  }

  public showMessage(
    message: string,
    title?: string,
    typingSpeed: number = 30
  ) {
    this.setTitle(title ?? '');
    this.layout();
    this.start(message, typingSpeed);
  }

  public closeDialogue(): void {
    this.stop();
  }

  protected onPointerDown(
    pointer: Phaser.Input.Pointer,
    currentlyOver: Phaser.GameObjects.GameObject[]
  ): void {
    this.emit(Phaser.Input.Events.POINTER_DOWN, pointer, currentlyOver);
  }

  protected onPointerUp(
    pointer: Phaser.Input.Pointer,
    currentlyOver: Phaser.GameObjects.GameObject[]
  ): void {
    this.emit(Phaser.Input.Events.POINTER_UP, pointer, currentlyOver);
  }
}
