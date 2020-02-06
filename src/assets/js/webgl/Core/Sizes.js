import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
  /**
   * Constructor
   */
  constructor() {
    super();

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

    this.trigger("resize", { width: this.width, height: this.height });
  }
}
