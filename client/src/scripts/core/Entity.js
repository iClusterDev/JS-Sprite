import Graphics from './Graphics';
import Animation from './Animation';
import Controller from './Controller';

class Entity {
  #name = null;
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
   * @param {*} config.input: Array - (*optional) controller settings
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
      input = null,
      position = null,
      graphics = null,
    } = config;
    if (!name || !position || !graphics)
      throw new Error(
        'Entity: name, position and graphics parameters are required!'
      );

    this.#name = name;
    this.#position = position;
    this.#graphics = new Graphics(graphics);

    if (input) {
      this.#controller = new Controller(input);
    }
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

  get graphics() {
    if (this.#graphics) {
      return this.#graphics;
    } else {
      throw new Error(
        `Entity: ${this.#name} doesn't have an graphics component`
      );
    }
  }

  get position() {
    return this.#position;
  }
}

export default Entity;
