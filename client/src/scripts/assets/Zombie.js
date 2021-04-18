import Entity from '../core/Entity';

class Zombie extends Entity {
  constructor(config = {}) {
    super(config);

    this.updated = false;
    this.speed = {
      x: 0.2,
      y: 0.2,
    };
    this.tile = {
      x: Math.floor(config.position.x),
      y: Math.floor(config.position.y),
    };
  }

  update(elapsedTime, minPositionX, minPositionY, worldWidth, worldHeight) {
    this.updated = false;

    // update position
    let deltaX = 0;
    let deltaY = 0;
    if (this.controller.right.isActive) {
      this.graphics.animate('right');
      deltaX -= this.speed.x * elapsedTime;
    } else if (this.controller.left.isActive) {
      this.graphics.animate('left');
      deltaX += this.speed.x * elapsedTime;
    }

    if (this.controller.up.isActive) {
      this.graphics.animate('up');
      deltaY -= this.speed.y * elapsedTime;
    } else if (this.controller.down.isActive) {
      this.graphics.animate('down');
      deltaY += this.speed.y * elapsedTime;
    }

    if (deltaX !== 0 || deltaY !== 0) {
      let newPositionX = this.position.x + deltaX;
      let newPositionY = this.position.y + deltaY;

      // ...and here you check for out of bounds
      let maxPositionX = worldWidth - this.graphics.sprite.width;
      let maxPositionY = worldHeight - this.graphics.sprite.height;

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

export default Zombie;
