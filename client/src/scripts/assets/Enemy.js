import Entity from '../core/Entity';

class Enemy extends Entity {
  constructor(config = {}) {
    super(config);

    this.updated = false;
    this.speed = {
      x: 0.2,
      y: 0.2,
    };
  }

  update(elapsedTime) {}
}

export default Enemy;
