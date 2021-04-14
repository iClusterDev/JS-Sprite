import Buffer from './Buffer';

class Graphics {
  #buffer;
  #source;

  /**
   * Graphics
   *
   * Offscreen buffer holding a sprite extracted from a
   * given spritesheet passed in as constructor parameter.
   * The sprite(column, row) function will return
   * the sprite image at the selected location
   *
   * @param {*} config
   * @param {*} config.spriteSheet: Image - spritesheet image type
   * @param {*} config.columns: Number - number of columns
   * @param {*} config.rows: Number - number of rows
   * @param {*} config.scale: Number - (*optional) scalar to apply
   *
   * @method sprite(rows, columns)
   */
  constructor(config = {}) {
    const { spriteSheet, rows, columns, scale = 1 } = config;
    if (!spriteSheet || !rows || !columns)
      throw new Error(
        'Graphics: spriteSheet, rows & columns are required parameter!'
      );

    this.#buffer = new Buffer(
      (spriteSheet.width / columns) * scale,
      (spriteSheet.height / rows) * scale
    );
    this.#source = spriteSheet;
  }

  sprite(columnIndex, rowIndex) {
    this.#buffer.clear();
    this.#buffer.draw(
      this.#source,
      this.#source.width * columnIndex,
      this.#source.height * rowIndex,
      this.#source.width,
      this.#source.height
    );
    return this.#buffer.canvas;
  }
}

export default Graphics;
