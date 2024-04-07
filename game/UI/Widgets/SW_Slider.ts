import BaseSizer from 'phaser3-rex-plugins/templates/ui/basesizer/BaseSizer';
import { RoundRectangle } from 'phaser3-rex-plugins/templates/ui/ui-components';
import { Slider } from 'phaser3-rex-plugins/templates/ui/ui-components';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';

declare type SW_SliderValueChangeCallbackType = (
  newValue: number,
  oldValue: number,
  slider: Slider
) => void;

export declare type SW_SliderConfig = BaseSizer.IConfig & {
  width: number;
  height: number;
  trackWidth?: number;
  trackHeight?: number;
  input?: Slider.InputTypes;
  gap?: number;
  value?: number;
  min?: number;
  max?: number;
  easeValue?: {
    duration?: number;
    ease?: string;
  };
  valuechangeCallback: (
    newValue: number,
    oldValue: number,
    slider: Slider
  ) => void;
};

export class SW_Slider extends Slider {
  public declare scene: SW_BaseScene;

  /** Whether this widget is enabled or disabled */
  protected _isEnabled: boolean = true;

  /** Whether this widget is pressed */
  protected _isPressed = false;

  /** Whether this widget is hoverred */
  protected _isHovered = false;

  protected thumb: RoundRectangle;
  protected track: RoundRectangle;
  protected indicator: RoundRectangle;

  protected trackColorNormal: number = 0xe4dcce;
  protected trackColorHovered: number = 0xe4dcce;
  protected trackColorPressed: number = 0xdacbb8;
  protected trackColorDisabled: number = 0x0000;

  protected thumbColorNormal: number = 0xdacbb8;
  protected thumbColorHovered: number = 0xe1b67e;
  protected thumbColorPressed: number = 0xe1b67e;
  protected thumbColorDisabled: number = 0x0000;

  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    config: SW_SliderConfig
  ) {
    const trackWidth = config.trackWidth ?? config.width;
    const trackHeight = config.trackHeight ?? config.height;
    const track = scene.rexUI.add.roundRectangle(
      0,
      0,
      trackWidth,
      trackHeight,
      2
    );
    track.setFillStyle(0xe4dcce, 1);

    const indicator = scene.rexUI.add.roundRectangle(
      0,
      0,
      trackWidth,
      trackHeight,
      2
    );
    indicator.setFillStyle(track.fillColor, track.fillAlpha);

    const thumbSize = 24;
    const thumb = scene.rexUI.add.roundRectangle(
      0,
      0,
      thumbSize,
      thumbSize,
      thumbSize * 0.5
    );
    thumb.setFillStyle(0xdacbb8, 1);
    thumb.setStrokeStyle(2, 0xffffff, 1);

    const internalConfig: Slider.IConfig = config;
    internalConfig.track = track;
    internalConfig.thumb = thumb;
    internalConfig.indicator = indicator;
    // internalConfig.sizerEvents = true;

    super(scene, internalConfig);
    this.scene.add.existing(this);

    this.track = track;
    this.indicator = indicator;
    this.thumb = thumb;

    this.setPosition(x, y);
    this.updateStyle();
    this.layout();

    this.createBindings();
  }

  protected createBindings(): void {
    this.thumb.on(
      Phaser.Input.Events.POINTER_OUT,
      this.onPointerOutInternal,
      this
    );
    this.on(Phaser.Input.Events.POINTER_OUT, this.onPointerOutInternal, this);

    this.thumb.on(
      Phaser.Input.Events.POINTER_OVER,
      this.onPointerOverInternal,
      this
    );
    this.on(Phaser.Input.Events.POINTER_OVER, this.onPointerOverInternal, this);

    this.thumb.on(
      Phaser.Input.Events.POINTER_UP,
      this.onPointerUpInternal,
      this
    );
    this.on(Phaser.Input.Events.POINTER_UP, this.onPointerUpInternal, this);

    this.thumb.on(
      Phaser.Input.Events.POINTER_DOWN,
      this.onPointerDownInternal,
      this
    );
    this.on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDownInternal, this);

    this.setChildrenInteractive({ over: true });
  }

  public isEnabled(): boolean {
    return this._isEnabled;
  }

  public isPressed(): boolean {
    return this._isPressed;
  }

  public isHovered(): boolean {
    return this._isHovered;
  }

  protected onPointerOverInternal(): void {
    this._isHovered = true;
    this.updateStyle();
  }

  protected onPointerOutInternal(): void {
    this._isHovered =
      this.isPointerInBounds() || this.isPointerInBounds(this.thumb);

    this._isPressed = this._isPressed && this._isHovered;
    this.updateStyle();
  }

  protected onPointerUpInternal(): void {
    this._isPressed = false;
    this.updateStyle();
  }

  protected onPointerDownInternal(): void {
    this._isPressed = true;
    this.updateStyle();
  }

  public updateStyle(): void {
    if (!this._isEnabled) {
      this.track.setFillStyle(this.trackColorDisabled);
      this.indicator.setFillStyle(this.track.fillColor);
      this.thumb.setFillStyle(this.thumbColorDisabled);
    } else if (this._isPressed) {
      this.track.setFillStyle(this.trackColorPressed);
      this.indicator.setFillStyle(this.track.fillColor);
      this.thumb.setFillStyle(this.thumbColorPressed);
    } else if (this._isHovered) {
      this.track.setFillStyle(this.trackColorHovered);
      this.indicator.setFillStyle(this.track.fillColor);
      this.thumb.setFillStyle(this.thumbColorHovered);
    } else {
      this.track.setFillStyle(this.trackColorNormal);
      this.indicator.setFillStyle(this.track.fillColor);
      this.thumb.setFillStyle(this.thumbColorNormal);
    }
  }

  public onValueChanged(
    fn: SW_SliderValueChangeCallbackType,
    context?: any
  ): this {
    this.on('valuechange', fn, context);
    return this;
  }
}
