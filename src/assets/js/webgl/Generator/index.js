import config from "./config";
const { SHAPE_NUM, ANOTHER_LINE_PERCENTAGE, COLORS, COLOR_NUM } = config;

import utils from "./utils";
const { RandomHelper } = utils;

import Shape from "./Shape";

/**
 * Main generator class
 */
class Generator extends RandomHelper {
  constructor(prefix) {
    super();

    // Canvas width & height to fit cups
    this._w = 1900;
    this._h = 1150;

    // Create virtual canvas
    this._$canvas = document.createElement("canvas");
    this._$canvas.width = this._w;
    this._$canvas.height = this._h;
    this._ctx2d = this._$canvas.getContext("2d");

    // Save constructor arguments
    this._prefix = prefix;
  }

  /**
   * Get a generated image from current Generator instance
   * @param {Any} seed - seed to use
   * @param {String} country - country to feature
   * @return {ImageDate} - generated image data
   */
  generate(seed, country = "Germany") {
    this.initPrng(seed);
    this.clear();
    const { _ctx2d: ctx, _w: w, _h: h } = this;

    // Get colors
    const colors = this.getColors();

    // Draw shapes using Shape agent
    const shapeNum = this.randomInt(...SHAPE_NUM);
    const shapes = [];
    for (let i = 0; i < shapeNum; i++) {
      const shape = new Shape(this._prng, colors[i % colors.length], ctx, w, h);
      shape.drawShape();
      shapes.push(shape);
    }

    // Add text and lines
    shapes[0].drawText(this.getText(country));
    if (this._prng() > 1 - ANOTHER_LINE_PERCENTAGE) {
      shapes[1].drawText();
      if (this._prng() > 1 - ANOTHER_LINE_PERCENTAGE) {
        shapes[2].drawText();
      }
    }

    // Return generated design
    return ctx.getImageData(0, 0, w, h);
  }

  /**
   * Get colors to be used for current generation
   */
  getColors() {
    const colors = [...COLORS];

    const pop = this.randomInt(
      ...COLOR_NUM.map(n => colors.length - n + 1).reverse()
    );
    for (let i = 0; i < pop; i++) {
      colors[this.randomInt(0, colors.length)] = false;
    }
    return colors.filter(color => color);
  }

  /**
   * Clear current virtual canvas
   */
  clear() {
    this._ctx2d.clearRect(0, 0, this._w, this._h);
  }

  /**
   * Format text correctly
   * @param {String} country - featured country
   */
  getText(country) {
    return `${this._prefix} - ${country}`.toUpperCase();
  }
}

export default Generator;
