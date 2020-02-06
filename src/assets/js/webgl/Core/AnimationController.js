import { timingFunctions } from "~/assets/js/utils";
import { Vector3 } from "three";

export default class AnimationController {
  /**
   * Class constructor
   */
  constructor(time) {
    time.on("tick", this.update.bind(this));

    this._homeworks = [];
  }

  /**
   * Update all needed animation
   */
  update({ delta }) {
    if (!this._homeworks.length) return;

    const newHomeworks = [];

    for (const homework of this._homeworks) {
      if (homework.delay - delta > 0) {
        // If there's still delay
        homework.delay -= delta;
        newHomeworks.push(homework);
      } else {
        homework.remainingTime -= delta;
        homework.remainingTime = Math.max(homework.remainingTime, 0);

        // Defining this tick ratio advanvement
        const ratio = timingFunctions[homework.timingFunction](
          1 - homework.remainingTime / homework.duration
        );
        const currentAdvancement = ratio - homework.previousRatio;
        homework.previousRatio = ratio;

        // Update position
        if (homework.needPosition) {
          homework.mesh.position.add(
            new Vector3(...homework.position).multiplyScalar(currentAdvancement)
          );
        }

        // Updation rotation
        if (homework.needRotation) {
          homework.mesh.rotation.set(
            ...homework.rotation.map(i => i * currentAdvancement)
          );
        }

        // Updation scale
        if (homework.needScale) {
          homework.mesh.scale.add(
            new Vector3(...homework.scale).multiplyScalar(currentAdvancement)
          );
        }

        if (homework.remainingTime) {
          // Continue if time remained
          newHomeworks.push(homework);
        } else {
          // Sanitize position
          this.sanitizeMesh(homework);

          // Handle callback
          if (homework.callback) {
            // Trigger callback function if needed
            if (homework.callback.function) {
              homework.callback.function();
            }

            // Handling case
            if (homework.callback.behavior === "repeat") {
              // If repeat behavior
              homework = this.resetAnim(homework);
              newHomeworks.push(homework);
            } else if (homework.callback.behavior === "reverse") {
              // If reverse behavior
              homework = this.resetAnim(homework);

              // Reverse value
              homework.position = homework.position.map(x => -x);
              homework.rotation = homework.rotation.map(x => -x);

              newHomeworks.push(homework);
            } else {
              // Default case
              if (!homework.callback.mesh) {
                homework.callback.mesh = homework.mesh;
              }
              homework.callback = this.sanitizeAnim(homework.callback);
              newHomeworks.push(homework.callback);
            }
          }
        }
      }
    }

    this._homeworks = newHomeworks;
  }

  /**
   * Sanitize an animaiton object
   * @param {object} animation - an animation object
   * @return {object} - a sanitized animation object
   */
  sanitizeAnim(animation) {
    animation = this.resetAnim(animation);

    animation.needPosition = !!animation.position;
    animation.position = animation.position || [0, 0, 0];
    animation.needRotation = !!animation.rotation;
    animation.rotation = animation.rotation || [0, 0, 0];
    animation.needScale = !!animation.scale;
    animation.scale = animation.scale || [0, 0, 0];

    animation.timingFunction = animation.timingFunction || "linear";

    animation.strategy = animation.strategy || "by";

    // Define real "by" value if "to" coord strategy
    if (animation.strategy === "to") {
      if (animation.needPosition) {
        const pos = animation.mesh.position;
        const initialPosition = [pos.x, pos.y, pos.z];
        animation.position = animation.position.map(
          (x, index) => x - initialPosition[index]
        );
      }

      if (animation.needRotation) {
        const rot = animation.mesh.rotation;
        const initialRotation = [rot.x, rot.y, rot.z];
        animation.rotation = animation.rotation.map(
          (x, index) => x - initialRotation[index]
        );
      }

      if (animation.needScale) {
        const scale = animation.mesh.scale;
        const initialScale = [scale.x, scale.y, scale.z];
        animation.scale = animation.scale.map(
          (x, index) => x - initialScale[index]
        );
      }
    }

    return animation;
  }

  /**
   * Reset animation properties
   * @param {object} animation - an animation object
   * @return {object} - a reseted animation object
   */
  resetAnim(animation) {
    animation.remainingTime = animation.duration;
    animation.delay = animation.delay || 0;
    animation.previousRatio = 0;

    return animation;
  }

  /**
   * Sanitize mesh position and rotation
   * @param {object} animation - animation object
   * @param {int} position - position precision
   * @param {int} rotation - rotation precision
   */
  sanitizeMesh(
    { mesh, needPosition, needRotation, needScale },
    position = 10,
    rotation = 10000,
    scale = 100
  ) {
    if (needPosition) {
      mesh.position.set(
        ...mesh.position.toArray().map(i => Math.round(i * position) / position)
      );
    }

    if (needRotation) {
      mesh.rotation.set(
        ...mesh.rotation
          .toArray()
          .slice(0, 3)
          .map(i => Math.round(i * rotation) / rotation)
      );
    }

    if (needScale) {
      mesh.scale.set(
        ...mesh.scale
          .toArray()
          .map(i => Math.max(Math.round(i * scale) / scale, 0.001))
      );
    }
  }

  /**
   * Add an animation to homeworks
   * @param {object} animation - an animation object
   */
  add(animation) {
    if (!animation.mesh || !animation.duration) return;
    animation = this.sanitizeAnim(animation);
    this._homeworks.push(animation);
  }
}

/*
Config example
{
  mesh: Object3D mesh
  position: [x, y, z] amount to add
  rotation: [x, y, z] amount to add
  scale: [x, y, z] amount to add
  duration: number of miliseconds to last (1000 = 1s)
  delay: delay before animation start (1000 = 1s)
  timingFunction: a timing function (see utils.js)
  strategy: default "by": move by value... can be "to": move to coord...
  callback: another animation object if needed
    key behavior with "repeat" or "reverse" can be added to repeat previous animation
    key function can be added, it'll be execute when previous animation is done
}
*/
