import { SW_Character as SW_Character } from "~/game/characters/SW_Character";

export declare type SW_DIRECTION = "Up" | "Down" | "Right" | "Left" | "UpLeft" | "DownLeft" | "UpRight" | "DownRight";

export class SW_DIRECTIONS {
    public static Down: SW_DIRECTION = "Down";
    public static DownLeft: SW_DIRECTION = "DownLeft";
    public static Left: SW_DIRECTION = "Left";
    public static UpLeft: SW_DIRECTION = "UpLeft";
    public static Up: SW_DIRECTION = "Up";
    public static UpRight: SW_DIRECTION = "UpRight";
    public static Right: SW_DIRECTION = "Right";
    public static DownRight: SW_DIRECTION = "DownRight";
}

export class SW_DIRECTIONS_NO_DIAGONALE
{
    public static Down: SW_DIRECTION = "Down";
    public static Left: SW_DIRECTION = "Left";
    public static Right: SW_DIRECTION = "Right";
    public static Up: SW_DIRECTION = "Up";
}


export class SW_CharacterMovementComponent {
    /** Character who owns this movement component */
    protected owner: SW_Character;

    /** The physic body of the owner */
    protected ownerBody: Phaser.Physics.Arcade.Body;

    /** Walk speed */
    protected walkSpeed: number = 160;

    /** Walk speed */
    protected runSpeed: number = 250;

    constructor(owner: SW_Character) {
        this.owner = owner;
        this.ownerBody = owner.body as Phaser.Physics.Arcade.Body;
    }

    public destroy(): void {
    }

    // Init
    ////////////////////////////////////////////////////////////////////////

    public init(walkSpeed?: number, runSpeed?: number): void {
        this.walkSpeed = walkSpeed ?? 0;
        this.runSpeed = runSpeed ?? this.walkSpeed;
    }

    // Update
    ////////////////////////////////////////////////////////////////////////

    /** Move the character to the top */
    public walkUp(): void {
        const speed = this.owner.wantsToRun() ? this.runSpeed : this.walkSpeed;
        this.walk(0, -speed);
        this.owner.setDirection(SW_DIRECTIONS.Up);
    }

    /** Move the character to the bottom */
    public walkDown(): void {
        const speed = this.owner.wantsToRun() ? this.runSpeed : this.walkSpeed;
        this.walk(0, speed);
        this.owner.setDirection(SW_DIRECTIONS.Down);
    }

    /** Move the character to the left */
    public walkOnLeft(): void {
        const speed = this.owner.wantsToRun() ? this.runSpeed : this.walkSpeed;
        this.walk(-speed, 0);
        this.owner.setDirection(SW_DIRECTIONS.Left);
    }

    /** Move the character to the right */
    public walkOnRight(): void {
        const speed = this.owner.wantsToRun() ? this.runSpeed : this.walkSpeed;
        this.walk(speed, 0);
        this.owner.setDirection(SW_DIRECTIONS.Right);
    }

    /** Move the character to the top left */
    public walkUpLeft(): void {
        const speed = this.owner.wantsToRun() ? this.runSpeed : this.walkSpeed;
        this.walk(-speed, -speed);
        this.owner.setDirection(SW_DIRECTIONS.UpLeft);
    }

    /** Move the character to the top right */
    public walkUpRight(): void {
        const speed = this.owner.wantsToRun() ? this.runSpeed : this.walkSpeed;
        this.walk(speed, -speed);
        this.owner.setDirection(SW_DIRECTIONS.UpRight);
    }

     /** Move the character to the bottom left */
    public walkDownLeft(): void {
        const speed = this.owner.wantsToRun() ? this.runSpeed : this.walkSpeed;
        this.walk(-speed, speed);
        this.owner.setDirection(SW_DIRECTIONS.DownLeft);
    }

    /** Move the character to the bottom right */
    public walkDownRight(): void {
        const speed = this.owner.wantsToRun() ? this.runSpeed : this.walkSpeed;
        this.walk(speed, speed);
        this.owner.setDirection(SW_DIRECTIONS.DownRight);
    }

    /** Move the character giving a XY-velocity */
    public walk(x: number, y: number): void {
        const speed = this.owner.wantsToRun() ? this.runSpeed : this.walkSpeed;
        this.owner.setVelocity(x,y);
        this.ownerBody.velocity.normalize().scale(speed);
    }

    /** Stop all character movements */
    public stopWalking(): void {
        this.owner.setVelocity(0,0);
    }

    protected startRunning(): void {
        this.owner.startRunning();
    }

    protected stopRunning(): void {
        this.owner.stopRunning();
    }
}