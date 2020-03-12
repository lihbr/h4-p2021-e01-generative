import seedrandom from "seedrandom";

const BLACK = "#282423";
const STROKE_WIDTH = 10;
const COMPOSITE_OPERATION = "source-over"; // "exclusion";
const COLOR_NUM = [2, 6];
const CIRCLE_PERCENTAGE = 0;
const ANOTHER_LINE_PERCENTAGE = 0.5;
const ROTATED_PERCENTAGE = 0.4;

const FORM_NUM = [10, 20];
const FORM_WIDTH = [50, 300];
const FORM_HEIGHT = [100, 300];

const DEFAULT_PRECISION = 75;

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
 * Form class
 */
class Form extends RandomHelper {
  constructor(prng, color, ctx, ctxW, ctxH, precision = DEFAULT_PRECISION) {
    super();
    this._prng = prng;
    this._color = color;
    this._ctx = ctx;
    this._ctxW = ctxW;
    this._ctxH = ctxH;
    this._precision = precision;

    this._isCircle = this._prng() > 1 - CIRCLE_PERCENTAGE;

    this.w = round(this.randomInt(...FORM_WIDTH), this._precision);
    if (this._isCircle) {
      this.h = this.w;
    } else {
      this.h = round(this.randomInt(...FORM_HEIGHT), this._precision);
    }

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

    // 45°
    this.angle =
      45 *
      this.randomInt(2) *
      (Math.PI / 180) *
      (this._prng() > 1 - ROTATED_PERCENTAGE);

    if (!this._isCircle) {
      const maxRatio = Math.max(Math.cos(this.angle), Math.sin(this.angle));
      const newW = this.w * maxRatio;
      const newH = this.h * maxRatio;
      this.startX += (this.w - newW) / 2;
      this.startY += (this.h - newH) / 2;
      this.w = newW;
      this.h = newH;
    }

    // Wrap 3 times
    this.drawShape = this._draw.bind(this, this._drawShape.bind(this));
    this.drawText = this._draw.bind(this, this._drawText.bind(this));
  }

  _drawShape() {
    this._ctx.rotate(this.angle);

    this._ctx.beginPath();
    if (this._isCircle) {
      this._ctx.arc(0, 0, this.w, 0, Math.PI * 2);
    } else {
      this._ctx.rect(-this.w / 2, -this.h / 2, this.w, this.h);
    }
    this._ctx.globalCompositeOperation = COMPOSITE_OPERATION;
    this._ctx.fillStyle = this._color;
    this._ctx.fill();

    this._ctx.rotate(-this.angle);
  }

  _drawText(text = "") {
    this._ctx.rotate(this.angle);

    this._ctx.globalCompositeOperation = "source-over";

    this._ctx.beginPath();
    this._ctx.rect(-this.w / 2, -this.h / 2, this._ctxW * 2, this._ctxH * 2);
    this._ctx.strokeStyle = BLACK;
    this._ctx.lineWidth = STROKE_WIDTH;
    this._ctx.stroke();

    this._ctx.beginPath();
    this._ctx.font = "bold 40px monospace";
    this._ctx.fillStyle = BLACK;
    const offset = this.startY > 100 ? -14 : 40;

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
  constructor(prefix) {
    super();

    this._w = 1900;
    this._h = 1150;

    this._$canvas = document.createElement("canvas");
    this._$canvas.width = this._w;
    this._$canvas.height = this._h;

    this._ctx2d = this._$canvas.getContext("2d");
    this._prefix = prefix;
  }

  generate(seed, country = "Germany") {
    this.initPrng(seed);
    this.clear();
    const { _ctx2d: ctx, _w: w, _h: h } = this;

    ctx.globalCompositeOperation = this._globalCompositeOperation;

    const colors = this.getColors();

    const formNum = this.randomInt(...FORM_NUM);
    const forms = [];
    for (let i = 0; i < formNum; i++) {
      const form = new Form(this._prng, colors[i % colors.length], ctx, w, h);
      form.drawShape();
      forms.push(form);
    }

    forms[0].drawText(this.getText(country));
    if (this._prng() > 1 - ANOTHER_LINE_PERCENTAGE) {
      forms[1].drawText();
      if (this._prng() > 1 - ANOTHER_LINE_PERCENTAGE) {
        forms[2].drawText();
      }
    }

    return ctx.getImageData(0, 0, w, h);
  }

  getColors() {
    const colors = [
      "#759f53",
      "#fd7b05",
      "#e84311",
      "#6d313e",
      "#3c496f",
      "#fecc0d"
    ];

    const pop = this.randomInt(
      ...COLOR_NUM.map(n => colors.length - n + 1).reverse()
    );
    for (let i = 0; i < pop; i++) {
      colors[this.randomInt(0, colors.length)] = false;
    }
    return colors.filter(color => color);
  }

  clear() {
    this._ctx2d.clearRect(0, 0, this._w, this._h);
  }

  getText(country) {
    return `${this._prefix} - ${country}`.toUpperCase();
  }
}
