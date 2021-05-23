import Entity from '../core/Entity';

class Enemy extends Entity {
  constructor(config = {}) {
    super(config);

    this.updated = false;
    this.speed = {
      x: 0.2,
      y: 0.4,
    };
  }

  update(elapsedTime) {
    this.position.y += this.speed.y * elapsedTime;
    if (this.position.y < 0) {
      this.position.y = 0;
      this.speed.y = -this.speed.y;
    }

    if (this.position.y > 416) {
      this.position.y = 416;
      this.speed.y = -this.speed.y;
    }
  }
}

export default Enemy;
