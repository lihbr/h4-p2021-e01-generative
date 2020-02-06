import EventEmitter from "./EventEmitter";

import Stats from "stats.js";

export default class Time extends EventEmitter {
  /**
   * Constructor
   */
  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.frame = 0;
    this.elapsed = 0;
    this.delta = 16;

    if (process.env.NODE_ENV === "development") {
      this._stats = new Stats();
      this._stats.showPanel(0);
      document.body.appendChild(this._stats.dom);
    }

    this.tick();
  }

  /**
   * Tick
   */
  tick() {
    this._ticker = window.requestAnimationFrame(this.tick.bind(this));

    const current = Date.now();

    this.frame++;
    this.delta = current - this.current;
    this.elapsed = current - this.start;
    this.current = current;

    if (this.delta > 60) {
      this.delta = 60;
    }

    if (process.env.NODE_ENV === "development") {
      this._stats.begin();
    }

    this.trigger("tick", {
      delta: this.delta,
      elapsed: this.elapsed,
      frame: this.frame
    });

    if (process.env.NODE_ENV === "development") {
      this._stats.end();
    }
  }

  /**
   * Stop
   */
  stop() {
    window.cancelAnimationFrame(this._ticker);
  }
}
