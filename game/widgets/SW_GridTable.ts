import { SW_CST } from '~/game/SW_CST';
import { GridTable } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import Scrollable from 'phaser3-rex-plugins/templates/ui/utils/scrollable/Scrollable';
import { SW_InventoryObject } from '~/game/inventory/SW_Inventory';

declare type ConfigSlider = {
  background?: Phaser.GameObjects.GameObject;
  track?: Phaser.GameObjects.GameObject;
  thumb?: Phaser.GameObjects.GameObject;
  input?: Scrollable.SliderInputTypes;
  position?: Scrollable.SliderPositionTypes;

  hideUnscrollableSlider?: boolean;
  adaptThumbSize?: boolean;
  minThumbSize?: number;

  buttons?: {
    top?: Phaser.GameObjects.GameObject;
    bottom?: Phaser.GameObjects.GameObject;
    left?: Phaser.GameObjects.GameObject;
    right?: Phaser.GameObjects.GameObject;
    step?: number;
  };
};

declare type ConfigScroller = {
  threshold?: number;
  slidingDeceleration?: number | false;
  backDeceleration?: number | false;
  dragRate?: number;
};

declare type ConfigMouseWheel = {
  focus?: boolean;
  speed?: number;
};

export default class SW_GridTable extends GridTable {
  public declare items: SW_InventoryObject[];

  constructor(scene: Phaser.Scene, config: GridTable.IConfig) {
    if (config.table == undefined) {
      config.table = {
        cellWidth: 48,
        cellHeight: 48,
        columns: 6,
        mask: { padding: 2 },
      };
    }

    if (config.space == undefined) {
      config.space = { left: 16, right: -8, top: 12, bottom: 12 };
    }

    if (config.scroller == undefined) {
      config.scroller = { threshold: 0 };
    }

    if (config.mouseWheelScroller == undefined) {
      config.mouseWheelScroller = {
        focus: true,
        speed: 0.5,
      };
    }

    super(scene, config);
    this.scene.add.existing(this);

    this.layout();
  }

  public setItems(items?: SW_InventoryObject[] | undefined): this {
    return super.setItems(items);
  }

  public isValidIndex(index: number): boolean {
    return index >= 0 && index < this.items.length;
  }

  public findObjectIndex(objectId: string): number {
    for (let i = 0; i < this.items.length; ++i) {
      if (this.items[i].id == objectId) {
        return i;
      }
    }
    return -1;
  }

  public addObject(object: SW_InventoryObject): void {
    Phaser.Utils.Array.Add(this.items, object);
    this.refresh();
  }

  public addObjectAt(object: SW_InventoryObject, index: number): void {
    if (this.isValidIndex(index)) {
      Phaser.Utils.Array.AddAt(this.items, object, index);
    } else {
      Phaser.Utils.Array.Add(this.items, object);
    }
    this.refresh();
  }

  public removeObjectAt(index: number) {
    if (this.isValidIndex(index)) {
      Phaser.Utils.Array.RemoveAt(this.items, index);
      this.refresh();
    }
  }
}
