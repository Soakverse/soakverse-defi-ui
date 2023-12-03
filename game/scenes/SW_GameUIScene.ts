import { SW_CST } from "~/game/SW_CST";
import SW_BaseScene from "~/game/scenes/SW_BaseScene";
import { SW_ENUM_IVENTORY_OBJECT, SW_InventoryObject } from "~/game/inventory/SW_Inventory";
import { SW_PlayerInventoryWidget } from "~/game/inventory/SW_PlayerInventoryWidget";
import { SW_ChestInventoryWidget } from "~/game/inventory/SW_ChestInventoryWidget";
import { SW_DialogueBox } from "~/game/dialogues/SW_DialogueBox";

declare type SW_UIKeys = {
    escape: Phaser.Input.Keyboard.Key;
    space: Phaser.Input.Keyboard.Key;
    nextPage: Phaser.Input.Keyboard.Key;
}

export default class SW_GameUIScene extends SW_BaseScene {
    /** Keys to handle the menus */
    declare protected keys: SW_UIKeys;

    declare private dialogueBox: SW_DialogueBox;
    declare private dialogueCharactersLeft: Phaser.GameObjects.Image;
    declare private dialogueCharactersRight: Phaser.GameObjects.Image;

    declare private playerInventoryWidget: SW_PlayerInventoryWidget;
    declare private chestInventoryWidget: SW_ChestInventoryWidget;

    constructor() {
      super({ key: SW_CST.SCENES.GAME_UI });
    }

    // Create
    ////////////////////////////////////////////////////////////////////////

    public create(): void{
        this.createKeys();
        this.createDialogueBox();

        this.playerInventoryWidget = new SW_PlayerInventoryWidget(this, this.scale.displaySize.width * 0.25, 240);
        this.playerInventoryWidget.setVisible(false);
        this.playerInventoryWidget.on("moveObject", this.onMovePlayerInventoryMoveObject, this);

        this.chestInventoryWidget = new SW_ChestInventoryWidget(this, 0, 240);
        this.chestInventoryWidget.setX(this.scale.displaySize.width * 0.66 - this.chestInventoryWidget.width * 0.25);
        this.chestInventoryWidget.setVisible(false);
        this.chestInventoryWidget.on("objectClicked", this.onMoveChestInventoryObject, this);

    this.updatePlayerInventory([
        {name: "Red Axe", id: "object1", description: "A badass axe!", image: "axeRed", type: SW_ENUM_IVENTORY_OBJECT.WEAPON, quantity: 1},
        {name: "Blue Sword", id: "object2", description: "A nice sword", image: "swordBlue", type: SW_ENUM_IVENTORY_OBJECT.ITEMS, quantity: 1},
        {name: "Blue Shield", id: "object3",  description: "A strong shield", image: "shieldBlue", type: SW_ENUM_IVENTORY_OBJECT.RUNES, quantity: 13},
        {name: "Blue Ring", id: "object4", description: "Fits your hand well!", image: "ringBlue", type: SW_ENUM_IVENTORY_OBJECT.WEAPON, quantity: 3},
        {name: "Red Shield", id: "object5", description: "This shield is strong like a rock", image: "shieldRed", type: SW_ENUM_IVENTORY_OBJECT.ITEMS, quantity: 1},
        {name: "Red Sword", id: "object6", description: "Fear this sword!", image: "swordRed", type: SW_ENUM_IVENTORY_OBJECT.RUNES, quantity: 10},
        {name: "Red Sword", id: "object7", description: "Fear this sword!", image: "swordRed", type: SW_ENUM_IVENTORY_OBJECT.RUNES, quantity: 1},
        {name: "Red Sword", id: "object8", description: "Fear this sword!", image: "swordRed", type: SW_ENUM_IVENTORY_OBJECT.RUNES, quantity: 41},
        {name: "Red Sword", id: "object9", description: "Fear this sword!", image: "swordRed", type: SW_ENUM_IVENTORY_OBJECT.RUNES, quantity: 1},
      ]);
  
      this.updateChestInventory([
        {name: "Red Sword", id: "object10", description: "Fear this sword!", image: "swordBlue", type: SW_ENUM_IVENTORY_OBJECT.RUNES, quantity: 1},
        {name: "Red Sword", id: "object11", description: "Fear this sword!", image: "swordRed", type: SW_ENUM_IVENTORY_OBJECT.RUNES, quantity: 3},
        {name: "Red Sword", id: "object12", description: "Fear this sword!", image: "swordRed", type: SW_ENUM_IVENTORY_OBJECT.RUNES, quantity: 5},
      ]);
    }

    protected onMovePlayerInventoryMoveObject(inventoryObjectData: SW_InventoryObject, quantity: number): void {
        if (this.chestInventoryWidget.visible) {
            this.playerInventoryWidget.removeObject(inventoryObjectData, quantity);
            this.chestInventoryWidget.addObject(inventoryObjectData, quantity);
        }
    }

    protected onMoveChestInventoryObject(objectIndex: number, inventoryObjectData: SW_InventoryObject): void {
        // TODO: Do same logic as player inventory
        // if (this.chestInventoryWidget.visible) {
        //     this.chestInventoryWidget.removeObjectAt(objectIndex);
        //     this.playerInventoryWidget.addObject(inventoryObjectData);
        // }
    }

