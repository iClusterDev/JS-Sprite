import Entity from '../core/Entity';

class Player extends Entity {
  constructor(config = {}) {
    super(config);

    this.updated = false;
    this.speed = {
      x: 0.2,
      y: 0.2,
    };
  }

  update(elapsedTime, minPositionX, minPositionY, worldWidth, worldHeight) {
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
      let maxPositionX = worldWidth - this.sprite.width;
      let maxPositionY = worldHeight - this.sprite.height;

      if (newPositionX < minPositionX) {
        this.position.x = minPositionX;
      } else if (newPositionX > maxPositionX) {
        this.position.x = maxPositionX;
      } else {
        this.position.x += deltaX;
      }

      if (newPositionY < minPositionY) {
        this.position.y = minPositionY;
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
