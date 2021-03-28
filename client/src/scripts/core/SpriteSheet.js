// ==========================================================
// spritesheet
// FIXME
// fix for frameX/Y
// ==========================================================
class SpriteSheet {
  // #DEBUG = false;
  #buffer;
  #sourceFrameW;
  #sourceFrameH;
  #sourceFrameSet;

  constructor(config = {}) {
    const { spriteSheet, rows, columns, scale = 1 } = config;
    if (!spriteSheet || !rows || !columns)
      throw new Error('SpriteSheet(): Missing required parameter!');

    this.#sourceFrameSet = spriteSheet;
    this.#sourceFrameW = this.#sourceFrameSet.width / columns;
    this.#sourceFrameH = this.#sourceFrameSet.height / rows;

    this.#buffer = new OffscreenCanvas(
      (this.#sourceFrameSet.width / columns) * scale,
      (this.#sourceFrameSet.height / rows) * scale
    ).getContext('2d');
    this.#buffer.imageSmoothingEnabled = false;
  }

  get frameW() {
    return this.#buffer.canvas.width;
  }

  get frameH() {
    return this.#buffer.canvas.height;
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

    // this.#buffer.fillStyle = 'green';
    // this.#buffer.fillRect(
    //   0,
    //   0,
    //   this.#buffer.canvas.width,
    //   this.#buffer.canvas.height
    // );

    this.#buffer.drawImage(
      this.#sourceFrameSet,
      this.#sourceFrameW * column,
      this.#sourceFrameH * row,
      this.#sourceFrameW,
      this.#sourceFrameH,
      0,
      0,
      this.#buffer.canvas.width,
      this.#buffer.canvas.height
    );
    return this.#buffer.canvas;
  }
}

export default SpriteSheet;
