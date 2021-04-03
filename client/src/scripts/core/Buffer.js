class Buffer {
  #buffer;

  constructor(width = 0, height = 0) {
    if (width === 0 || height === 0)
      throw new Error(`Buffer: width and height are required!`);

    this.#buffer = new OffscreenCanvas(width, height).getContext('2d');
    this.#buffer.imageSmoothingEnabled = false;
  }

  get image() {
    return this.#buffer.canvas;
  }

  get width() {
    return this.#buffer.canvas.width;
  }

  get height() {
    return this.#buffer.canvas.height;
  }

  clear() {
    this.#buffer.clearRect(
      0,
      0,
      this.#buffer.canvas.width,
      this.#buffer.canvas.height
    );
  }

  draw(
    source,
    sourceX,
    sourceY,
    sourceW,
    sourceH,
    destX = null,
    destY = null,
    destW = null,
    destH = null
  ) {
    this.#buffer.drawImage(
      source,
      sourceX,
      sourceY,
      sourceW,
      sourceH,
      destX || 0,
      destY || 0,
      destW || this.#buffer.canvas.width,
      destH || this.#buffer.canvas.height
    );
  }
}

export default Buffer;
