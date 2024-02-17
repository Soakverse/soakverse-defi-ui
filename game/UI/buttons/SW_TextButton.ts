import { SW_CST } from "~/game/SW_CST";

export declare type SW_TextButtonStyle = {
    texturePressed?: string;
    textureHovered?: string;
    textureNormal?: string;
    textureDisabled?: string;
    textOffsetNormalY?: number;
    textOffsetHoveredY?: number;
    textOffsetPressedY?: number;
    pixelPerfect?: boolean;
}

export class SW_TextButton extends Phaser.GameObjects.Container {
    protected _isEnabled: boolean = true;

    /** Whether this button is currently pressed */
    protected isPressed = false;

    /** Whether this button is hoverred */
    protected isHovered = false;

    protected textOffsetNormalY: number;
    protected textOffsetHoveredY: number;
    protected textOffsetPressedY: number;

    protected buttonText: Phaser.GameObjects.Text;
    protected buttonImage: Phaser.GameObjects.Image;

    protected textureNormal: string;
    protected texturePressed: string;
    protected textureHovered: string;
    protected textureDisabled: string;

    constructor(scene: Phaser.Scene, x: number, y: number, text: string, style?: SW_TextButtonStyle) {
        super(scene, x, y);
        scene.add.existing(this);

        this.textureNormal = (style && style.textureNormal) ? style.textureNormal : "menuButtonNormal";
        this.texturePressed = (style && style.texturePressed) ? style.texturePressed : "menuButtonPressed";
        this.textureHovered = (style && style.textureHovered) ? style.textureHovered : "menuButtonNormal";
        this.textureDisabled = (style && style.textureDisabled) ? style.textureDisabled : "menuButtonNormal";

        this.textOffsetNormalY = (style && (style.textOffsetNormalY !== undefined)) ? style.textOffsetNormalY : 0;
        this.textOffsetHoveredY = (style && (style.textOffsetHoveredY !== undefined)) ? style.textOffsetHoveredY : 0;
        this.textOffsetPressedY = (style && (style.textOffsetPressedY !== undefined)) ? style.textOffsetPressedY : 1;

        this.buttonImage = this.scene.add.image(0, 0, this.textureNormal);
        this.buttonImage.setOrigin(0.5);
        this.width = this.buttonImage.displayWidth;
        this.height = this.buttonImage.displayHeight;
        this.add(this.buttonImage);

        this.buttonText = this.scene.add.text(0, 0, text, { fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY, fontSize: "19px", color: SW_CST.STYLE.COLOR.LIGHT_GREY, stroke: SW_CST.STYLE.COLOR.BLACK, strokeThickness: 3, align: "center" });
        this.buttonText.setOrigin(0.5);
        this.add(this.buttonText);
        this.updateTextPosition();

        this.buttonImage.setInteractive({
            hitArea: new Phaser.Geom.Rectangle(0, 0, this.displayWidth, this.displayHeight),
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            pixelPerfect: style ? style.pixelPerfect : true,
            cursor: "url(assets/cursors/icono-selectedstatic.cur), pointer"
        });

        // Behaviors
        this.buttonImage.on(Phaser.Input.Events.POINTER_OVER, () => {
            if (this._isEnabled)
            {
                this.isHovered = true;
                this.isPressed = false;

                this.buttonImage.setTexture(this.textureHovered);
                this.updateTextPosition();
            }
        }, this);

        this.buttonImage.on(Phaser.Input.Events.POINTER_OUT, () => {
            this.isPressed = false;
            this.isHovered = false;

            if (this._isEnabled)
            {
                this.buttonImage.setTexture(this.textureNormal);
                this.updateTextPosition();
            }
        }, this);

        this.buttonImage.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this._isEnabled)
            {
                this.isPressed = true;
                this.isHovered = false;
                
                this.buttonImage.setTexture(this.texturePressed);
                this.updateTextPosition();
            }
        }, this);

        this.buttonImage.on(Phaser.Input.Events.POINTER_UP, () => {
            if (this._isEnabled)
            {
                this.isPressed = false;
                this.isHovered = true;

                this.buttonImage.setTexture(this.textureHovered);
                this.updateTextPosition();
            }
        }, this);
    }

    private updateTextPosition(): void
    {
        const offsetY = this._isEnabled ? (this.isPressed ? this.textOffsetPressedY : (this.isHovered ? this.textOffsetHoveredY : this.textOffsetNormalY)) : this.textOffsetNormalY;
        this.buttonText.setY(offsetY);
    }

    public onClicked(fn: Function, context?: any) : this
    {
        this.buttonImage.on(Phaser.Input.Events.POINTER_UP, fn, context);
        return this;
    }

    public onHovered(fn: Function, context?: any) : this
    {
        this.buttonImage.on(Phaser.Input.Events.POINTER_OVER, fn, context);
        return this;
    }

    public onPointerOut(fn: Function, context?: any) : this
    {
        this.buttonImage.on(Phaser.Input.Events.POINTER_OUT, fn, context);
        return this;
    }

    public setEnabled(value: boolean): void
    {
        this._isEnabled = value;

        if (this._isEnabled)
        {
            this.buttonImage.setInteractive();
            this.buttonImage.setTexture(this.textureNormal);
        }
        else
        {
            this.buttonImage.disableInteractive();
            this.buttonImage.setTexture(this.textureDisabled);
        }
    }

    public isEnabled(): boolean
    {
        return this._isEnabled;
    }
}