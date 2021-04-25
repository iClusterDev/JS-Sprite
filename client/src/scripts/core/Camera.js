import Buffer from './Buffer';

const debug = true;
class Camera {
  constructor(config = {}) {
    const { width = null, height = null, follow: target = null } = config;

    if (debug) {
      this.buffer = new Buffer(width, height);
      this.buffer.context.fillStyle = 'rgba(255, 0, 0, 0.25)';
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
      x: this.target.position.x + this.target.graphics.sprite.width / 2,
      y: this.target.position.y + this.target.graphics.sprite.height / 2,
    };
  }

  get position() {
    let positionX = this.focus.x - this.offset.x;
    if (positionX < 0) {
      positionX = 0;
    } else if (positionX + this.width > 800) positionX = 800 - this.width;

    let positionY = this.focus.y - this.offset.y;
    if (positionY < 0) {
      positionY = 0;
    } else if (positionY + this.height > 600) positionY = 600 - this.height;

    return {
      x: positionX,
      y: positionY,
    };
  }
}

export default Camera;
