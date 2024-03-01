import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import SW_GridTable from '~/game/widgets/SW_GridTable';
import {
  SW_Inventory,
  SW_InventoryObject,
} from '~/game/inventory/SW_Inventory';

export class SW_BaseInventoryWidget extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;

  /** Store the inventory of the player */
  public declare inventory: SW_Inventory;

  /** The table that show the inventory of the player */
  protected declare inventoryTable: SW_GridTable;

  protected selectedIndex: number = -1;

  constructor(scene: SW_BaseScene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);

    this.inventory = new SW_Inventory();
  }

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

  public setPosition(
    x?: number | undefined,
    y?: number | undefined,
    z?: number | undefined,
    w?: number | undefined
  ): this {
    if (this.inventoryTable) {
      this.inventoryTable.setPosition(x, y, z, w);
    }
    return super.setPosition(x, y, z, w);
  }

  public setVisible(value: boolean): this {
    if (this.inventoryTable) {
      this.inventoryTable.setVisible(value);
    }
    return super.setVisible(value);
  }

  public updateInventory(newInventoryObjects: SW_InventoryObject[]): void {
    this.selectedIndex = -1;

    this.inventory.update(newInventoryObjects);
    this.showAllObjects();
  }

  protected showAllObjects(): void {
    if (this.inventoryTable) {
      this.inventoryTable.setItems(this.inventory.getObjects());
    }
  }

  public addObjectAt(
    object: SW_InventoryObject,
    quantity: number,
    index: number
  ): void {
    if (this.inventoryTable.isValidIndex(index)) {
      this.inventoryTable.items[index].quantity += quantity;
      this.inventoryTable.refresh();

      console.log('add existing', quantity, this.inventoryTable.items);
    } else {
      const newObject = Phaser.Utils.Objects.Clone(
        object
      ) as SW_InventoryObject;
      newObject.quantity = quantity;
      this.inventoryTable.addObject(newObject);
    }
  }

  public addObject(object: SW_InventoryObject, quantity: number): void {
    const index = this.inventoryTable.findObjectIndex(object.id);
    this.addObjectAt(object, quantity, index);
  }

  public removeObjectAt(index: number, quantity?: number): void {
    if (this.inventoryTable.isValidIndex(index)) {
      if (quantity && quantity < this.inventoryTable.items[index].quantity) {
        this.inventoryTable.items[index].quantity -= quantity;
        this.inventoryTable.refresh();

        console.log(
          'remove',
          quantity,
          'new quantity:',
          this.inventoryTable.items[index].quantity,
          this.inventoryTable.items
        );
      } else {
        this.inventoryTable.removeObjectAt(index);
      }
    }
  }

  public removeObjectById(objectId: string, quantity?: number): void {
    const index = this.inventoryTable.findObjectIndex(objectId);
    this.removeObjectAt(index, quantity);
  }

  public removeObject(object: SW_InventoryObject, quantity?: number): void {
    this.removeObjectById(object.id, quantity);
  }
}
