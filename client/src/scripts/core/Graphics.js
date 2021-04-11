import Buffer from './Buffer';

class Graphics {
  #buffer;
  #sourceSpriteW;
  #sourceSpriteH;
  #sourceSpriteSheet;

  constructor(config = {}) {
    const { spriteSheet, rows, columns, scale = 1 } = config;
    if (!spriteSheet || !rows || !columns)
      throw new Error('Sprite: Missing required parameter!');

    this.#buffer = new Buffer(
      (spriteSheet.width / columns) * scale,
      (spriteSheet.height / rows) * scale
    );

    this.#sourceSpriteSheet = spriteSheet;
    this.#sourceSpriteW = this.#sourceSpriteSheet.width / columns;
    this.#sourceSpriteH = this.#sourceSpriteSheet.height / rows;
  }

  get spriteW() {
    return this.#buffer.width;
  }

  get spriteH() {
    return this.#buffer.height;
  }

  sprite(column, row) {
    this.#buffer.clear();
    this.#buffer.draw(
      this.#sourceSpriteSheet,
      this.#sourceSpriteW * column,
      this.#sourceSpriteH * row,
      this.#sourceSpriteW,
      this.#sourceSpriteH
    );
    return this.#buffer.image;
  }
}

export default Graphics;
