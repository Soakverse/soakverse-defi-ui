import { SW_CST } from '~/game/SW_CST';
import { GridTable } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import Scrollable from 'phaser3-rex-plugins/templates/ui/utils/scrollable/Scrollable';

declare type SW_ConfigSlider = {
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

declare type SW_ConfigScroller = {
  threshold?: number;
  slidingDeceleration?: number | false;
  backDeceleration?: number | false;
  dragRate?: number;
};

declare type SW_ConfigMouseWheel = {
  focus?: boolean;
  speed?: number;
};

declare type SW_GridTableItem = { key: string };

export default class SW_GridTable<
  T extends SW_GridTableItem
> extends GridTable {
  public declare items: T[];

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

  public setItems(items?: T[] | undefined): this {
    return super.setItems(items);
  }

  public isValidIndex(index: number): boolean {
    return index >= 0 && index < this.items.length;
  }

  public findItemIndex(itemKey: string): number {
    for (let i = 0; i < this.items.length; ++i) {
      if (this.items[i].key == itemKey) {
        return i;
      }
    }
    return -1;
  }

  public addItem(item: T): void {
    Phaser.Utils.Array.Add(this.items, item);
    this.refresh();
  }

  public addItemAt(item: T, index: number): void {
    if (this.isValidIndex(index)) {
      Phaser.Utils.Array.AddAt(this.items, item, index);
    } else {
      Phaser.Utils.Array.Add(this.items, item);
    }
    this.refresh();
  }

  public removeItemAt(index: number) {
    if (this.isValidIndex(index)) {
      Phaser.Utils.Array.RemoveAt(this.items, index);
      this.refresh();
    }
  }
}
