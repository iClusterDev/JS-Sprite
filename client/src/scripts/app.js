import Engine from './core/Engine';
import Display from './core/Display';
import Resource from './core/Resource';

import zombieImage from '../images/zombie.png';

export default () => {
  const IMAGES = [{ src: zombieImage, name: 'zombieSpriteSheet' }];

  Resource.preloadImages(IMAGES).then(() => {
    // setup
    const display = new Display({
      id: 'canvas',
      width: 800,
      height: 600,
      background: 'lightBlue',
    });

    const zombieConfig = {
      name: 'hero',
      position: { x: 100, y: 0 },
      graphics: {
        spriteSheet: Resource.getImage('zombieSpriteSheet'),
        columns: 3,
        rows: 4,
        scale: 1,
        animation: {
          animationStep: 10,
          animationMap: [
            {
              default: true,
              action: 'down',
              cycle: 0,
              sequence: [0, 1, 0, 2],
            },
            {
              action: 'up',
              cycle: 2,
              sequence: [0, 1, 0, 2],
            },
            {
              action: 'left',
              cycle: 1,
              sequence: [0, 1, 0, 2],
            },
            {
              action: 'right',
              cycle: 3,
              sequence: [0, 1, 0, 2],
            },
          ],
        },
      },
      input: [
        { code: 'KeyW', action: 'up' },
        { code: 'KeyS', action: 'down' },
        { code: 'KeyA', action: 'right' },
        { code: 'KeyD', action: 'left' },
      ],
      update: () => {
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
        }
      },
    };

    // game loop
    const gameLoop = new Engine(
      function update(elapsedTime) {
        // zombie.update(elapsedTime, 0, 0, display.width, display.height);
      },
      function render() {
        display.clear();
        // display.draw(
        //   zombie.graphics.sprite,
        //   0,
        //   0,
        //   zombie.graphics.sprite.width,
        //   zombie.graphics.sprite.height,
        //   zombie.position.x,
        //   zombie.position.y,
        //   zombie.graphics.sprite.width,
        //   zombie.graphics.sprite.height
        // );
      }
    );
    gameLoop.start();
  });
};
