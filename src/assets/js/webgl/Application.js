import logger from "~/assets/js/logger";

import Core from "./Core";

import { Scene } from "three";

export default class Application {
  constructor($container, WorldClass) {
    this._$container = $container;
    this._$canvas = $container.querySelector(".webgl");
    if (!this._$canvas) {
      return logger.error(".webgl not found inside container!");
    }

    const $ctx2d = $container.querySelector(".ctx2d");
    if (!$ctx2d) {
      return logger.error(".ctx2d not found inside container!");
    }
    this._ctx2d = $ctx2d.getContext("2d");

    this.init(WorldClass);
    this.start();
  }

  init(WorldClass) {
    this.time = new Core.Time();
    this.sizes = new Core.Sizes();
    this.mouse = new Core.Mouse(this.time, this.sizes);
    this.animationController = new Core.AnimationController(this.time);

    this.scene = new Scene();
    this.render = new Core.Render(this);
    this.camera = new Core.Camera(this);

    this.generator = new Core.Generator(this, "PARIS 2024");

    this.world = new WorldClass(this);
    this.world.load(this);

    this.passes = new Core.Passes(this);

    logger.info("inited");
  }

  start() {
    this.render.start();
  }

  destructor() {
    // Destroy everything's needed
    this.time.off("tick");
    this.sizes.off("resize");
    this.render.dispose();
  }
}
