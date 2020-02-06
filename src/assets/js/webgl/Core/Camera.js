import { PerspectiveCamera, Vector3, Object3D } from "three";

export default class Camera {
  constructor(ctx) {
    this._ctx = ctx;

    this.gimbalLiberty = 50;
    this.breathingLiberty = 10;
    this.desktopOffset = 20;

    this.init(ctx);
  }

  init(ctx) {
    // Definition
    const camera = new PerspectiveCamera(
      50,
      ctx.sizes.width / ctx.sizes.height,
      1,
      2000
    );
    camera.up.set(0, 0, -1);

    const origin = new Object3D();
    const responsive = new Object3D();
    const target = new Object3D();
    const gimbal = new Object3D();

    // scene > origin > responsive > target > gimbal > camera
    gimbal.add(camera);
    target.add(gimbal);
    responsive.add(target);
    origin.add(responsive);
    ctx.scene.add(origin);

    // Events
    ctx.sizes.on("resize", ({ width, height }) => {
      this.updateCamera(width, height);
      this.updateResponsive(width, height);
    });

    ctx.time.on("tick", ({ elapsed }) => {
      this.updateGimbalPosition(elapsed);
      this.lookAtTarget();
    });

    // Saving
    this.instance = camera;
    this.target = target;
    this.gimbal = gimbal;
    this.responsive = responsive;
    this.origin = origin;

    // Init
    this.updateResponsive(ctx.sizes.width, ctx.sizes.height);
  }

  setTargetPosition(x, y, z) {
    this.target.position.set(x, y, z);
  }

  setPosition(x, y, z) {
    this.instance.position.set(x, y, z);
  }

  updateGimbalPosition(elapsed) {
    const offsetX = this.gimbalLiberty * this._ctx.mouse.easedX;

    const globalEased = Math.max(
      Math.abs(this._ctx.mouse.easedX),
      Math.abs(this._ctx.mouse.easedY)
    );
    const offsetY =
      Math.sin(elapsed / 2000) * this.breathingLiberty -
      this.breathingLiberty * 2 * globalEased;

    const offsetZ = this.gimbalLiberty * this._ctx.mouse.easedY;

    this.gimbal.position.set(offsetX, offsetY, offsetZ);
  }

  lookAtTarget() {
    this.instance.lookAt(this.target.getWorldPosition(new Vector3(0, 0, 0)));
  }

  updateCamera(width, height) {
    this.instance.aspect = width / height;
    this.instance.updateProjectionMatrix();
  }

  updateResponsive(width, height) {
    if (width > 1024) {
      this.responsive.position.set(-40, 0, 0);
    } else {
      this.responsive.position.set(0, 0, 0);
    }
  }

  get() {
    return this.instance;
  }
}
