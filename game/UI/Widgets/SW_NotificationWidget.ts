import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle';
import { SW_CST } from '~/game/SW_CST';
import { SW_Utils } from '~/game/SW_Utils';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';

export enum ML_NotificationSeverity {
  NORMAL = 'NORMAL',
  WARNING = 'WARNING',
}

export declare type ML_NotificationData = {
  text: string;
  severity?: ML_NotificationSeverity;
};

class SW_NotificationElement extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;

  protected textObject: BBCodeText;
  protected background: RoundRectangle;

  constructor(scene: SW_BaseScene, x: number, y: number, width: number, height: number) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.background = this.scene.rexUI.add.roundRectangle(0, 0, width, height - 4, 3, 0xc4b6a5, 1.0);
    this.background.setOrigin(0.5, 0);
    this.background.setStrokeStyle(2, SW_Utils.hexColorToNumber(SW_CST.STYLE.COLOR.TEXT), 1.0);
    this.add(this.background);

    this.width = this.background.width;
    this.height = this.background.height;

    this.textObject = this.scene.rexUI.add.BBCodeText(0, this.height * 0.5, '', {
      align: 'center',
      color: SW_CST.STYLE.COLOR.TEXT,
      //   fontStyle: 'bold',
      fontSize: '15px',
      fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
    });
    this.textObject.setOrigin(0.5);
    this.add(this.textObject);
  }

  public setText(text: string): void {
    this.textObject.setText(text);
    this.background.resize(this.textObject.width + 16, this.background.height);

    this.width = this.background.width;
    this.height = this.background.height;
  }
}

export class SW_NotificationWidget extends Phaser.GameObjects.Container {
  public declare scene: SW_BaseScene;
  protected notificationQueue: ML_NotificationData[];
  protected visibleNotifications: SW_NotificationElement[];

  protected maxNotificationCount: number = 3;
  protected notifLifespan: number = 4000;

  constructor(scene: SW_BaseScene, x: number, y: number) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.notificationQueue = [];
    this.visibleNotifications = [];
  }

  public addNotification(notificationData: ML_NotificationData): void {
    const notifHeight = 36;
    const newNotifElement = new SW_NotificationElement(this.scene, 0, 0, 100, notifHeight);
    newNotifElement.setText(notificationData.text);
    this.add(newNotifElement);

    for (const notifElement of this.visibleNotifications) {
      notifElement.setY(notifElement.y + notifHeight);
    }

    Phaser.Utils.Array.AddAt(this.visibleNotifications, newNotifElement, 0);

    this.scene.time.delayedCall(
      this.notifLifespan,
      () => {
        this.scene.tweens.add({
          targets: newNotifElement,
          alpha: 0,
          y: newNotifElement.y + 20,
          duration: 700,
          onComplete: () => {
            newNotifElement.destroy();
            this.visibleNotifications.pop();
          },
        });
      },
      undefined,
      this
    );
  }
}
