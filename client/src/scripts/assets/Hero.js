import Player from '../core/Player';

class Hero extends Player {
  constructor(config = {}) {
    super(config);
    this.speed = 2;
  }

  idle() {
    const currentAction = this.animation.action;
    switch (currentAction) {
      case 'up':
        this.animation.animate('upIdle');
        break;
      case 'right':
        this.animation.animate('rightIdle');
        break;
      case 'down':
        this.animation.animate('downIdle');
        break;
      case 'left':
        this.animation.animate('leftIdle');
        break;
    }
  }

  update() {
    if (this.controller.up.isActive) {
      this.position.y -= this.speed;
      this.animation.animate('up');
    } else if (this.controller.right.isActive) {
      this.position.x += this.speed;
      this.animation.animate('right');
    } else if (this.controller.down.isActive) {
      this.position.y += this.speed;
      this.animation.animate('down');
    } else if (this.controller.left.isActive) {
      this.position.x -= this.speed;
      this.animation.animate('left');
    } else {
      this.idle();
    }
  }
}

export default Hero;
