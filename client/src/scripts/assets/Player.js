import Entity from '../core/Entity';

const DISPLAY_W = 832;
const DISPLAY_H = 640;
const WORLD_W = DISPLAY_W * 3;
const WORLD_H = DISPLAY_H;
const WORLD_X = 0;
const WORLD_Y = 0;

class Player extends Entity {
  constructor(config = {}) {
    super(config);

    this.updated = false;
    this.speed = {
      x: 0.2,
      y: 0.2,
    };
  }

  // FIXME
  // update accepts only elapsedTime
  update(elapsedTime) {
    this.updated = false;

    // update position
    let deltaX = 0;
    let deltaY = 0;
    if (this.controller.right.isActive) {
      deltaX -= this.speed.x * elapsedTime;
    } else if (this.controller.left.isActive) {
      deltaX += this.speed.x * elapsedTime;
    }

    if (this.controller.up.isActive) {
      deltaY -= this.speed.y * elapsedTime;
    } else if (this.controller.down.isActive) {
      deltaY += this.speed.y * elapsedTime;
    }

    if (deltaX !== 0 || deltaY !== 0) {
      let newPositionX = this.position.x + deltaX;
      let newPositionY = this.position.y + deltaY;

      // ...and here you check for out of bounds
      let maxPositionX = WORLD_W - this.sprite.width;
      let maxPositionY = WORLD_H - this.sprite.height;

      if (newPositionX < WORLD_X) {
        this.position.x = WORLD_X;
      } else if (newPositionX > maxPositionX) {
        this.position.x = maxPositionX;
      } else {
        this.position.x += deltaX;
      }

      if (newPositionY < WORLD_Y) {
        this.position.y = WORLD_Y;
      } else if (newPositionY > maxPositionY) {
        this.position.y = maxPositionY;
      } else {
        this.position.y += deltaY;
      }

      this.updated = true;
    }
  }
}

export default Player;
