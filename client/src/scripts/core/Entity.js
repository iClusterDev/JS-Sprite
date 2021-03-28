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
    const { position = null, graphics = null, animation = null } = config;
    if (!position || !graphics)
      throw new Error(
        'Entity: both position and graphics parameters are required!'
      );

    this.position = position;
    this.graphics = new SpriteSheet(graphics);

    if (animation) {
      this.animation = new Animation(animation);
      this.currentFrame = this.graphics.getFrame(
        this.animation.frameIndex.x,
        this.animation.frameIndex.y
      );
    } else {
      // FIXME
      // this could be better by
      // allowing a massive shared spritesheet
      // especially for level design?
      this.currentFrame = this.graphics.getFrame(0, 0);
    }
  }

  get width() {
    return this.graphics.frameW;
  }

  get height() {
    return this.graphics.frameW;
  }

  get frame() {
    if (this.animation && this.animation.frameChanged) {
      this.currentFrame = this.graphics.getFrame(
        this.animation.frameIndex.x,
        this.animation.frameIndex.y
      );
    }
    return this.currentFrame;
  }
}

export default Entity;
