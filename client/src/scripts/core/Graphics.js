import Buffer from './Buffer';
import Animation from './Animation';

class Graphics {
  #buffer;
  #source;
  #spriteWidth;
  #spriteHeight;
  #animation;

  /**
   * Graphics
   *
   * Offscreen buffer holding a sprite extracted from a
   * given spritesheet passed in as constructor parameter.
   * The sprite(column, row) function will return
   * the sprite image at the selected location
   *
   * @param {*} config Object - Configuration object
   * @param {*} config.spritesheet Image - spritesheet image type
   * @param {*} config.columns Number - number of columns
   * @param {*} config.rows Number - number of rows
   * @param {*} config.scale Number - (*optional) scalar to apply
   * @param {*} config.animation Object - (*optional) animation config
   *
   * @method sprite(rows, columns)
   */
  constructor(config = {}) {
    const {
      spritesheet = null,
      columns = null,
      rows = null,
      scale = 1,
      animation = null,
    } = config;
    if (!spritesheet || !rows || !columns)
      throw new Error(
        'Graphics: spritesheet, rows & columns are required parameter!'
      );

    this.#source = spritesheet;
    this.#spriteWidth = spritesheet.width / columns;
    this.#spriteHeight = spritesheet.height / rows;

    this.#buffer = new Buffer({
      width: (spritesheet.width / columns) * scale,
      height: (spritesheet.height / rows) * scale,
    });

    if (animation) {
      this.#animation = new Animation(animation);
      this.#drawSprite(
        this.#animation.frameIndex.x,
        this.#animation.frameIndex.y
      );
    } else {
      this.#drawSprite(0, 0);
    }
  }

  get sprite() {
    if (this.#animation && this.#animation.frameChanged) {
      this.#drawSprite(
        this.#animation.frameIndex.x,
        this.#animation.frameIndex.y
      );
    }
    return this.#buffer.canvas;
  }

  set sprite({ column = 0, row = 0 }) {
    this.#drawSprite(column, row);
  }

  #drawSprite(columnIndex, rowIndex) {
    this.#buffer.clear();
    this.#buffer.draw(
      this.#source,
      this.#spriteWidth * columnIndex,
      this.#spriteHeight * rowIndex,
      this.#spriteWidth,
      this.#spriteHeight
    );
  }

  animate(action) {
    if (this.#animation) {
      this.#animation.animate(action);
    } else {
      throw new Error(`Graphics: no animation component found!`);
    }
  }
}

export default Graphics;
