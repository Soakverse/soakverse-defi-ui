import { SW_IInteractable } from "~/game/Interactable/Interactable";
import { SW_DIRECTIONS } from "~/game/characters/SW_CharacterMovementComponent";
import { SW_Player,  } from "~/game/characters/players/SW_Player";

export class SW_InteractionComponent extends Phaser.GameObjects.Zone
{
    declare public body: Phaser.Physics.Arcade.Body; 

    /** Player who owns this component */
    protected _owner: SW_Player;

    /** Map of all entities that this component can interact with */
    protected currentFocus: (SW_IInteractable & Phaser.GameObjects.Components.Transform) | undefined;

    constructor(owner: SW_Player, x: number, y: number, width?: number, height?: number)
    {
        super(owner.scene, x, y, width, height);
        this.setOrigin(0, 0);
        this.scene.physics.add.existing(this);

        this._owner = owner;
    }

    public get owner(): SW_Player
    {
        return this._owner;
    }

    public update(): void
    {
        this.updatePosition();
        
        // @ts-ignore
        if (this.currentFocus && !this.scene.physics.overlap(this.currentFocus, this))
        {
            this.currentFocus = undefined;
        }
    }

    protected updatePosition(): void
    {
        const ownerBody = (this._owner.body as Phaser.Physics.Arcade.Body);

        let compX = this.x;
        let compY = this.y;
        let compWidth = ownerBody.width;
        let compHeight = ownerBody.height;

        const offsetX = -1;
        const offsetY = 8;

        const offsetDiagX = 10;
        const offsetDiagY = 10;

        switch (this._owner.getCurrentDirection())
        {
            case SW_DIRECTIONS.UpRight:
                compHeight = this._owner.getInteractionRange();
                compX = ownerBody.x + ownerBody.width - offsetDiagX;
                compY = ownerBody.y - compHeight + offsetDiagY;
                break;

            case SW_DIRECTIONS.UpLeft:
                compHeight = this._owner.getInteractionRange();
                compX = ownerBody.x - ownerBody.width + offsetDiagX;
                compY = ownerBody.y - compHeight + offsetDiagY;
                break;

            case SW_DIRECTIONS.DownRight:
                compHeight = this._owner.getInteractionRange();
                compX = ownerBody.x + ownerBody.width - offsetDiagX;
                compY = ownerBody.y + compHeight + offsetDiagY;
                break;

            case SW_DIRECTIONS.DownLeft:
                compHeight = this._owner.getInteractionRange();
                compX = ownerBody.x - ownerBody.width + offsetDiagX;
                compY = ownerBody.y + compHeight + offsetDiagY;
                break;

            case SW_DIRECTIONS.Left:
                compWidth = this._owner.getInteractionRange();
                compX = ownerBody.x - compWidth;
                compY = ownerBody.y + offsetY;
                break;

            case SW_DIRECTIONS.Right:
                compWidth = this._owner.getInteractionRange();
                compX = ownerBody.x + ownerBody.width;
                compY = ownerBody.y + offsetY;
                break;

            case SW_DIRECTIONS.Up:
                compHeight = this._owner.getInteractionRange();
                compX = ownerBody.x + offsetX;
                compY = ownerBody.y - compHeight;
                break;

            case SW_DIRECTIONS.Down:
                compHeight = this._owner.getInteractionRange();
                compX = ownerBody.x + offsetX;
                compY = ownerBody.y + ownerBody.height;
                break; 
            default:
                console.error("Player.updateInteractionComponent: Invalid direction!");
                break;
        }

        this.setPosition(compX, compY);
        const interactableCompBody = this.body as Phaser.Physics.Arcade.Body;
        interactableCompBody.setSize(compWidth, compHeight);
    }

    public interact(): void
    {
        if (this.currentFocus)
        {
            this.currentFocus.onInteract(this._owner);
        }
    }

    public onInteractableOverlapped(interactable: SW_IInteractable & Phaser.GameObjects.Components.Transform): void
    {
        if (!this.currentFocus)
        {
            this.currentFocus = interactable
        }
        else
        {
            const distPlayerInteractable = Math.abs(this.x - interactable.x) + Math.abs(this.y - interactable.y);
            const distPlayerCurrentFocus = Math.abs(this.x - this.currentFocus.x) + Math.abs(this.y - this.currentFocus.y);

            if (distPlayerInteractable < distPlayerCurrentFocus)
            {
                this.currentFocus = interactable;
            }
        }
    }
}