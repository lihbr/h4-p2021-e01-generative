import {
  AmbientLight,
  DirectionalLight,
  Object3D,
  Raycaster,
  Vector2
} from "three";

import Cup from "./Cup";

export default class World {
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
    this.cupsContainer = new Object3D();

    const cup = new Cup();

    cup.object.scale.set(0.5, 0.5, 0.5);

    const cups = {
      first: cup.object.clone(),
      second: cup.object.clone()
    };

    cups.first.rotation.x = Math.PI / 2.4;
    cups.first.rotation.y = (Math.PI * 2) / 7;
    cups.first.position.x = 20;
    cups.first.position.y = -10;
    cups.first.position.z = -25 - 100;

    cups.second.rotation.x = Math.PI / 7;
    cups.second.rotation.y = -Math.PI / 9;
    cups.second.position.x = 100;
    cups.second.position.y = 10;
    cups.second.position.z = 15 - 150;

    ctx.animationController.add({
      mesh: cups.first,
      position: [0, -10, -25],
      scale: [1, 1, 1],
      duration: 3000,
      timingFunction: "easeInOutQuint",
      strategy: "to",
      delay: 200
    });

    ctx.animationController.add({
      mesh: cups.second,
      position: [0, 10, 15],
      scale: [1, 1, 1],
      duration: 3000,
      timingFunction: "easeInOutQuint",
      strategy: "to"
    });

    this.cupsContainer.add(cups.first);
    this.cupsContainer.add(cups.second);
    this.world.add(this.cupsContainer);
    this._cups = cups;
  }

  load(ctx) {}

  tick({ elapsed, frame }) {
    // Update cups
    for (const cupName in this._cups) {
      const cup = this._cups[cupName];
      cup.rotation.z = elapsed / 6000;
    }
    this._cups.second.rotation.x = Math.PI / 7 + Math.sin(elapsed / 7000) / 3;
    this._cups.second.rotation.y = -Math.PI / 9 + Math.sin(elapsed / 8000) / 2;

    // Raycaster
    const { x, y } = this._ctx.mouse;

    this._raycaster.setFromCamera(new Vector2(x, -y), this._ctx.camera.get());
    const intersects = this._raycaster.intersectObjects(
      this.cupsContainer.children,
      true
    );

    if (intersects.length) {
      console.log(intersects);
    }
  }
}
