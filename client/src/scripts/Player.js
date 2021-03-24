import Animation from './Animation';
import Controller from './Controller';
import SpriteSheet from './SpriteSheet';

// ==========================================================
// player
// ==========================================================
class Player {
  constructor(playerConfig = {}) {
    const {
      position,
      input: controllerConfig,
      graphics: spriteSheetConfig,
      animation: animationConfig,
    } = playerConfig;

    this.animation = new Animation(animationConfig);
    this.controller = new Controller(controllerConfig);
    this.spriteSheet = new SpriteSheet(spriteSheetConfig);

    this.speed = 2;
    this.position = position;
    this.currentFrame = this.spriteSheet.getFrame(
      this.animation.frame.column,
      this.animation.frame.row
    );
  }

  get frame() {
    if (this.animation.changed) {
      this.currentFrame = this.spriteSheet.getFrame(
        this.animation.frame.column,
        this.animation.frame.row
      );
    }
    return this.currentFrame;
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

export default Player;
