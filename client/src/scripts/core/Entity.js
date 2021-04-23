import Graphics from './Graphics';
import Controller from './Controller';

class Entity {
  #name = null;
  #solid = null;
  #dynamic = null;
  #graphics = null;
  #position = null;
  #controller = null;

  /**
   * Game object
   *
   * Animated or static game object.
   * If animated, an animation object setting will be required,
   * otherwise the entity will be set to be static
   *
   * @param {*} config
   * @param {*} config.controller: Array - (*optional) controller settings
   * @param {*} config.position: Object - x/y coordinates on canvas
   * @param {*} config.graphics: Object - spritesheet settings
   *
   * @getter controller
   * @getter graphics
   * @getter position
   */
  constructor(config = {}) {
    const {
      name = null,
      solid = null,
      dynamic = null,
      position = null,
      graphics = null,
      controller = null,
    } = config;
    if (!name || !solid || !dynamic || !position || !graphics)
      throw new Error(
        'Entity: name, solid, dynamic, position and graphics parameters are required!'
      );

    this.#name = name;
    this.#solid = solid;
    this.#dynamic = dynamic;
    this.#position = position;
    this.#graphics = new Graphics(graphics);

    this.#controller = controller ? new Controller(controller) : null;
  }

  get name() {
    return this.#name;
  }

  get solid() {
    return this.#solid;
  }

  get dynamic() {
    return this.#dynamic;
  }

  get position() {
    return this.#position;
  }

  get graphics() {
    return this.#graphics;
  }

  get controller() {
    if (this.#controller) {
      return this.#controller;
    } else {
      throw new Error(
        `Entity: ${this.#name} doesn't have an controller component`
      );
    }
  }
}

export default Entity;
