import SW_BaseScene from "~/game/scenes/SW_BaseScene";

export class SW_InventoryCounterWidget extends Phaser.GameObjects.Container
{
    declare public scene: SW_BaseScene;

    private quantity: number = 1;
    private maxQuantity: number = 99;

    private quantityText: Phaser.GameObjects.Text;

    constructor(scene: SW_BaseScene, x: number, y: number) {
        super(scene, x, y);
        scene.add.existing(this);

        const bg = this.scene.add.image(0, 0, "objectCounterBackground").setOrigin(0.5, 0);
        this.add(bg);

        const plusButton = this.scene.add.image(25, 14, "objectCounterPlusButton").setOrigin(0.5, 0);
        plusButton.setInteractive();
        plusButton.on(Phaser.Input.Events.POINTER_DOWN, this.onPlusButtonClicked, this);
        this.add(plusButton);

        const minusButton = this.scene.add.image(plusButton.x, plusButton.y + plusButton.displayHeight + 5, "objectCounterMinusButton").setOrigin(0.5, 0);
        minusButton.setInteractive();
        minusButton.on(Phaser.Input.Events.POINTER_DOWN, this.onMinusButtonClicked, this);
        this.add(minusButton);

        const moveButton = this.scene.add.image(0, bg.y + bg.displayHeight - 16, "objectCounterMoveButton").setOrigin(0.5, 1);
        moveButton.setInteractive();
        moveButton.on(Phaser.Input.Events.POINTER_DOWN, this.onMoveButtonClicked, this);
        this.add(moveButton);

        this.quantityText = this.scene.add.text(-10, 20, "1", { color: "black", fontSize: "24px", fontStyle: "bold" }).setOrigin(0.5, 0);
        this.add(this.quantityText);
    };

    public setVisible(value: boolean): this {
        this.setQuantity(1);
        return super.setVisible(value);
    }

    public setMaxQuantity(maxQuantity: number): void {
        this.maxQuantity = maxQuantity;
        this.setQuantity(this.quantity); // Force update
    }

    protected setQuantity(quantity: number): void {
        this.quantity = Phaser.Math.Clamp(quantity, 1, this.maxQuantity);
        this.quantityText.setText(`${this.quantity}`);
    }

    protected onMoveButtonClicked(): void {
        this.emit("moveClicked", this.quantity);
    }

    protected onPlusButtonClicked(): void {
        this.setQuantity(this.quantity + 1);
    }

    protected onMinusButtonClicked(): void {
        this.setQuantity(this.quantity - 1);
    }
}