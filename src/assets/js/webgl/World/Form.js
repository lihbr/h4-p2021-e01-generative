import {
  AmbientLight,
  DirectionalLight,
  Object3D,
  Raycaster,
  Vector2
} from "three";

import Cup from "./Cup";

export default class WorldHero {
  constructor(ctx) {
    this._ctx = ctx;

    this.init(ctx);
  }

  init(ctx) {
    // World
    this.world = new Object3D();
    this._ctx.scene.add(this.world);
    this._raycaster = new Raycaster();

    // Common objects
    this.createCup(ctx);

    // Lighting
    ctx.scene.add(new AmbientLight(0xffffff, 3));
    const directionaLight = new DirectionalLight(0xffffff, 2);
    directionaLight.position.set(-1, 0.7, 0.15);
    ctx.scene.add(directionaLight);

    // Camera
    ctx.camera.setTargetPosition(0, 0, 0);
    ctx.camera.setPosition(0, 150, 0);

    // Events
    ctx.time.on("tick", this.tick.bind(this));

    // Saving
  }

  createCup(ctx) {
    this._cup = new Cup().object;

    this._cup.children[0].scale.set(1.3, 1.3, 1.3);

    this._cup.scale.set(0.001, 0.001, 0.001);

    ctx.animationController.add({
      mesh: this._cup,
      scale: [1, 1, 1],
      duration: 1500,
      timingFunction: "easeInOutQuint",
      strategy: "by",
      delay: 0
    });

    this.world.add(this._cup);
  }

  load(ctx) {}

  tick({ elapsed, frame }) {
    // Update cups
    this._cup.rotation.x = Math.sin(elapsed / 7000) / 6;
    this._cup.rotation.y = Math.sin(elapsed / 8000) / 4;

    // Raycaster
    const { x, y } = this._ctx.mouse;

    this._raycaster.setFromCamera(new Vector2(x, -y), this._ctx.camera.get());
    const intersects = this._raycaster.intersectObjects([this._cup], true);

    if (intersects.length) {
      if (
        typeof this._hovered === "undefined" ||
        this._hovered.name !== this._cup.name
      ) {
        this._hovered = this._cup;
      }
    } else {
      this._hovered = undefined;
    }

    let currentS = this._cup.scale.x;
    let currentR = this._cup.children[0].rotation.z;
    let s;
    let r;
    if (this._hovered && this._cup.name === this._hovered.name) {
      s = Math.min(1.1, currentS * 1.007 + 0.001);
      r = Math.min(Math.PI * 2, currentR * 1.05 + Math.PI / 30);
    } else {
      s = Math.max(1, currentS * 0.993 - 0.001);
      r = Math.max(0, currentR * 0.95 - Math.PI / 30);
    }
    if (frame > 120) {
      this._cup.scale.set(s, s, s);
      this._cup.children[0].rotation.set(0, 0, r);
    }
  }
}
