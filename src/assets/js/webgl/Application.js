import logger from "~/assets/js/logger";

import Core from "./Core";

import { Scene } from "three";

export default class Application {
  constructor($container, WorldClass, type, extra = {}) {
    this._type = type;
    this._extra = extra;
    this._$container = $container;
    this._$canvas = $container.querySelector(".webgl");
    if (!this._$canvas) {
      return logger.error(".webgl not found inside container!");
    }

    this.init(WorldClass);
    this.start();
  }

  init(WorldClass) {
    this.time = new Core.Time();
    this.sizes = new Core.Sizes(this._$canvas);
    this.mouse = new Core.Mouse(this.time, this.sizes);
    this.animationController = new Core.AnimationController(this.time);

    this.scene = new Scene();
    this.render = new Core.Render(this);
    this.camera = new Core.Camera(this);

    this.generator = new Core.Generator("PARIS 2024");

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
