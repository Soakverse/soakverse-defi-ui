import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import SW_GridTable from "~/game/widgets/SW_GridTable";
import Cell from "phaser3-rex-plugins/plugins/gameobjects/container/gridtable/table/Cell.js";
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components.js";

export class SW_InventoryWidget extends Phaser.GameObjects.Container
{
    declare public scene: SW_BaseScene;

    declare protected inventoryTable: SW_GridTable;

    constructor(scene: SW_BaseScene, x: number, y: number) {
        super(scene, x, y);
        scene.add.existing(this);

        const backgroundWidget = this.scene.add.image(0, 0, "inventoryWidgetBackground");
        this.add(backgroundWidget);

        this.createInventoryTable();
    };

    public setVisible(value: boolean): this {
        if (this.inventoryTable) {
            this.inventoryTable.setVisible(value);
        }
        return super.setVisible(value);
    }

    private createInventoryTable(): void {
        const backgroundTable = this.scene.add.image(0, 0, "inventoryTableBackground");
        this.add(backgroundTable);

        const cellWidth = 48;
        const cellHeight = 48;
        const columns = 6;
        const tableWidth = 321;
        const tableHeight = 362;

        const track = this.scene.add.image(0,0, "inventorySliderLine");
        track.displayHeight = tableHeight;

        this.inventoryTable = new SW_GridTable(this.scene, {
            x: this.x,
            y: this.y,
            width: tableWidth,
            height: tableHeight,
            table: {
                cellWidth: cellWidth,
                cellHeight: cellHeight,
                columns: columns,
                mask: {
                    padding: 2,
                },
            },
            slider: {
                position: "right",
                track: track,
                thumb: this.scene.add.image(0,0, "inventorySlider").setFlipX(false),
                hideUnscrollableSlider: true
            },
            createCellContainerCallback: (cell: Cell, cellContainer: Label | null) => {
                cell.setCellContainerAlign(Phaser.Display.Align.CENTER);
                const inventoryItem = cell.item;

                if (cellContainer == null)
                {
                    const background = this.scene.add.image(0,0, "inventorySlot").setDisplaySize(cellWidth - 3, cellHeight - 3);
                    const icon = this.scene.add.image(0, 0, "inventoryItems", inventoryItem.image);

                    if (icon) {
                        icon.setDisplaySize(background.displayWidth, background.displayHeight);
                    }

                    cellContainer = this.scene.rexUI.add.label({
                        width: background.displayWidth,
                        height: background.displayHeight,
                        background: background,
                        icon: icon
                    });
                }

                cellContainer.setDepth(this.depth);
                return cellContainer;
            },
            items: [{ image: "axeRed" },{ image: "axeRed" },{ image: "swordBlue" },{ image: "shieldBlue" },]
        });
    }
}