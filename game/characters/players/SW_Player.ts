import Phaser from "phaser";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import { SW_Character } from "~/game/characters/SW_Character";
import { SW_DIRECTIONS, SW_DIRECTIONS_NO_DIAGONALE } from "~/game/characters/SW_CharacterMovementComponent";
import { SW_SpawnData } from "~/game/characters/SW_CharacterSpawner";
import { SW_InteractionComponent } from "~/game/characters/players/SW_InteractionComponent";

declare type SW_PlayerKeys = {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    run: Phaser.Input.Keyboard.Key;
    interact: Phaser.Input.Keyboard.Key;
}

export class SW_Player extends SW_Character {
    /** Keys to control the player */
    declare protected keys: SW_PlayerKeys;

    declare public body: Phaser.Physics.Arcade.Body;

    /** How far a player can interact with entities around them */
    protected interactionRange: number = 30;

    /** Component used to interact with interactable entities */
    declare protected interactableComp: SW_InteractionComponent;

    constructor(scene: SW_BaseScene, x: number, y: number) {
        super(scene, x, y);
    }

    // Init
    ////////////////////////////////////////////////////////////////////////

    public init(spawnData: SW_SpawnData): void {
        this.setName(spawnData.name);
        this.initAnimations((spawnData.characterTexture.length > 0) ? spawnData.characterTexture : "player");
        this.setDirection(spawnData.startDirection);

        this.characterMovementComponent.init(spawnData.walkSpeed, spawnData.runSpeed);

        this.body.setSize(28, 46);
        this.body.setOffset(17, 4);
        this.body.setCollideWorldBounds(true);

        this.initIniteractableComp();
        this.initKeys();
    }

    protected initIniteractableComp(): void {
        this.interactableComp = new SW_InteractionComponent(this, this.x, this.y, this.interactionRange, this.interactionRange);
        this.interactableComp.body.setAllowGravity(false);
    }

    public getInteractableComp(): SW_InteractionComponent
    {
        return this.interactableComp;
    }

    public getInteractionRange(): number {
        return this.interactionRange;
    }

    protected initKeys(): void {
        if (this.scene.input.keyboard) {
            this.keys = this.scene.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                run: Phaser.Input.Keyboard.KeyCodes.SHIFT,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D,
                interact: Phaser.Input.Keyboard.KeyCodes.L
            }, false) as SW_PlayerKeys;

            this.keys.run.on("down", this.startRunning, this);
            this.keys.run.on("up", this.stopRunning, this);
            this.keys.interact.on("down", this.interact, this);
        }
    }

    protected initAnimations(texture: string): void {
        this.setTexture(texture);

        const directions = Object.keys(SW_DIRECTIONS_NO_DIAGONALE);
        for (let i = 0; i < directions.length; ++i) {
            const direction = directions[i];
            this.anims.create({
                key: `Idle${direction}`,
                frames: this.anims.generateFrameNumbers(texture, { start: i * 4, end: i * 4 }),
                frameRate: 1,
                repeat: 0
            });

            this.anims.create({
                key: `Walk${direction}`,
                frames: this.anims.generateFrameNumbers(texture, { start: i * 4, end: (i + 1) * 4 - 1 }),
                frameRate: 6,
                repeat: -1
            });
        }    
    }

    // Update
    ////////////////////////////////////////////////////////////////////////

    public postUpdate(): void
    {
        super.postUpdate();
        
        this.interactableComp.update();
    }

    protected updateControls(): void {
        if (this.keys.up.isDown) {
            this.walkUp();
        }
        else if (this.keys.down.isDown) {
            this.walkDown();
        }
        else if (this.keys.right.isDown) {
            this.walkOnRight();
        }
        else if (this.keys.left.isDown) {
            this.walkOnLeft();
        }
        else {
            this.stopWalking();
        }
    }

    protected updateAnimations(): void {
        if (this.isWalking) {
            this.anims.play(`Walk${this.currentDirection}`, true);
        }
        else {
            this.anims.play(`Idle${this.currentDirection}`, true);
        }
    }

    protected interact(): void {
        this.interactableComp.interact();
    }
}