// ==========================================================
// spritesheet
// FIXME
// fix for spriteX/Y
// ==========================================================
class SpriteSheet {
  #buffer;
  #sourceSpriteW;
  #sourceSpriteH;
  #sourceSpriteSet;

  constructor(config = {}) {
    const { spriteSheet, rows, columns, scale = 1 } = config;
    if (!spriteSheet || !rows || !columns)
      throw new Error('SpriteSheet(): Missing required parameter!');

    this.#sourceSpriteSet = spriteSheet;
    this.#sourceSpriteW = this.#sourceSpriteSet.width / columns;
    this.#sourceSpriteH = this.#sourceSpriteSet.height / rows;

    this.#buffer = new OffscreenCanvas(
      (this.#sourceSpriteSet.width / columns) * scale,
      (this.#sourceSpriteSet.height / rows) * scale
    ).getContext('2d');
    this.#buffer.imageSmoothingEnabled = false;
  }

  get spriteW() {
    return this.#buffer.canvas.width;
  }

  get spriteH() {
    return this.#buffer.canvas.height;
  }

  #clearSprite() {
    this.#buffer.clearRect(
      0,
      0,
      this.#buffer.canvas.width,
      this.#buffer.canvas.height
    );
  }

  getSprite(column, row) {
    this.#clearSprite();

    // this.#buffer.fillStyle = 'green';
    // this.#buffer.fillRect(
    //   0,
    //   0,
    //   this.#buffer.canvas.width,
    //   this.#buffer.canvas.height
    // );

    this.#buffer.drawImage(
      this.#sourceSpriteSet,
      this.#sourceSpriteW * column,
      this.#sourceSpriteH * row,
      this.#sourceSpriteW,
      this.#sourceSpriteH,
      0,
      0,
      this.#buffer.canvas.width,
      this.#buffer.canvas.height
    );
    return this.#buffer.canvas;
  }
}

export default SpriteSheet;
