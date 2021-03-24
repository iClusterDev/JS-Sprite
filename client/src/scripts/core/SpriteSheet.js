// ==========================================================
// spritesheet
// ==========================================================
class SpriteSheet {
  #buffer;

  constructor(config = {}) {
    const { spriteSheet, rows, columns, scale = 1 } = config;
    if (!spriteSheet || !rows || !columns)
      throw new Error('SpriteSheet(): Missing required parameter!');

    this.#buffer = new OffscreenCanvas(
      spriteSheet.width * scale,
      spriteSheet.height * scale
    ).getContext('2d');

    this.frameW = (spriteSheet.width / columns) * scale;
    this.frameH = (spriteSheet.height / rows) * scale;

    this.#buffer.drawImage(
      spriteSheet,
      0,
      0,
      spriteSheet.width * scale,
      spriteSheet.height * scale
    );
  }

  getFrame(column, row) {
    return this.#buffer.getImageData(
      this.frameW * column,
      this.frameH * row,
      this.frameW,
      this.frameH
    );
  }
}

export default SpriteSheet;
