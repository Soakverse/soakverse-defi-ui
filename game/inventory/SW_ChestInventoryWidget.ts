import { SW_BaseInventoryWidget } from "~/game/inventory/SW_BaseInventoryWidget";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import SW_GridTable from "~/game/widgets/SW_GridTable";
import Cell from "phaser3-rex-plugins/plugins/gameobjects/container/gridtable/table/Cell.js";
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components.js";

export class SW_ChestInventoryWidget extends SW_BaseInventoryWidget
{
    constructor(scene: SW_BaseScene, x: number, y: number) {
        super(scene, x, y);

        const backgroundWidget = this.scene.add.image(0, 0, "inventoryWidgetBackground").setScale(0.84);
        this.add(backgroundWidget);

        this.width = backgroundWidget.displayWidth;
        this.height = backgroundWidget.displayHeight;

        const titleWidget = this.scene.add.text(0, -this.displayHeight * 0.5 + 12, "CHEST", { fontSize: "22px", color: "black", fontStyle: "bold"}).setOrigin(0.5, 0);
        this.add(titleWidget);

        this.createInventoryTable();
    };

    private createInventoryTable(): void {
        
        const backgroundTable = this.scene.add.image(0, 12, "inventoryTableBackground").setScale(0.8);
        this.add(backgroundTable);

        const cellWidth = 34;
        const cellHeight = 34;
        const columns = 7;
        const tableWidth = backgroundTable.displayWidth + 12;
        const tableHeight = backgroundTable.displayHeight + 8;

        const track = this.scene.add.image(0,0, "inventorySliderLine");
        track.displayHeight = tableHeight;

        this.inventoryTable = new SW_GridTable(this.scene, {
            x: this.x + 4,
            y: this.y + backgroundTable.y,
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
            items: []
        });

        this.inventoryTable.on("cell.over", (cellContainer: Label, cellIndex: number) => {
            const inventoryObjectData = this.inventoryTable.items[cellIndex];
            if (inventoryObjectData) {
                this.selectedIndex = cellIndex;
            }
            else {
                this.selectedIndex = -1;
            }
        }, this);

        this.inventoryTable.on("cell.out", (cellContainer: Label, cellIndex: number) => {
            if (cellIndex == this.selectedIndex) {
                this.selectedIndex = -1;
            }
        });

        this.inventoryTable.on("cell.click", (cellContainer: Label, cellIndex: number) => {
            const inventoryObjectData = this.inventoryTable.items[cellIndex];
            if (inventoryObjectData) {
                this.emit("objectClicked", inventoryObjectData);
            }
        });
    }
}