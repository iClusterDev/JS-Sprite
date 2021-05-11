import Graphics from './Graphics';
import Controller from './Controller';
import Randomizer from './Randomizer';

class Entity {
  #id = null;
  #name = null;
  #solid = null;
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
      position = null,
      graphics = null,
      controller = null,
    } = config;
    if (!name || !solid || !position || !graphics)
      throw new Error(
        'Entity: name, solid, dynamic, position and graphics parameters are required!'
      );

    this.#id = Randomizer.id();
    this.#name = name;
    this.#solid = solid;
    this.#position = position;
    this.#graphics = new Graphics(graphics);

    this.#controller = controller ? new Controller(controller) : null;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get solid() {
    return this.#solid;
  }

  // FIXME
  // get rid of this
  // get graphics() {
  //   return this.#graphics;
  // }

  get sprite() {
    return this.#graphics.sprite;
  }

  get position() {
    return this.#position;
  }

  // FIXME
  // the tile position must have x & y
  set position(position = { x: 0, y: 0 }) {
    return (this.#position = position);
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
