import Entity from '../core/Entity';

class Ball extends Entity {
  constructor(config = {}) {
    super(config);
    this.speedX = 4;
    this.speedY = 4;
  }

  update(displayW, displayH, paddle) {
    const maxPositionX = displayW - this.width;
    const maxPositionY = displayH - this.height;

    if (this.position.x < 0 || this.position.x > maxPositionX)
      this.speedX = -this.speedX;

    if (this.position.y < 0 || this.position.y > maxPositionY)
      this.speedY = -this.speedY;

    if (this.position.y + this.width > paddle.position.y) {
      if (
        this.position.x > paddle.position.x &&
        this.position.x < paddle.position.x + paddle.width
      ) {
        this.speedY = -this.speedY;
      }
    }

    this.position.x += this.speedX;
    this.position.y += this.speedY;
  }
}

export default Ball;
