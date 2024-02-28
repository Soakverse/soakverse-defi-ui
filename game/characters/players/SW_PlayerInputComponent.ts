import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import { SW_Player } from "./SW_Player";
import VirtualJoyStick from "phaser3-rex-plugins/plugins/virtualjoystick.js";
import { SW_CST } from "~/game/SW_CST";
import { SW_Joystick } from "~/game/UI/mobile/SW_Joystick";

declare type SW_DirectionKeys = {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
};

declare type SW_PlayerKeys = SW_DirectionKeys & {
    run: Phaser.Input.Keyboard.Key;
    interact: Phaser.Input.Keyboard.Key;
};

export class SW_PlayerInputComponent extends Phaser.Events.EventEmitter {
    protected scene: SW_BaseScene;
    protected player: SW_Player;

    protected inputKeyboard: SW_PlayerKeys | undefined;

    private joystick: SW_Joystick | undefined;
    private inputJoystick: SW_DirectionKeys | undefined;

    constructor(player: SW_Player) {
        super();

        this.player = player;
        this.scene = player.scene;

        if (SW_CST.GAME.IS_MOBILE) {
            this.createJoystickInput();
        }
        else {
            this.createDesktopInputs();
        }
    }

    protected createDesktopInputs(): void {
        if (!this.scene.input.keyboard) {
            console.warn("SW_PlayerInputComponent::createDesktopInputs - Input keyboard is invalid")
            return;
        }

        this.inputKeyboard = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            run: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            interact: Phaser.Input.Keyboard.KeyCodes.SPACE,
        }, false) as SW_PlayerKeys;
        

        this.inputKeyboard.run.on("down", this.player.startRunning, this.player);
        this.inputKeyboard.run.on("up", this.player.stopRunning, this.player);
        this.inputKeyboard.interact.on("down", this.player.interact, this.player);

        this.player.on("update", this.updateKeyboardInput, this);
    }

    protected createJoystickInput(): void {
        this.joystick = new SW_Joystick(this.scene, 0, 0);

        this.inputJoystick = this.joystick.createCursorKeys();
        this.joystick.setVisible(false);

        this.player.on("update", this.updateJoystickInput, this);
    }

    protected updateKeyboardInput(): void {
        if (!this.inputKeyboard) {
            console.warn("SW_PlayerInputComponent::updateKeyboardInput - InputKeyboard is invalid")
            return;
        }

        this.updateDirectionInput(this.inputKeyboard);
    }

    protected updateJoystickInput(): void {
        if (!this.inputJoystick) {
            console.warn("SW_PlayerInputComponent::updateJoystickInput - InputJoystick is invalid")
            return;
        }

        this.updateDirectionInput(this.inputJoystick);
    }

    protected updateDirectionInput(directionKeys: SW_DirectionKeys): void {
        if (directionKeys.up.isDown) {
            if (directionKeys.right.isDown) {
              this.player.walkUpRight();
            }
            else if (directionKeys.left.isDown) {
              this.player.walkUpLeft();
            }
            else {
              this.player.walkUp();
            }
        }
        else if (directionKeys.down.isDown) {
            if (directionKeys.right.isDown) {
              this.player.walkDownRight();
            }
            else if (directionKeys.left.isDown) {
              this.player.walkDownLeft();
            }
            else {
              this.player.walkDown();
            }
        }
        else if (directionKeys.right.isDown) {
            this.player.walkOnRight();
          }
          else if (directionKeys.left.isDown) {
            this.player.walkOnLeft();
          }
          else {
            this.player.stopWalking();
        }
    }
}