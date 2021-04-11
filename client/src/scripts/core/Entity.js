import Graphics from './Graphics';
import Animation from './Animation';

class Entity {
  #graphics;
  #animation;
  #currentSprite;

  /**
   * Game object
   *
   * Animated or static game object.
   * If animated, an animation object setting will be required,
   * otherwise the entity will be set to be static
   * @param {*} config
   * @param {*} config.position: Object - x/y coordinates on canvas
   * @param {*} config.graphics: Object - spritesheet settings
   * @param {*} config.animation: Object - (*optional) animation settings
   */
  constructor(config = {}) {
    const { position = null, graphics = null, animation = null } = config;
    if (!position || !graphics)
      throw new Error('Entity: position and graphics parameters are required!');

    this.position = position;
    this.#graphics = new Graphics(graphics);

    if (animation) {
      this.#animation = new Animation(animation);
      this.#currentSprite = this.#graphics.sprite(
        this.#animation.frameIndex.x,
        this.#animation.frameIndex.y
      );
    } else {
      // FIXME
      // this could be better by
      // allowing a massive shared spritesheet
      // especially for level design?
      this.#currentSprite = this.#graphics.sprite(0, 0);
    }
  }

  get width() {
    return this.#graphics.spriteW;
  }

  get height() {
    return this.#graphics.spriteW;
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
}

export default Entity;
