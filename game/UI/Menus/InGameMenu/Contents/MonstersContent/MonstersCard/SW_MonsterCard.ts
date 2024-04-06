import { Label } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import { PerspectiveCard } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import { SW_CST } from '~/game/SW_CST';
import SW_BaseScene from '~/game/scenes/SW_BaseScene';
import { SW_MonsterFrontCard } from './SW_MonsterFrontCard';

export class SW_MonsterCard extends PerspectiveCard {
  public declare scene: SW_BaseScene;

  protected declare frontCard: SW_MonsterFrontCard;

  constructor(
    scene: SW_BaseScene,
    x: number,
    y: number,
    frontTexture: string,
    backTexture: string,
    cardSize: number
  ) {
    const frontCard = new SW_MonsterFrontCard(scene, {
      iconSize: cardSize,
      width: cardSize,
      height: cardSize,
      texture: frontTexture,
    });

    const backBackground = scene.add.rectangle(0, 0, 1, 1, 0xffffff, 1);

    const backTextContainer = scene.add.container(0, 0);
    backTextContainer.width = cardSize;
    backTextContainer.height = cardSize;

    const backTextDidYouKnow = scene.add.text(
      0,
      -cardSize * 0.5 + 48,
      'Did you know',
      {
        color: '#000000',
        fontSize: '36px',
        fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
        align: 'center',
      }
    );
    backTextDidYouKnow.setOrigin(0.5, 0);

    const backTextInfo = scene.add.text(0, 0, 'Monsters love chocolate ', {
      color: '#000000',
      fontSize: '16px',
      fontFamily: SW_CST.STYLE.TEXT.FONT_FAMILY,
      align: 'center',
    });
    backTextInfo.setSize(cardSize - 48, 0);
    backTextInfo.setWordWrapWidth(cardSize - 48);
    backTextInfo.setOrigin(0.5);
    backTextInfo.width = cardSize - 48;

    backTextContainer.add(backTextDidYouKnow);
    backTextContainer.add(backTextInfo);

    const backCard = new Label(scene, {
      background: backBackground,
      text: backTextContainer,
      iconSize: cardSize,
      width: cardSize,
      height: cardSize,
    });
    backCard.setChildrenAlignMode('center');

    const config: PerspectiveCard.IConfig = {
      x: x,
      y: y,
      width: cardSize,
      height: cardSize,
      front: frontCard,
      back: backCard,
      orientation: 'horizontal',
      flip: {
        frontToBack: 'left-to-right',
        backToFront: 'right-to-left',
        duration: 500,
        ease: 'Linear',
        delay: 0,
      },
      draggable: false,
      sizerEvents: false,
    };

    super(scene, config);

    this.frontCard = frontCard;

    this.layout();
    this.scene.add.existing(this);
  }

  public onClicked(fn: Function, context?: any): this {
    this.on(
      'clicked',
      (card: SW_MonsterCard) => {
        fn(card);
      },
      context
    );
    return this;
  }

  public flipCard(
    duration?: number | undefined,
    repeat?: number | undefined
  ): void {
    if (this.flip) {
      this.flip.flip(duration, repeat);
      //   this.scene.sound.play('cardFlip', { volume: 0.4 });
    }
  }

  public updateFrontCard(frontTexture: string): void {
    this.frontCard.updateTexture(frontTexture);
  }
}
