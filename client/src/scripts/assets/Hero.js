import Player from '../core/Player';

class Hero extends Player {
  constructor(config = {}) {
    super(config);
    this.updated = false;
    this.speed = {
      x: 0.25,
      y: 0.25,
    };
    this.tile = {
      x: Math.floor(config.position.x),
      y: Math.floor(config.position.y),
    };
  }

  update(elapsedTime, minPositionX, minPositionY, worldWidth, worldHeight) {
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
      let maxPositionX = worldWidth - this.width;
      let maxPositionY = worldHeight - this.height;

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

      // ...and here you check for collision
      this.tile.x = Math.floor(this.position.x);
      this.tile.y = Math.floor(this.position.y);
      this.updated = true;
    }
  }
}

export default Hero;
