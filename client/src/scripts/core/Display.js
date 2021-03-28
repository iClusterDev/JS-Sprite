class Display {
  #aspectRatio = null;
  #maxWidth = null;
  #buffer = null;
  #canvas = null;

  /**
   * Game display (singleton)
   *
   * A DOM canvas object is required to initialize the game display.
   * The DOM canvas id must be passed as parameter in the config object.
   * Width & height are also required in order to keep
   * the same aspect ratio on window "resize".
   * The Display aspect ratio will be set based
   * on the given width and height.
   * By pressing "F" Display will go in fullscreen mode.
   * @param {*} config
   * @param {*} config.id - String: id of the DOM canvas element
   * @param {*} config.width - Number: display width
   * @param {*} config.height - Number: display height
   */
  constructor(config = {}) {
    if (Display.instance) {
      return Display.instance;
    } else {
      const { width = null, height = null, id = null } = config;
      if (!id || !width || !height)
        throw new Error(`Display: missing required parameters!`);

      this.#canvas = document.querySelector(id);
      this.#canvas.width = width;
      this.#canvas.height = height;
      this.#maxWidth = width;
      this.#aspectRatio = height / width;

      this.#buffer = this.#canvas.getContext('2d');
      this.#buffer.imageSmoothingEnabled = false;

      this.#init();

      Display.instance = this;
      return this;
    }
  }

  get width() {
    return this.#canvas.width;
  }

  get height() {
    return this.#canvas.height;
  }

  #init() {
    window.addEventListener('keypress', (event) => {
      if (event.code === 'KeyF') {
        this.#toggleFullscreen();
      }
    });

    window.addEventListener('resize', (e) => {
      e.preventDefault();
      if (!document.fullscreenElement) {
        this.#resize();
      }
    });
  }

  #toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.#canvas.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  #resize() {
    const { innerWidth: width, innerHeight: height } = window;
    let newWidth,
      newHeight = 0;
    if (height / width >= this.#aspectRatio) {
      newWidth = width;
      newHeight = width * this.#aspectRatio;
    } else {
      newWidth = height / this.#aspectRatio;
      newHeight = height;
    }
    if (newWidth >= this.#maxWidth) {
      this.#canvas.width = this.#maxWidth;
      this.#canvas.height = this.#maxWidth * this.#aspectRatio;
    } else {
      this.#canvas.width = newWidth;
      this.#canvas.height = newHeight;
    }
  }

  clear() {
    this.#buffer.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#buffer.fillStyle = 'red';
    this.#buffer.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  render(frame, positionX, positionY) {
    this.#buffer.drawImage(
      frame,
      0,
      0,
      frame.width,
      frame.height,
      positionX,
      positionY,
      frame.width,
      frame.height
    );
  }
}

export default Display;
