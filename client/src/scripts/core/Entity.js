import Animation from './Animation';
import SpriteSheet from './SpriteSheet';

class Entity {
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
    const {
      // type = null,
      position = null,
      graphics = null,
      animation = null,
    } = config;
    if (!position || !graphics)
      throw new Error('Entity: position and graphics parameters are required!');

    // this.type = type;
    this.position = position;
    this.graphics = new SpriteSheet(graphics);

    if (animation) {
      this.animation = new Animation(animation);
      this.currentSprite = this.graphics.getSprite(
        this.animation.frameIndex.x,
        this.animation.frameIndex.y
      );
    } else {
      // FIXME
      // this could be better by
      // allowing a massive shared spritesheet
      // especially for level design?
      this.currentSprite = this.graphics.getSprite(0, 0);
    }
  }

  get width() {
    return this.graphics.spriteW;
  }

  get height() {
    return this.graphics.spriteW;
  }

  get sprite() {
    if (this.animation && this.animation.frameChanged) {
      this.currentSprite = this.graphics.getSprite(
        this.animation.frameIndex.x,
        this.animation.frameIndex.y
      );
    }
    return this.currentSprite;
  }
}

export default Entity;
