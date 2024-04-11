export declare type SW_TiledObjectProperties = {
  name: string;
  type: string;
  value: any;
};

export class SW_Utils {
  // This function is based on https://github.com/photonstorm/phaser/blob/v3.51.0/src/display/color/HexStringToColor.js
  // and https://stackoverflow.com/questions/17945972/converting-rgba-values-into-one-integer-in-javascript
  public static hexColorToNumber(stringColor: string): number {
    stringColor = stringColor.replace('0x', '#');

    // eg: "#1234" - alpha must be removed
    if (stringColor.length == 5) {
      stringColor = stringColor.substring(0, 4);
    }
    // eg: "#112233" - alpha is missing
    else if (stringColor.length == 9) {
      stringColor = stringColor.substring(0, 7);
    }

    stringColor = stringColor.replace(
      /^(?:#|0x)?([a-f\d])([a-f\d])([a-f\d])$/i,
      function (_, r, g, b) {
        return r + r + g + g + b + b;
      }
    );

    const result = /^(?:#|0x)?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      stringColor
    );

    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);

      return (r << 16) + (g << 8) + b;
    }
    return 0;
  }

  public static drawDashLineOnX(
    scene: Phaser.Scene,
    startX: number,
    endX: number,
    y: number,
    pattern: number[],
    config: {
      lineThickness?: number;
      lineColor?: number;
      lineAlpha?: number;
    }
  ): Phaser.GameObjects.Graphics {
    if (startX > endX) {
      const temp = startX;
      startX = endX;
      endX = temp;
    }

    let patternIndex = 0;
    let currentX = startX;
    let drawSpace = true;

    const dashedLine = scene.add.graphics({
      x: 0,
      y: 0,
    });

    const lineThickness = config.lineThickness ?? 10;
    const lineColor = config.lineColor ?? 0x00ff00;
    const lineAlpha = config.lineAlpha ?? 1;

    dashedLine.lineStyle(lineThickness, lineColor, lineAlpha);
    dashedLine.beginPath();
    dashedLine.moveTo(startX, y);

    while (currentX < endX) {
      const deltaPattern = Math.min(pattern[patternIndex], endX - currentX);
      if (drawSpace) {
        dashedLine.moveTo(currentX, y);
      } else {
        dashedLine.lineTo(currentX, y);
      }

      currentX += deltaPattern;
      patternIndex = (patternIndex + 1) % pattern.length;
      drawSpace = !drawSpace;
    }
    dashedLine.closePath();
    dashedLine.strokePath();

    return dashedLine;
  }

  public static drawDashLineOnY(
    scene: Phaser.Scene,
    x: number,
    startY: number,
    endY: number,
    pattern: number[],
    config: {
      lineThickness?: number;
      lineColor?: number;
      lineAlpha?: number;
    }
  ): Phaser.GameObjects.Graphics {
    if (startY > endY) {
      const temp = startY;
      startY = endY;
      endY = temp;
    }

    let patternIndex = 0;
    let currentY = startY;
    let drawSpace = true;

    const dashedLine = scene.add.graphics({
      x: 0,
      y: 0,
    });

    const lineThickness = config.lineThickness ?? 10;
    const lineColor = config.lineColor ?? 0x00ff00;
    const lineAlpha = config.lineAlpha ?? 1;

    dashedLine.lineStyle(lineThickness, lineColor, lineAlpha);
    dashedLine.beginPath();
    dashedLine.moveTo(x, startY);

    while (currentY < endY) {
      const deltaPattern = Math.min(pattern[patternIndex], endY - currentY);
      if (drawSpace) {
        dashedLine.moveTo(x, currentY);
      } else {
        dashedLine.lineTo(x, currentY);
      }

      currentY += deltaPattern;
      patternIndex = (patternIndex + 1) % pattern.length;
      drawSpace = !drawSpace;
    }
    dashedLine.closePath();
    dashedLine.strokePath();

    return dashedLine;
  }
}
