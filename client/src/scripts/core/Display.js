import Buffer from './Buffer';

class Display extends Buffer {
  #aspectRatio = null;
  #maxWidth = null;

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
   *
   * @getter width
   * @getter height
   * @getter canvas
   * @method clear()
   * @method draw()
   */
  constructor(config = {}) {
    if (Display.instance) {
      return Display.instance;
    } else {
      const {
        id = '',
        width = 832,
        height = 640,
        color = 'transparent',
      } = config;

      if (id.length === 0)
        throw new Error(`Display: id is required parameters!`);

      super({
        id,
        width,
        height,
        color,
      });

      this.#maxWidth = width;
      this.#aspectRatio = height / width;

      this.#init();

      Display.instance = this;
      return this;
    }
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
      this.canvas.requestFullscreen();
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
      this.canvas.width = this.#maxWidth;
      this.canvas.height = this.#maxWidth * this.#aspectRatio;
    } else {
      this.canvas.width = newWidth;
      this.canvas.height = newHeight;
    }
  }
}

export default Display;
