import { throttle } from "~/assets/js/utils";

export default class Mouse {
  /**
   * Constructor
   */
  constructor(time, sizes) {
    this.easing = 0.005;

    this.nextX = 0.5;
    this.x = 0.5;
    this.easedX = 0;

    this.nextY = 0.25;
    this.y = 0.25;
    this.easedY = 0;

    this._time = time;
    this._sizes = sizes;

    // Resize event
    window.addEventListener("mousemove", this.mousemove.bind(this));
    window.addEventListener("touchmove", this.touchmove.bind(this));
    time.on("tick", () => {
      this.updateCurrent();
      this.computeEased();
    });
  }

  /**
   * Mousemove
   */
  mousemove(e) {
    this.nextX = (e.clientX / this._sizes.width) * 2 - 1;
    this.nextY = (e.clientY / this._sizes.height) * 2 - 1;
  }

  /**
   * Touchmove
   */
  touchmove(e) {
    try {
      this.nextX = (e.touches[0].screenX / this._sizes.width) * 2 - 1;
      this.nextY = (e.touches[0].screenY / this._sizes.height) * 2 - 1;
    } catch (error) {
      // error silently
    }
  }

  /**
   * Update current
   */
  updateCurrent() {
    this.x = this.nextX;
    this.y = this.nextY;
  }

  /**
   * Compute eased value
   */
  computeEased() {
    const distX = this.x - this.easedX;
    Math.abs(distX) > 0.001 && (this.easedX += distX * this.easing);
    const distY = this.y - this.easedY;
    Math.abs(distY) > 0.001 && (this.easedY += distY * this.easing);
  }
}
