import {
  Mesh,
  Object3D,
  CylinderBufferGeometry,
  DoubleSide,
  FrontSide,
  BackSide,
  RingBufferGeometry,
  CircleBufferGeometry,
  BoxBufferGeometry,
  MeshPhysicalMaterial
} from "three";

export default class Cup {
  constructor({
    radiusTop = 3.5,
    radiusBottom = 2.5,
    height = 11.5,
    supportsNum = 9,
    details = 30
  } = {}) {
    this.object = new Object3D();
    this.cup = new Object3D();

    const material = {
      color: 0xbbbbaa,
      transparent: true,
      opacity: 0.75,
      roughness: 0.7,
      metalness: 0.2,
      reflectivity: 0.5,
      depthTest: true,
      depthWrite: true
    };

    const frontMaterial = new MeshPhysicalMaterial({
      ...material,
      side: FrontSide
    });
    const backMaterial = new MeshPhysicalMaterial({
      ...material,
      side: BackSide
    });
    const doubleMaterial = new MeshPhysicalMaterial({
      ...material,
      side: DoubleSide
    });

    const bodyGeometry = new CylinderBufferGeometry(
      radiusTop,
      radiusBottom,
      height,
      details,
      1,
      true
    );

    const outerSide = new Mesh(bodyGeometry, frontMaterial);
    this.cup.add(outerSide);

    const innerSide = new Mesh(
      bodyGeometry.clone().scale(0.96, 1, 0.96),
      backMaterial
    );
    this.cup.add(innerSide);

    const topRing = new Mesh(
      new RingBufferGeometry(radiusTop * 0.95, radiusTop, details),
      frontMaterial
    );
    topRing.rotation.x = -Math.PI / 2;
    topRing.position.y = height / 2;
    this.cup.add(topRing);

    const bottom = new Mesh(
      new CircleBufferGeometry(radiusBottom, details),
      doubleMaterial
    );
    bottom.rotation.x = Math.PI / 2;
    bottom.position.y = -height / 2;
    this.cup.add(bottom);

    const supports = new Object3D();

    for (let i = 0; i < supportsNum; i++) {
      const support = new Mesh(
        new BoxBufferGeometry(height / 100, height / 10, height / 100),
        frontMaterial
      );
      support.rotation.y = ((Math.PI * 2) / supportsNum) * i;
      support.translateZ(radiusBottom * 0.97);
      supports.add(support);
    }
    supports.position.y = height / 20 - height / 2;
    this.cup.add(supports);

    this.cup.rotation.x = -Math.PI / 2;
    this.cup.scale.set(5, 5, 5);

    this.object.add(this.cup);
  }
}
