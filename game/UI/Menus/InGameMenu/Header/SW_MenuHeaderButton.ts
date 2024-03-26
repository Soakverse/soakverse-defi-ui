import { Sizer } from 'phaser3-rex-plugins/templates/ui/ui-components';
import { SW_CST } from '~/game/SW_CST';
import { SW_Utils } from '~/game/SW_Utils';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';

enum SW_ButtonState {
  Normal = 0,
  Hovered = 1,
  Pressed = 2,
  Disabled = 3,
}

export declare type SW_MenuHeaderButtonConfig = {
  id: string;
  icon: string;
  text: string;
  height: number;
  isSelectable?: boolean;
  action: Function;
  actionContext: any;
  spacing?: number;
  colorNormal?: string;
  colorHovered?: string;
  colorPressed?: string;
  colorDisabled?: string;
};

export class SW_MenuHeaderButton extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;
  protected id: string;

  protected icon: Phaser.GameObjects.Image;
  protected text: Phaser.GameObjects.Text;

  protected colorNormal: string;
  protected colorHovered: string;
  protected colorPressed: string;
  protected colorDisabled: string;

  protected _isSelectable: boolean;

  protected highlightedLine: Phaser.GameObjects.Rectangle;

  protected sizer: Sizer;

  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    config: SW_MenuHeaderButtonConfig
  ) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.sizer = this.scene.rexUI.add.sizer(0, 0, {
      space: { item: config.spacing ?? 6 },
    });
    this.add(this.sizer);

    this.id = config.id;

    this.colorNormal = config.colorNormal ?? SW_CST.STYLE.COLOR.WHITE;
    this.colorHovered = config.colorHovered ?? '#CACACA';
    this.colorPressed = config.colorPressed ?? '#AAAAAA';
    this.colorDisabled = config.colorDisabled ?? '#55555';

    this._isSelectable = !!config.isSelectable;

    this.icon = this.scene.add.image(0, 0, config.icon);
    this.icon.setOrigin(0, 0.5);
    this.sizer.add(this.icon);

    this.text = this.scene.add.text(0, 0, config.text, {
      fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
      fontSize: '14px',
      color: this.colorNormal,
    });
    this.text.setOrigin(0, 0.5);
    this.sizer.add(this.text);

    this.sizer.setChildrenAlignMode('center');

    this.sizer.layout();

    this.width = this.sizer.width;
    this.height = config.height;

    const lineThickness = 4;
    this.highlightedLine = this.scene.add.rectangle(
      0,
      this.height * 0.5 - lineThickness * 0.5,
      this.width,
      lineThickness,
      0xe1b77e,
      1
    );
    this.highlightedLine.setVisible(false);
    this.add(this.highlightedLine);

    this.setupInteractions();

    this.on(
      Phaser.Input.Events.POINTER_DOWN,
      config.action,
      config.actionContext
    );
  }

  private setupInteractions() {
    this.sizer.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(
        0,
        (this.sizer.height - this.height) * 0.5,
        this.width,
        this.height
      ),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
    });

    this.sizer.on(
      Phaser.Input.Events.POINTER_DOWN,
      () => {
        this.emit(Phaser.Input.Events.POINTER_DOWN);
        this.setButtonState(SW_ButtonState.Pressed);
      },
      this
    );

    this.sizer.on(
      Phaser.Input.Events.POINTER_OVER,
      () => {
        this.setButtonState(SW_ButtonState.Hovered);
        this.emit(Phaser.Input.Events.POINTER_OVER);
      },
      this
    );

    this.sizer.on(
      Phaser.Input.Events.POINTER_UP,
      () => {
        this.setButtonState(SW_ButtonState.Hovered);
        this.emit(Phaser.Input.Events.POINTER_UP);
      },
      this
    );

    this.sizer.on(
      Phaser.Input.Events.POINTER_OUT,
      () => {
        this.setButtonState(SW_ButtonState.Normal);
        this.emit(Phaser.Input.Events.POINTER_OUT);
      },
      this
    );

    this.sizer.on(
      Phaser.Input.Events.POINTER_UP_OUTSIDE,
      () => {
        this.setButtonState(SW_ButtonState.Normal);
        this.emit(Phaser.Input.Events.POINTER_UP_OUTSIDE);
      },
      this
    );
  }

  private setButtonState(inState: SW_ButtonState): void {
    switch (inState) {
      case SW_ButtonState.Normal:
        this.text.setColor(this.colorNormal);
        this.icon.setTintFill(SW_Utils.hexColorToNumber(this.colorNormal));
        break;
      case SW_ButtonState.Hovered:
        this.text.setColor(this.colorHovered);
        this.icon.setTintFill(SW_Utils.hexColorToNumber(this.colorHovered));
        break;
      case SW_ButtonState.Pressed:
        this.text.setColor(this.colorPressed);
        this.icon.setTintFill(SW_Utils.hexColorToNumber(this.colorPressed));
        break;
      case SW_ButtonState.Disabled:
        this.text.setColor(this.colorDisabled);
        this.icon.setTintFill(SW_Utils.hexColorToNumber(this.colorDisabled));
        break;
    }
  }

  public getId(): string {
    return this.id;
  }

  public isSelectable(): boolean {
    return !!this._isSelectable;
  }

  public select(): void {
    if (this.isSelectable()) {
      this.highlightedLine.setVisible(true);
    }
  }

  public unselect(): void {
    this.highlightedLine.setVisible(false);
  }
}
