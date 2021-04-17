import Graphics from './Graphics';
import Animation from './Animation';
import Controller from './Controller';

class Entity {
  #name;
  #graphics;
  #position;
  #animation;
  #controller;
  #currentSprite;

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
   * @param {*} config.animation: Object - (*optional) animation settings
   *
   * @getter controller
   * @getter position
   * @getter sprite
   * @method animate()
   */
  constructor(config = {}) {
    const {
      name = null,
      input = null,
      position = null,
      graphics = null,
      animation = null,
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

    if (animation) {
      this.#animation = new Animation(animation);
      this.#currentSprite = this.#graphics.sprite(
        this.#animation.frameIndex.x,
        this.#animation.frameIndex.y
      );
    } else {
      this.#currentSprite = this.#graphics.sprite(0, 0);
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

  get position() {
    return this.#position;
  }

  get sprite() {
    if (this.#animation && this.#animation.frameChanged) {
      this.#currentSprite = this.#graphics.sprite(
        this.#animation.frameIndex.x,
        this.#animation.frameIndex.y
      );
    }
    return this.#currentSprite;
  }

  animate(action) {
    if (this.#animation) {
      this.#animation.animate(action);
    } else {
      throw new Error(
        `Entity: ${this.#name} doesn't have an animation component`
      );
    }
  }
}

export default Entity;
