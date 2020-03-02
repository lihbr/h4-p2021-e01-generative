export default class Generator {
  constructor(ctx) {
    this._ctx = ctx;
    this._ctx2d = ctx._ctx2d;

    this._w = 1900;
    this._h = 1150;
  }

  generate() {
    const { _ctx2d: ctx, _w: w, _h: h } = this;

    ctx.lineWidth = 10;
    ctx.strokeStyle = "#ff0000";

    ctx.beginPath();

    ctx.arc(w / 2, h / 2, 100, 0, Math.PI * 2);

    ctx.stroke();

    return ctx.getImageData(0, 0, w, h);
  }
}
