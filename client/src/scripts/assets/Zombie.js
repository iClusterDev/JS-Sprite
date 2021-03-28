import Entity from '../core/Entity';

class Zombie extends Entity {
  constructor(config = {}) {
    super(config);
    this.speed = 2;
    this.direction = 'right';
  }

  reverseDirection() {
    this.speed = -this.speed;
    this.direction = this.direction === 'right' ? 'left' : 'right';
  }

  update(displayWidth, displayHeight) {
    console.log('DEBUG ~ update ~ this.position.x', this.width);
    if (this.position.x > displayWidth - this.width) {
      this.reverseDirection();
    } else if (this.position.x <= 0) {
      this.reverseDirection();
    }
    this.position.x += this.speed;
    this.animation.animate(this.direction);
  }
}

export default Zombie;
