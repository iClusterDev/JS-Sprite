class Buffer {
  #buffer;

  /**
   * Game Buffer
   *
   * Generic offscreen canvas.
   * Width and Height are required parameters;
   * if the id parameter is padssed in, the canvas
   * will be taken from the DOM
   *
   * @param {*} id - (*optional) String: DOM canvas element id
   * @param {*} width - Number: canvas width
   * @param {*} height - Number: canvas height
   *
   * @getter canvas
   * @getter height
   * @getter width
   * @method draw()
   * @method clear()
   */
  constructor(width = 0, height = 0, id = null) {
    if (width === 0 || height === 0)
      throw new Error(`Buffer: width and height are required!`);

    if (id) {
      // grab from DOM
      const canvas = document.querySelector(id);
      canvas.width = width;
      canvas.height = height;
      this.#buffer = canvas.getContext('2d');
    } else {
      this.#buffer = new OffscreenCanvas(width, height).getContext('2d');
    }

    this.#buffer.imageSmoothingEnabled = false;
  }

  get canvas() {
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
