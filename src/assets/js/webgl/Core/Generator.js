import seedrandom from "seedrandom";

export default class Generator {
  constructor(ctx, prefix) {
    this._ctx = ctx;
    this._ctx2d = ctx._ctx2d;
    this._prefix = prefix;

    // Generator config
    this._w = 1900;
    this._h = 1150;

    this._hsl = {
      saturation: {
        base: 90,
        amplitude: 5
      },
      lightness: {
        base: 55,
        amplitude: 5
      }
    };

    this._black = "#282423";
    this._strokeWidth = 10;

    // this._globalCompositeOperation = "hard-light";
    this._globalCompositeOperation = "exclusion";
  }

  generate(seed, country = "Germany") {
    this.initPrng(seed);
    this.clear();
    const { _ctx2d: ctx, _w: w, _h: h } = this;

    ctx.globalCompositeOperation = this._globalCompositeOperation;

    const colorNum = this.randomInt(2, 4);
    const startHue = this.randomInt(256);
    const colors = [this.randomHsl(startHue)];
    for (let i = 1; i < colorNum; i++) {
      colors.push(
        this.randomHsl(
          startHue + i * (256 / colorNum / 2) + this.randomInt(-25, 25)
        )
      );
    }
    let colorIndex = this.randomInt(colors.length);

    const rectNum = this.randomInt(8, 14);
    for (let i = 0; i < rectNum; i++) {
      const width = this.round(this.randomInt(50, 400), 100);
      const height = this.round(this.randomInt(200, 400), 100);

      const x = this.round(
        (w - width) / 2 + this.randomInt(-w / 2, w / 2),
        200
      );
      const y = this.round(
        (h - height) / 2 + this.randomInt(-h / 4.5, h / 4),
        200
      );

      const angle =
        45 *
        this.randomInt(2) *
        (Math.PI / 180) *
        this.randomInt(2) *
        this.randomInt(2);
      // const angle = 0;

      const draw = () => {
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.rect(-width / 2, -height / 2, width, height);
        ctx.fillStyle = colors[colorIndex % colors.length];
        ctx.fill();

        if (i === rectNum - 1) {
          ctx.globalCompositeOperation = "source-over";

          ctx.beginPath();
          ctx.rect(-width / 2, -height / 2, w * 2, h * 2);
          ctx.strokeStyle = this._black;
          ctx.lineWidth = this._strokeWidth;
          ctx.stroke();

          ctx.beginPath();
          ctx.font = "bold 30px monospace";
          ctx.fillStyle = this._black;
          const offset = y > 100 ? -14 : 34;
          ctx.fillText(this.getText(country), 0, -height / 2 + offset);

          ctx.globalCompositeOperation = this._globalCompositeOperation;
        }

        ctx.rotate(-angle);
      };

      colorIndex++;
      ctx.translate(x + width / 2, y + height / 2);
      ctx.translate(-w, 0);
      draw();
      ctx.translate(w, 0);
      draw();
      ctx.translate(w, 0);
      draw();
      ctx.translate(-w, 0);
      ctx.translate(-x - width / 2, -y - height / 2);
    }

    // ctx.beginPath();
    // ctx.lineWidth = this.round(this.randomInt(30, 100), 10);
    // ctx.strokeStyle = this.randomHsl();
    // ctx.arc(w / 2, h / 2, 100, 0, Math.PI * 2);
    // ctx.stroke();

    return ctx.getImageData(0, 0, w, h);
  }

  clear() {
    this._ctx2d.clearRect(0, 0, this._w, this._h);
  }

  round(value, precision = 1) {
    return Math.round(value / precision) * precision;
  }

  getText(country) {
    return `${this._prefix} - ${country}`.toUpperCase();
  }

  /**
   * PRNG
   */
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

    const { saturation, lightness } = this._hsl;

    const samp = this.randomInt(-saturation.amplitude, saturation.amplitude);
    const lamp = this.randomInt(-lightness.amplitude, lightness.amplitude);

    return `hsl(${hue}, ${saturation.base + samp}%, ${lightness.base + lamp}%)`;
  }

  hasPrng() {
    if (typeof this._prng === "undefined") {
      console.error(
        "Instance of Generator does not have it's PRNG defined yet"
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
