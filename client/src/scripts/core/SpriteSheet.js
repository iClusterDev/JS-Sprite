class Buffer {
  constructor(width = 0, height = 0) {
    if (width === 0 || height === 0)
      throw new Error(`Buffer: width and height are required!`);

    this.buffer = new OffscreenCanvas(width, height).getContext('2d');
    this.buffer.imageSmoothingEnabled = false;
  }

  get image() {
    return this.buffer.canvas;
  }

  get width() {
    return this.buffer.canvas.width;
  }

  get height() {
    return this.buffer.canvas.height;
  }

  clear() {
    this.buffer.clearRect(
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height
    );
  }

  draw(source, sourceX, sourceY, sourceW, sourceH) {
    this.buffer.drawImage(
      source,
      sourceX,
      sourceY,
      sourceW,
      sourceH,
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height
    );
  }
}

class Graphics extends Buffer {
  #sourceSpriteSheet;
  #sourceSpriteW;
  #sourceSpriteH;

  constructor(config = {}) {
    const { spriteSheet, rows, columns, scale = 1 } = config;
    if (!spriteSheet || !rows || !columns)
      throw new Error('Sprite: Missing required parameter!');
    super(
      (spriteSheet.width / columns) * scale,
      (spriteSheet.height / rows) * scale
    );

    this.#sourceSpriteSheet = spriteSheet;
    this.#sourceSpriteW = this.#sourceSpriteSheet.width / columns;
    this.#sourceSpriteH = this.#sourceSpriteSheet.height / rows;
  }

  getSprite(column, row) {
    this.buffer.clear();
    this.buffer.draw(
      this.#sourceSpriteSheet,
      this.#sourceSpriteW * column,
      this.#sourceSpriteH * row,
      this.#sourceSpriteW,
      this.#sourceSpriteH
    );
    return this.buffer.image;
  }
}

// ==========================================================
// spritesheet
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

    this.#buffer = new Buffer(
      (this.#sourceSpriteSet.width / columns) * scale,
      (this.#sourceSpriteSet.height / rows) * scale
    );
  }

  get spriteW() {
    return this.#buffer.width;
  }

  get spriteH() {
    return this.#buffer.height;
  }

  getSprite(column, row) {
    this.#buffer.clear();
    this.#buffer.draw(
      this.#sourceSpriteSet,
      this.#sourceSpriteW * column,
      this.#sourceSpriteH * row,
      this.#sourceSpriteW,
      this.#sourceSpriteH
    );
    return this.#buffer.image;
  }
}

export default SpriteSheet;
