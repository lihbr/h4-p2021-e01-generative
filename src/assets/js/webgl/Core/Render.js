import { WebGLRenderer } from "three";
import { EffectComposer } from "postprocessing";

export default class Render {
  constructor(ctx) {
    this._ctx = ctx;

    this.init(ctx);
  }

  init(ctx) {
    // Definition
    const renderer = new WebGLRenderer({
      canvas: ctx._$canvas,
      alpha: true
    });

    renderer.setClearColor(0x000000, 0);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(ctx.sizes.width, ctx.sizes.height);

    renderer.physicallyCorrectLights = true;
    renderer.gammaFactor = 2.2;
    renderer.gammaOutPut = true;
    renderer.autoClear = false;

    // Events
    ctx.sizes.on("resize", ({ width, height }) => {
      renderer.setSize(width, height);
    });

    const composer = new EffectComposer(renderer);

    // Saving
    this.renderer = renderer;
    this.composer = composer;
  }

  start() {
    this._ctx.time.on("tick", () => {
      this.composer.render();
    });
  }

  dispose() {
    this.renderer.dispose();
    this.composer.dispose();
  }
}
