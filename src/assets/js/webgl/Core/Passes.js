import {
  BloomEffect,
  EffectPass,
  RenderPass,
  BlendFunction,
  KernelSize,
  VignetteEffect,
  GodRaysEffect
} from "postprocessing";

export default class Passes {
  constructor(ctx) {
    this._ctx = ctx;

    this.init(ctx);
  }

  init(ctx) {
    // Definition
    const renderPass = new RenderPass(ctx.scene, ctx.camera.get());
    ctx.render.composer.addPass(renderPass);

    // Passes
    const bloomOptions = {
      blendFunction: BlendFunction.SCREEN,
      kernelSize: KernelSize.MEDIUM,
      luminanceThreshold: 0.8,
      luminanceSmoothing: 0.045,
      height: 480
    };
    // const vignetteOptions = {
    //   eskil: false,
    //   offset: 0.35,
    //   darkness: 0.75,
    //   opacity: 1
    // };
    // const godRaysOptions = {
    //   kernelSize: KernelSize.SMALL,
    //   height: 720,
    //   density: 0.96,
    //   decay: 0.95,
    //   weight: 0.3,
    //   exposure: 0.55,
    //   samples: 50,
    //   clampMax: 1.0
    // };

    const effectPass = new EffectPass(
      ctx.camera.get(),
      new BloomEffect(bloomOptions)
      // new VignetteEffect(vignetteOptions)
      // new GodRaysEffect(
      //   ctx.camera.get(),
      //   ctx.world.sun.lightSource,
      //   godRaysOptions
      // )
    );
    effectPass.renderToScreen = true;
    ctx.render.composer.addPass(effectPass);
  }
}
