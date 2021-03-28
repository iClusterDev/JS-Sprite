class Display {
  #fullscreen = false;
  #aspectRatio = null;
  #maxWidth = null;
  #context = null;
  #canvas = null;

  constructor(width = null, height = null) {
    if (Display.instance) {
      return Display.instance;
    } else {
      this.#canvas = document.querySelector('#canvas');

      if (!width || !height) this.#fullscreen = true;
      if (this.#fullscreen) {
        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;
      } else {
        this.#canvas.width = width;
        this.#canvas.height = height;
        this.#aspectRatio = height / width;
        this.#maxWidth = width;
      }

      this.#context = this.#canvas.getContext('2d');
      this.#context.imageSmoothingEnabled = false;

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
    window.addEventListener('resize', (e) => {
      e.preventDefault();
      this.#resize();
    });
  }

  #resize() {
    if (this.#fullscreen) {
      this.#canvas.width = window.innerWidth;
      this.#canvas.height = window.innerHeight;
    } else {
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
  }

  clear() {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  render(frame, positionX, positionY) {
    this.#context.drawImage(
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
