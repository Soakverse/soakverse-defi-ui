export const SW_ENUM_IVENTORY_OBJECT = {
    WEAPON: 0,
    ITEMS: 1,
    RUNES: 2
}

export declare type SW_InventoryObject = {
    id: string,
    name: string,
    description: string,
    image: string,
    type: number,
    quantity: number
}

export class SW_Inventory {
    /** All objects regardless of their types */
    private objects: SW_InventoryObject[] = [];

    /** All weapons */
    private weapons: SW_InventoryObject[] = [];

    /** All items */
    private items: SW_InventoryObject[] = [];

    /** All runes */
    private runes: SW_InventoryObject[] = [];

    constructor(objects: SW_InventoryObject[] = []) {
        this.update(objects);
    }

    public update(objects: SW_InventoryObject[]): void {
        this.objects = objects;
        this.weapons = [];
        this.items = [];
        this.runes = [];

        for (const object of this.objects)
        {
            switch(object.type)
            {
                case SW_ENUM_IVENTORY_OBJECT.WEAPON:
                    this.weapons.push(object);
                    break;

                case SW_ENUM_IVENTORY_OBJECT.ITEMS:
                    this.items.push(object);
                    break;

                case SW_ENUM_IVENTORY_OBJECT.RUNES:
                    this.runes.push(object);
                    break;

                default:
                    break;
            }
        }
    }

    public getObjects(): SW_InventoryObject[] {
        return this.objects;
    }

    public getItems(): SW_InventoryObject[] {
        return this.items;
    }

    public getRunes(): SW_InventoryObject[] {
        return this.runes;
    }

    public getSpecialObjects(): SW_InventoryObject[] {
        return this.weapons;
    }
}