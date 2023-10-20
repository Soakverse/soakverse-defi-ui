import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import SW_GridTable from "~/game/widgets/SW_GridTable";
import Cell from "phaser3-rex-plugins/plugins/gameobjects/container/gridtable/table/Cell.js";
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { SW_Inventory, SW_InventoryObject } from "~/game/inventory/SW_Inventory";

export class SW_InventoryWidget extends Phaser.GameObjects.Container
{
    declare public scene: SW_BaseScene;

    /** Store the inventory of the player */
    declare public inventory: SW_Inventory;

    /** The table that show the inventory of the player */
    declare private inventoryTable: SW_GridTable;

    private selectedIndex: number = -1;
    declare private selectedNameObjectText: Phaser.GameObjects.Text;
    declare private selectedDescriptionObjectText: Phaser.GameObjects.Text;

    constructor(scene: SW_BaseScene, x: number, y: number) {
        super(scene, x, y);
        scene.add.existing(this);

        this.inventory = new SW_Inventory();

        const backgroundWidget = this.scene.add.image(0, 0, "inventoryWidgetBackground");
        this.add(backgroundWidget);

        this.createInventoryTable();

        this.selectedNameObjectText = this.scene.add.text(0, 140, "", { fontSize: "32px", color: "black "}).setOrigin(0.5);
        this.add(this.selectedNameObjectText);

        this.selectedDescriptionObjectText = this.scene.add.text(0, 160, "", { fontSize: "20px", color: "black "}).setOrigin(0.5);
        this.add(this.selectedDescriptionObjectText);
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
            items: []
        });

        this.inventoryTable.on("cell.over", (cellContainer: Label, cellIndex: number) => {
            const inventoryObjectData = this.inventoryTable.items[cellIndex];
            if (inventoryObjectData) {
                this.selectedIndex = cellIndex;

                this.selectedNameObjectText.setText(inventoryObjectData.name);
                this.selectedDescriptionObjectText.setText(inventoryObjectData.description);
            }
            else {
                this.selectedIndex = -1;
            }
        }, this);

        this.inventoryTable.on("cell.out", (cellContainer: Label, cellIndex: number) => {
            if (cellIndex == this.selectedIndex) {
                this.selectedIndex = -1;
                this.selectedNameObjectText.setText("");
                this.selectedDescriptionObjectText.setText("");
            }
        });
    }

    public updateInventory(newInventoryObjects: SW_InventoryObject[]): void
    {
        this.selectedIndex = -1;

        this.inventory.update(newInventoryObjects);
        this.showAllObjects();
    }

    private showAllObjects(): void
    {
        this.inventoryTable.setItems(this.inventory.getObjects());
    }
}