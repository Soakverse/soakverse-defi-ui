import { SW_CST } from '~/game/SW_CST';
import { SW_AudioManager } from '~/game/audio/SW_AudioManager';
import { RoundRectangle } from 'phaser3-rex-plugins/templates/ui/ui-components';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';

export declare type SW_ButtonConfig = {
  /** Explictly set the width of the button. If undefined, the width of the button will be based on the background image */
  width?: number;

  /** Explictly set the height of the button. If undefined, the height of the button will be based on the background image */
  height?: number;

  texturePressed?: string;
  textureHovered?: string;
  textureNormal?: string;
  textureDisabled?: string;

  texturePressedSelected?: string;
  textureHoveredSelected?: string;
  textureNormalSelected?: string;
  textureDisabledSelected?: string;

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

  /** Whether this button is selected. This can be useful for checkboxes, radiobuttons or tabs */
  protected _isSelected = false;

  protected textOffsetNormalY: number;
  protected textOffsetHoveredY: number;
  protected textOffsetPressedY: number;
  protected textOffsetDisabledY: number;

  protected textureNormal: string = '';
  protected texturePressed: string = '';
  protected textureHovered: string = '';
  protected textureDisabled: string = '';

  protected textureNormalSelected: string = '';
  protected texturePressedSelected: string = '';
  protected textureHoveredSelected: string = '';
  protected textureDisabledSelected: string = '';

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
    config: SW_ButtonConfig
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.textOffsetNormalY = config.textOffsetNormalY ?? 0;
    this.textOffsetHoveredY = config.textOffsetHoveredY ?? 0;
    this.textOffsetPressedY = config.textOffsetPressedY ?? 1;
    this.textOffsetDisabledY = config.textOffsetDisabledY ?? 0;

    this.colorFillBackgroundNormal = config.colorBackgroundNormal ?? 0x666666;
    this.colorFillBackgroundPressed = config.colorBackgroundPressed ?? 0x555555;
    this.colorFillBackgroundHovered = config.colorBackgroundHovered ?? 0xaaaaaa;
    this.colorFillBackgroundDisabled =
      config.colorBackgroundDisabled ?? 0x222222;

    this._backgroundObject = config.backgroundObject;
    this._backgroundObject.setOrigin(0.5);
    this.add(this._backgroundObject);

    if (this._backgroundObject instanceof Phaser.GameObjects.Image) {
      this.textureNormal =
        config.textureNormal ?? this._backgroundObject.texture.key;
      this.texturePressed = config.texturePressed ?? this.textureNormal;
      this.textureHovered = config.textureHovered ?? this.textureNormal;
      this.textureDisabled = config.textureDisabled ?? this.textureNormal;

      this.textureNormalSelected =
        config.textureNormalSelected ?? this._backgroundObject.texture.key;
      this.texturePressedSelected =
        config.texturePressedSelected ?? this.textureNormalSelected;
      this.textureHoveredSelected =
        config.textureHoveredSelected ?? this.textureNormalSelected;
      this.textureDisabled =
        config.textureDisabled ?? this.textureNormalSelected;
    }

    this.width = config.width ?? this._backgroundObject.width;
    this.height = config.height ?? this._backgroundObject.height;

    this.updateBackgroundSizes();

    if (config.text !== undefined) {
      const textStyle = config.textStyle ?? {};
      textStyle.fontFamily =
        textStyle.fontFamily ?? SW_CST.STYLE.TEXT.FONT_FAMILY;
      textStyle.fontSize = textStyle.fontSize ?? '12px';
      textStyle.color = textStyle.color ?? SW_CST.STYLE.COLOR.BLACK;
      textStyle.align = textStyle.align ?? 'center';

      this._textObject = this.scene.add.text(0, 0, config.text, textStyle);
      this._textObject.setOrigin(0.5);
      this.add(this._textObject);
    }

    this.setupInteractions(!!config.pixelPerfect);
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
    if (this._isSelected) {
      this.updateVisualSelected();
    } else {
      this.updateVisualUnselected();
    }
  }

  protected updateVisualSelected(): void {
    if (!this.isEnabled()) {
      this.setVisual(
        this.textOffsetDisabledY,
        this.colorFillBackgroundDisabled,
        this.textureDisabledSelected
      );
    } else if (this.isPressed()) {
      this.setVisual(
        this.textOffsetPressedY,
        this.colorFillBackgroundPressed,
        this.texturePressedSelected
      );
    } else if (this.isHovered()) {
      this.setVisual(
        this.textOffsetHoveredY,
        this.colorFillBackgroundHovered,
        this.textureHoveredSelected
      );
    } else {
      this.setVisual(
        this.textOffsetNormalY,
        this.colorFillBackgroundNormal,
        this.textureNormalSelected
      );
    }
  }
  protected updateVisualUnselected(): void {
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

  public onUnhovered(fn: Function, context?: any): this {
    this._backgroundObject.on(Phaser.Input.Events.POINTER_OUT, fn, context);
    return this;
  }

  public onSelected(fn: Function, context?: any): this {
    this.on('selected', fn, context);
    return this;
  }

  public onUnselected(fn: Function, context?: any): this {
    this.on('unselected', fn, context);
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

  public isSelected(): boolean {
    return this._isSelected;
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

  public select(): void {
    if (!this._isSelected) {
      this._isSelected = true;
      this.updateVisual();

      this.emit('selected');
    }
  }

  public unselect(): void {
    if (this._isSelected) {
      this._isSelected = false;
      this.updateVisual();

      this.emit('unselected');
    }
  }

  public toggleSelection(): void {
    this._isSelected = !this._isSelected;
    this.updateVisual();

    if (this._isSelected) {
      this.emit('selected');
    } else {
      this.emit('unselected');
    }
  }
}
