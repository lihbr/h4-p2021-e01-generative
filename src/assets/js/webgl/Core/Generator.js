import seedrandom from "seedrandom";

const BLACK = "#282423";
const STROKE_WIDTH = 10;
const COMPOSITE_OPERATION = "exclusion";
const HSL = {
  saturation: {
    base: 90,
    amplitude: 5
  },
  lightness: {
    base: 55,
    amplitude: 5
  }
};
const COLOR_NUM = [2, 3]; // always 2
const RECT_NUM = [8, 14];
const RECT_WIDTH = [50, 400];
const RECT_HEIGHT = [200, 400];

const round = (value, precision = 1) => {
  return Math.round(value / precision) * precision;
};

class RandomHelper {
  constructor() {}

  randomInt(start, end) {
    if (!this.hasPrng()) {
      return;
    }

    if (typeof end === "undefined") {
      end = start;
      start = 0;
    }

    return start + Math.floor(this._prng() * (end - start));
  }

  randomArray(array = []) {
    if (!this.hasPrng()) {
      return;
    }

    return array[Math.floor(this._prng() * array.length)];
  }

  randomHsl(hue) {
    if (!this.hasPrng()) {
      return;
    }

    if (!hue) {
      hue = this.randomInt(256);
    } else {
      hue %= 256;
    }

    const { saturation, lightness } = HSL;

    const samp = this.randomInt(-saturation.amplitude, saturation.amplitude);
    const lamp = this.randomInt(-lightness.amplitude, lightness.amplitude);

    return `hsl(${hue}, ${saturation.base + samp}%, ${lightness.base + lamp}%)`;
  }

  hasPrng() {
    if (typeof this._prng === "undefined") {
      console.error(
        "Instance of RandomHelper does not have it's PRNG defined yet, use this.initPrng()"
      );
      return false;
    } else {
      return true;
    }
  }

  initPrng(seed) {
    if (seed) {
      this._prng = new seedrandom(seed);
    } else {
      this._prng = new seedrandom();
    }
  }
}

/**
 * Rect class
 */
class Rect extends RandomHelper {
  constructor(prng, color, ctx, ctxW, ctxH, precision = 100) {
    super();
    this._prng = prng;
    this._color = color;
    this._ctx = ctx;
    this._ctxW = ctxW;
    this._ctxH = ctxH;
    this._precision = precision;

    this.w = round(this.randomInt(...RECT_WIDTH), this._precision);
    this.h = round(this.randomInt(...RECT_HEIGHT), this._precision);

    this.startX = round(
      (this._ctxW - this.w) / 2 +
        this.randomInt(-this._ctxW / 2, this._ctxW / 2),
      this._precision * 2
    );

    this.startY = round(
      (this._ctxH - this.h) / 2 +
        this.randomInt(-this._ctxH / 3.5, this._ctxH / 4),
      this._precision * 2
    );

    // 45° 25%
    this.angle =
      45 * this.randomInt(2) * (Math.PI / 180) * (this.randomInt(3) === 0);

    // Wrap 3 times
    this.drawShape = this._draw.bind(this, this._drawShape.bind(this));
    this.drawText = this._draw.bind(this, this._drawText.bind(this));
  }

  _drawShape() {
    this._ctx.rotate(this.angle);

    this._ctx.beginPath();
    this._ctx.rect(-this.w / 2, -this.h / 2, this.w, this.h);
    this._ctx.globalCompositeOperation = COMPOSITE_OPERATION;
    this._ctx.fillStyle = this._color;
    this._ctx.fill();

    this._ctx.rotate(-this.angle);
  }

  _drawText(text) {
    this._ctx.rotate(this.angle);

    this._ctx.globalCompositeOperation = "source-over";

    this._ctx.beginPath();
    this._ctx.rect(-this.w / 2, -this.h / 2, this._ctxW * 2, this._ctxH * 2);
    this._ctx.strokeStyle = BLACK;
    this._ctx.lineWidth = STROKE_WIDTH;
    this._ctx.stroke();

    this._ctx.beginPath();
    this._ctx.font = "bold 30px monospace";
    this._ctx.fillStyle = BLACK;
    const offset = this.startY > 100 ? -14 : 34;

    this._ctx.fillText(text, 0, -this.h / 2 + offset);

    this._ctx.rotate(-this.angle);
  }

  // Wrap drawingCallback 3 times
  _draw(drawingCallback, ...args) {
    this._ctx.translate(this.startX + this.w / 2, this.startY + this.h / 2);
    this._ctx.translate(-this._ctxW, 0);
    drawingCallback(...args);
    this._ctx.translate(this._ctxW, 0);
    drawingCallback(...args);
    this._ctx.translate(this._ctxW, 0);
    drawingCallback(...args);
    this._ctx.translate(-this._ctxW, 0);
    this._ctx.translate(-this.startX - this.w / 2, -this.startY - this.h / 2);
  }
}

export default class Generator extends RandomHelper {
  constructor(ctx, prefix) {
    super();

    this._ctx = ctx;
    this._ctx2d = ctx._ctx2d;
    this._prefix = prefix;

    // Generator config
    this._w = 1900;
    this._h = 1150;
  }

  generate(seed, country = "Germany") {
    this.initPrng(seed);
    this.clear();
    const { _ctx2d: ctx, _w: w, _h: h } = this;

    ctx.globalCompositeOperation = this._globalCompositeOperation;

    const colors = this.getColors();

    const rectNum = this.randomInt(...RECT_NUM);
    const rects = [];
    for (let i = 0; i < rectNum; i++) {
      const rect = new Rect(this._prng, colors[i % colors.length], ctx, w, h);
      rect.drawShape();
      rects.push(rect);
    }

    rects[0].drawText(this.getText(country));

    // ctx.beginPath();
    // ctx.lineWidth = this.round(this.randomInt(30, 100), 10);
    // ctx.strokeStyle = this.randomHsl();
    // ctx.arc(w / 2, h / 2, 100, 0, Math.PI * 2);
    // ctx.stroke();

    return ctx.getImageData(0, 0, w, h);
  }

  getColors() {
    const colorNum = this.randomInt(...COLOR_NUM);
    const startOffset = this.randomInt(256);
    const colors = [];

    for (let i = 0; i < colorNum; i++) {
      colors.push(
        this.randomHsl(
          startOffset + i * (256 / colorNum / 1.5) + this.randomInt(-8, 8)
        )
      );
    }

    return colors;
  }

  clear() {
    this._ctx2d.clearRect(0, 0, this._w, this._h);
  }

  getText(country) {
    return `${this._prefix} - ${country}`.toUpperCase();
  }
}
