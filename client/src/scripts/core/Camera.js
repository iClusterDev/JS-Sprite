import Buffer from './Buffer';

const DEBUG = true;
const DISPLAY_W = 832;
const DISPLAY_H = 640;
const LAYER_W = DISPLAY_W * 3;
const LAYER_H = DISPLAY_H;

class Camera {
  constructor(config = {}) {
    const { width = null, height = null, follow: target = null } = config;

    if (DEBUG) {
      this.buffer = new Buffer({ width, height });
      this.buffer.context.fillStyle = 'rgba(255, 0, 0, 0.025)';
      this.buffer.context.fillRect(0, 0, this.buffer.width, this.buffer.height);
    }

    this.width = width;
    this.height = height;
    this.target = target;
    this.offset = {
      x: width / 2,
      y: height / 2,
    };
  }

  get focus() {
    return {
      x: this.target.position.x + this.target.sprite.width / 2,
      y: this.target.position.y + this.target.sprite.height / 2,
    };
  }

  // FIXME
  // camera needs the display size
  get position() {
    let positionX = this.focus.x - this.offset.x;
    if (positionX < 0) {
      positionX = 0;
    } else if (positionX + this.width > LAYER_W)
      positionX = LAYER_W - this.width;

    let positionY = this.focus.y - this.offset.y;
    if (positionY < 0) {
      positionY = 0;
    } else if (positionY + this.height > LAYER_H)
      positionY = LAYER_H - this.height;

    return {
      x: positionX,
      y: positionY,
    };
  }
}

export default Camera;
