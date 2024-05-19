import { SW_CST } from '~/game/SW_CST';
import { SW_AudioManager } from '~/game/audio/SW_AudioManager';
import { RoundRectangle } from 'phaser3-rex-plugins/templates/ui/ui-components';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';

export declare type SW_ButtonStyle = {
  /** Explictly set the width of the button. If undefined, the width of the button will be based on the background image */
  width?: number;

  /** Explictly set the height of the button. If undefined, the height of the button will be based on the background image */
  height?: number;

  texturePressed?: string;
  textureHovered?: string;
  textureNormal?: string;
  textureDisabled?: string;

  // TODO Make a group for text and a group for texts?
  textOffsetNormalY?: number;
  textOffsetHoveredY?: number;
  textOffsetPressedY?: number;
  textOffsetDisabledY?: number;

  text?: string | undefined;
  textStyle?: Phaser.Types.GameObjects.Text.TextStyle;

  colorBackgroundNormal?: number;
  colorBackgroundPressed?: number;
  colorBackgroundHovered?: number;
  colorBackgroundDisabled?: number;

  pixelPerfect?: boolean;
  backgroundObject: Phaser.GameObjects.Image | RoundRectangle;
};

export class SW_ButtonBase extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;

  protected _isEnabled: boolean = true;

  /** Whether this button is currently pressed */
  protected _isPressed = false;

  /** Whether this button is hoverred */
  protected _isHovered = false;

  protected textOffsetNormalY: number;
  protected textOffsetHoveredY: number;
  protected textOffsetPressedY: number;
  protected textOffsetDisabledY: number;

  protected textureNormal: string = '';
  protected texturePressed: string = '';
  protected textureHovered: string = '';
  protected textureDisabled: string = '';

  protected colorFillBackgroundNormal: number;
  protected colorFillBackgroundPressed: number;
  protected colorFillBackgroundHovered: number;
  protected colorFillBackgroundDisabled: number;

  protected _backgroundObject: Phaser.GameObjects.Image | RoundRectangle;
  protected _textObject: Phaser.GameObjects.Text | undefined;

  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    style: SW_ButtonStyle
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.textOffsetNormalY = style.textOffsetNormalY ?? 0;
    this.textOffsetHoveredY = style.textOffsetHoveredY ?? 0;
    this.textOffsetPressedY = style.textOffsetPressedY ?? 1;
    this.textOffsetDisabledY = style.textOffsetDisabledY ?? 0;

    this.colorFillBackgroundNormal = style.colorBackgroundNormal ?? 0x666666;
    this.colorFillBackgroundPressed = style.colorBackgroundPressed ?? 0x555555;
    this.colorFillBackgroundHovered = style.colorBackgroundHovered ?? 0xaaaaaa;
    this.colorFillBackgroundDisabled =
      style.colorBackgroundDisabled ?? 0x222222;

    this._backgroundObject = style.backgroundObject;
    this._backgroundObject.setOrigin(0.5);
    this.add(this._backgroundObject);

    if (this._backgroundObject instanceof Phaser.GameObjects.Image) {
      this.textureNormal =
        style.textureNormal ?? this._backgroundObject.texture.key;
      this.texturePressed = style.texturePressed ?? this.textureNormal;
      this.textureHovered = style.textureHovered ?? this.textureNormal;
      this.textureDisabled = style.textureDisabled ?? this.textureNormal;
    }

    this.width = style.width ?? this._backgroundObject.width;
    this.height = style.height ?? this._backgroundObject.height;

    this.updateBackgroundSizes();

    if (style.text !== undefined) {
      const textStyle = style.textStyle ?? {};
      textStyle.fontFamily =
        textStyle.fontFamily ?? SW_CST.STYLE.TEXT.FONT_FAMILY;
      textStyle.fontSize = textStyle.fontSize ?? '12px';
      textStyle.color = textStyle.color ?? SW_CST.STYLE.COLOR.BLACK;
      textStyle.align = textStyle.align ?? 'center';

      this._textObject = this.scene.add.text(0, 0, style.text, textStyle);
      this._textObject.setOrigin(0.5);
      this.add(this._textObject);
    }

    this.setupInteractions(!!style.pixelPerfect);
    this.updateVisual();
  }

  private setupInteractions(pixelPerfect: boolean): void {
    this._backgroundObject.setInteractive({
      pixelPerfect: pixelPerfect,
      // cursor: "url(assets/cursors/icono-selectedstatic.cur), pointer"
    });

    // Behaviors
    this._backgroundObject.on(
      Phaser.Input.Events.POINTER_OVER,
      () => {
        if (this._isEnabled) {
          this._isHovered = true;
          this._isPressed = false;

          SW_AudioManager.playSoundEffect('soundButtonHovered');
          this.updateVisual();
        }
      },
      this
    );

    this._backgroundObject.on(
      Phaser.Input.Events.POINTER_OUT,
      () => {
        if (this._isEnabled) {
          this._isPressed = false;
          this._isHovered = false;

          this.updateVisual();
        }
      },
      this
    );

    this._backgroundObject.on(
      Phaser.Input.Events.POINTER_DOWN,
      () => {
        if (this._isEnabled) {
          this._isPressed = true;
          this._isHovered = false;

          SW_AudioManager.playSoundEffect('soundButtonPressed');
          this.updateVisual();
        }
      },
      this
    );

    this._backgroundObject.on(
      Phaser.Input.Events.POINTER_UP,
      () => {
        if (this._isEnabled) {
          this._isPressed = false;
          this._isHovered = true;

          this.updateVisual();
        }
      },
      this
    );
  }

  protected updateVisual(): void {
    if (!this.isEnabled()) {
      this.setVisual(
        this.textOffsetDisabledY,
        this.colorFillBackgroundDisabled,
        this.textureDisabled
      );
    } else if (this.isPressed()) {
      this.setVisual(
        this.textOffsetPressedY,
        this.colorFillBackgroundPressed,
        this.texturePressed
      );
    } else if (this.isHovered()) {
      this.setVisual(
        this.textOffsetHoveredY,
        this.colorFillBackgroundHovered,
        this.textureHovered
      );
    } else {
      this.setVisual(
        this.textOffsetNormalY,
        this.colorFillBackgroundNormal,
        this.textureNormal
      );
    }
  }

  private setVisual(
    textOffsetY: number,
    colorFillBackground: number,
    textureBackground: string
  ): void {
    this._textObject?.setY(textOffsetY);

    if (this._backgroundObject instanceof RoundRectangle) {
      this._backgroundObject.fillColor = colorFillBackground;
    } else {
      this._backgroundObject.setTexture(textureBackground);
    }
  }

  protected updateBackgroundSizes(): void {
    if (this._backgroundObject instanceof RoundRectangle) {
      this._backgroundObject.resize(this.width, this.height);
    } else {
      this._backgroundObject.setDisplaySize(this.width, this.height);
    }
  }

  public onClicked(fn: Function, context?: any): this {
    this._backgroundObject.on(Phaser.Input.Events.POINTER_UP, fn, context);
    return this;
  }

  public onHovered(fn: Function, context?: any): this {
    this._backgroundObject.on(Phaser.Input.Events.POINTER_OVER, fn, context);
    return this;
  }

  public onPointerOut(fn: Function, context?: any): this {
    this._backgroundObject.on(Phaser.Input.Events.POINTER_OUT, fn, context);
    return this;
  }

  public setEnabled(value: boolean): void {
    if (this._isEnabled != value) {
      this._isEnabled = value;
      this._isHovered = false;
      this._isPressed = false;

      if (this._isEnabled) {
        this._backgroundObject.setInteractive();
      } else {
        this._backgroundObject.disableInteractive();
      }

      this.updateVisual();
    }
  }

  public isEnabled(): boolean {
    return this._isEnabled;
  }

  public isHovered(): boolean {
    return this._isHovered;
  }

  public isPressed(): boolean {
    return this._isPressed;
  }

  public get backgroundObject(): Phaser.GameObjects.Image | RoundRectangle {
    return this._backgroundObject;
  }

  public get textObject(): Phaser.GameObjects.Text | undefined {
    return this._textObject;
  }

  public setText(text: string): void {
    this._textObject?.setText(text);
  }
}
