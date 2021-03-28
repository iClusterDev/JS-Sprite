import Player from '../core/Player';

class Cross extends Player {
  constructor(config = {}) {
    super(config);
    this.speed = 4;
  }

  update() {
    if (this.controller.up.isActive) {
      this.position.y -= this.speed;
    } else if (this.controller.right.isActive) {
      this.position.x += this.speed;
    } else if (this.controller.down.isActive) {
      this.position.y += this.speed;
    } else if (this.controller.left.isActive) {
      this.position.x -= this.speed;
    }
  }
}

export default Cross;
