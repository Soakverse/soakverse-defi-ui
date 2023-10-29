import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import SW_GridTable from "~/game/widgets/SW_GridTable";
import { SW_Inventory, SW_InventoryObject } from "~/game/inventory/SW_Inventory";

export class SW_BaseInventoryWidget extends Phaser.GameObjects.Container
{
    declare public scene: SW_BaseScene;

    /** Store the inventory of the player */
    declare public inventory: SW_Inventory;

    /** The table that show the inventory of the player */
    declare protected inventoryTable: SW_GridTable;

    protected selectedIndex: number = -1;

    constructor(scene: SW_BaseScene, x: number, y: number) {
        super(scene, x, y);
        scene.add.existing(this);

        this.inventory = new SW_Inventory();
    };

    public setX(value?: number | undefined): this {
        if (this.inventoryTable) {
            this.inventoryTable.setX(value);
        }
        return super.setX(value);
    }

    public setY(value?: number | undefined): this {
        if (this.inventoryTable) {
            this.inventoryTable.setY(value);
        }
        return super.setY(value);
    }

    public setPosition(x?: number | undefined, y?: number | undefined, z?: number | undefined, w?: number | undefined): this {
        if (this.inventoryTable) {
            this.inventoryTable.setPosition(x,y,z,w);
        }
        return super.setPosition(x,y,z,w);
    }

    public setVisible(value: boolean): this {
        if (this.inventoryTable) {
            this.inventoryTable.setVisible(value);
        }
        return super.setVisible(value);
    }

    public updateInventory(newInventoryObjects: SW_InventoryObject[]): void
    {
        this.selectedIndex = -1;

        this.inventory.update(newInventoryObjects);
        this.showAllObjects();
    }

    protected showAllObjects(): void
    {
        if (this.inventoryTable) {
            this.inventoryTable.setItems(this.inventory.getObjects());
        }
    }

    public addObject(object: any): void {
        this.inventoryTable.addObject(object);
    }

    public insertObject(object: any, index: number): void {
        this.inventoryTable.addObjectAt(object, index);
    }

    public removeObjectAt(index: number): void {
        this.inventoryTable.removeObjectAt(index);
    }
}