    protected createKeys(): void {
        if (this.input.keyboard) {
            this.keys = this.input.keyboard.addKeys({
                escape: Phaser.Input.Keyboard.KeyCodes.ESC,
                space: Phaser.Input.Keyboard.KeyCodes.SPACE,
                nextPage: Phaser.Input.Keyboard.KeyCodes.ENTER,
            }, false) as SW_UIKeys;

            this.keys.escape.on("down", this.toggleMenus, this);
            this.keys.space.on("down", this.onNextPageButtonDown, this);
            this.keys.nextPage.on("down", this.onNextPageButtonDown, this);
        }
    }

    protected onEscapeButtonDown(): void {
        // TODO: Have a generic way to handle menus, have priorities and be able to close the focused one 
        if (this.dialogueBox.visible) {
            this.dialogueBox.stop(true);
            this.dialogueBox.closeDialogue();
        }
        else {
            this.toggleMenus();
        }
    }

    protected onNextPageButtonDown(): void {
        if (this.dialogueBox.visible) {
            if (this.dialogueBox.isTyping)
            {
                this.dialogueBox.stop(true);
            }
            else if(this.dialogueBox.isLastPage)
            {
                this.dialogueBox.closeDialogue();
                this.events.emit("menuVisibilityChange", false);
            }
            else
            {
                this.dialogueBox.typeNextPage();
            }
        }
    }

    // Update
    ////////////////////////////////////////////////////////////////////////

    // Inventory
    ////////////////////////////////////////////////////////////////////////

    public openPlayerInventory(): void {
        this.setPlayerInventoryVisibility(true);
    }

    public toggleMenus(): void
    {
        if (this.playerInventoryWidget.visible) {
            this.setPlayerInventoryVisibility(false);
            this.setChestInventoryVisibility(false);
        }
        else {
            this.setPlayerInventoryVisibility(true);
        }
    }

    protected setPlayerInventoryVisibility(isVisible: boolean): void {
        this.playerInventoryWidget.setX(this.scale.displaySize.width * 0.5 - this.playerInventoryWidget.width * 0.25);
        this.playerInventoryWidget.setVisible(isVisible);
        this.events.emit("menuVisibilityChange", this.playerInventoryWidget.visible);
    }

    public openChestInventory(): void {
        this.setPlayerInventoryVisibility(true);
        this.setChestInventoryVisibility(true);
    }

    public toggleChestInventory(): void
    {
        this.setPlayerInventoryVisibility(!this.playerInventoryWidget.visible);
    }

    protected setChestInventoryVisibility(isVisible: boolean): void {
        if (isVisible) {
            this.playerInventoryWidget.setX(this.scale.displaySize.width * 0.33 - this.playerInventoryWidget.width * 0.25);
        }
        
        this.chestInventoryWidget.setVisible(isVisible);
        this.events.emit("menuVisibilityChange", this.playerInventoryWidget.visible);
    }

    public updatePlayerInventory(newInventoryObjects: SW_InventoryObject[]) {
        this.playerInventoryWidget.updateInventory(newInventoryObjects);
    }

    public updateChestInventory(newInventoryObjects: SW_InventoryObject[]) {
        this.chestInventoryWidget.updateInventory(newInventoryObjects);
    }

    // Dialogue
    ////////////////////////////////////////////////////////////////////////

    protected createDialogueBox(): void {
        const scale = 0.3;
        this.dialogueCharactersLeft = this.add.image(12, SW_CST.GAME.HEIGHT * 0.5, "dialogueImage_YB").setScale(scale).setOrigin(0, 0.5);
        this.dialogueCharactersRight = this.add.image(SW_CST.GAME.WIDTH - 20, SW_CST.GAME.HEIGHT * 0.5, "dialogueImage_YB").setScale(scale).setOrigin(1, 0.5).setFlipX(true);

        this.dialogueCharactersLeft.setVisible(false);
        this.dialogueCharactersRight.setVisible(false);

        this.dialogueBox = new SW_DialogueBox(this, {
            x: SW_CST.GAME.WIDTH * 0.5,
            y: SW_CST.GAME.HEIGHT - 12,
            width: SW_CST.GAME.WIDTH - 100,
            height: 80,
            page: { maxLines: 3, pageBreak: "\n" }
        });

        this.dialogueBox.setOrigin(0.5, 1);
        this.dialogueBox.layout();

        // TODO: Make the box and the images in a container
        this.dialogueBox.on("visibilityChanged", (value: boolean) => {
            this.dialogueCharactersRight.setVisible(false);

            this.dialogueCharactersLeft.setVisible(value);
            this.dialogueCharactersLeft.setX(-this.dialogueCharactersLeft.displayWidth);
            this.tweens.add({
                targets: this.dialogueCharactersLeft,
                x: 12,
                duration: 300
            })
            
        }, this);
    }

    public requestDialogue(message: string, title: string, iconTexture: string = "", iconFrame: string = ""): void
    {
        this.dialogueBox.showMessage(message, title, iconTexture, iconFrame);
    }
};