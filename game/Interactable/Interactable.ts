import { SW_Player } from "~/game/characters/players/SW_Player";

export interface SW_IInteractable extends Phaser.GameObjects.Components.Transform
{
    onInteract(source: SW_Player): void;
}