import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
  /**
   * Constructor
   */
  constructor($canvas) {
    super();

    this._$canvas = $canvas;

    // Resize event
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  /**
   * Resize
   */
  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    delete this._$canvas.width;
    delete this._$canvas.height;
    this._$canvas.style.removeProperty("width");
    this._$canvas.style.removeProperty("height");
    this.cWidth = this._$canvas.offsetWidth;
    this.cHeight = this._$canvas.offsetHeight;

    this.trigger("resize", {
      width: this.width,
      height: this.height,
      cWidth: this.cWidth,
      cHeight: this.cHeight
    });
  }
}
