import config from "./config";
const {
  COMPOSITE_OPERATION,
  STROKE_WIDTH,
  BLACK,
  CIRCLE_PERCENTAGE,
  ROTATED_PERCENTAGE,
  SHAPE_WIDTH,
  SHAPE_HEIGHT,
  DEFAULT_PRECISION
} = config;

import utils from "./utils";
const { round, RandomHelper } = utils;

/**
 * Agent class for drawing shapes on generator
 */
class Shape extends RandomHelper {
  constructor(prng, color, ctx, ctxW, ctxH, precision = DEFAULT_PRECISION) {
    super();
    this._prng = prng;
    this._color = color;
    this._ctx = ctx;
    this._ctxW = ctxW;
    this._ctxH = ctxH;
    this._precision = precision;

    this._isCircle = this._prng() > 1 - CIRCLE_PERCENTAGE;

    // Define width & height
    this.w = round(this.randomInt(...SHAPE_WIDTH), this._precision);
    if (this._isCircle) {
      this.h = this.w;
    } else {
      this.h = round(this.randomInt(...SHAPE_HEIGHT), this._precision);
    }

    // Set position
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

    // Define shape rotation
    this.angle =
      45 *
      this.randomInt(2) *
      (Math.PI / 180) *
      (this._prng() > 1 - ROTATED_PERCENTAGE);

    // Fix shape size and position according to choosen rotation
    if (!this._isCircle) {
      const maxRatio = Math.max(Math.cos(this.angle), Math.sin(this.angle));
      const newW = this.w * maxRatio;
      const newH = this.h * maxRatio;
      this.startX += (this.w - newW) / 2;
      this.startY += (this.h - newH) / 2;
      this.w = newW;
      this.h = newH;
    }

    // Bind draw function to draw helper
    this.drawShape = this._draw.bind(this, this._drawShape.bind(this));
    this.drawText = this._draw.bind(this, this._drawText.bind(this));
  }

  /**
   * Draw shape itself
   */
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

  /**
   * Draw text and line around shape
   * @param {String} text - Optional text to display
   */
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

  /**
   * Wrap given draw function to create a continuous pattern
   * @param {Function} drawingCallback - Draw function to wrap
   * @param  {...Any} args - Arguments for the draw function
   */
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

export default Shape;
