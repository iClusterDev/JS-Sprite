import Player from '../core/Player';

class Paddle extends Player {
  constructor(config = {}) {
    super(config);
    this.speed = 8;
  }

  update(displayW) {
    const minPositionX = 0;
    const maxPositionX = displayW - this.width;

    if (this.controller.right.isActive & (this.position.x < maxPositionX)) {
      this.position.x += this.speed;
    }
    if (this.controller.left.isActive & (this.position.x > minPositionX)) {
      this.position.x -= this.speed;
    }
  }
}

export default Paddle;
