// ==========================================================
// spritesheet
// ==========================================================
class SpriteSheet {
  #buffer;

  constructor(config = {}) {
    const { spriteSheet, rows, columns, scale = 1 } = config;
    if (!spriteSheet || !rows || !columns)
      throw new Error('SpriteSheet(): Missing required parameter!');

    // this.spriteSheet = spriteSheet;
    this.frameSet = spriteSheet;
    this.frameW = this.frameSet.width / columns;
    this.frameH = this.frameSet.height / rows;

    this.#buffer = new OffscreenCanvas(
      this.frameW * scale,
      this.frameH * scale
    ).getContext('2d');
  }

  clearFrame() {
    this.#buffer.clearRect(
      0,
      0,
      this.#buffer.canvas.width,
      this.#buffer.canvas.height
    );
  }

  getFrame(column, row) {
    this.clearFrame();
    this.#buffer.drawImage(
      this.frameSet,
      this.frameW * column,
      this.frameH * row,
      this.frameW,
      this.frameH,
      0,
      0,
      this.#buffer.canvas.width,
      this.#buffer.canvas.height
    );
    return this.#buffer.canvas;
  }
}

export default SpriteSheet;
