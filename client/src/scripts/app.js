const debug = true;

import Engine from './core/Engine';
import Display from './core/Display';
import Resource from './core/Resource';
import Buffer from './core/Buffer';

import zombieImage from '../images/zombie.png';
import Zombie from './assets/Zombie';

class Camera {
  constructor(config = {}) {
    const { width = null, height = null, follow: target = null } = config;

    if (debug) {
      this.buffer = new Buffer(width, height);
      this.buffer.context.fillStyle = 'rgba(255, 0, 0, 0.25)';
      this.buffer.context.fillRect(0, 0, this.buffer.width, this.buffer.height);
    }

    this.width = width;
    this.height = height;
    this.target = target;
    this.offset = {
      x: width / 2,
      y: height / 2,
    };
  }

  get focus() {
    return {
      x: this.target.position.x + this.target.graphics.sprite.width / 2,
      y: this.target.position.y + this.target.graphics.sprite.height / 2,
    };
  }

  get position() {
    let positionX = this.focus.x - this.offset.x;
    if (positionX < 0) {
      positionX = 0;
    } else if (positionX + this.width > 800) positionX = 800 - this.width;

    let positionY = this.focus.y - this.offset.y;
    if (positionY < 0) {
      positionY = 0;
    } else if (positionY + this.height > 600) positionY = 600 - this.height;

    return {
      x: positionX,
      y: positionY,
    };
  }
}

export default () => {
  const IMAGES = [{ src: zombieImage, name: 'zombieSpriteSheet' }];

  Resource.preloadImages(IMAGES).then(() => {
    // setup
    const display = new Display({
      id: 'canvas',
      width: 800,
      height: 600,
      // background: 'lightBlue',
    });
    display.context.fillStyle = 'lightBlue';
    display.context.fillRect(0, 0, display.canvas.width, display.canvas.height);

    const zombieConfig = {
      name: 'hero',
      solid: true,
      dynamic: true,
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
      controller: [
        { code: 'KeyW', action: 'up' },
        { code: 'KeyS', action: 'down' },
        { code: 'KeyA', action: 'right' },
        { code: 'KeyD', action: 'left' },
      ],
    };
    const zombie = new Zombie(zombieConfig);

    const camera = new Camera({ width: 400, height: 300, follow: zombie });

    // game loop
    const gameLoop = new Engine(
      function update(elapsedTime) {
        display.clear(
          camera.position.x,
          camera.position.y,
          camera.width,
          camera.height
        );
        zombie.update(elapsedTime, 0, 0, display.width, display.height);
      },
      function render() {
        display.draw(
          zombie.graphics.sprite,
          0,
          0,
          zombie.graphics.sprite.width,
          zombie.graphics.sprite.height,
          zombie.position.x,
          zombie.position.y,
          zombie.graphics.sprite.width,
          zombie.graphics.sprite.height
        );
        display.draw(
          camera.buffer.canvas,
          0,
          0,
          camera.buffer.width,
          camera.buffer.height,
          camera.position.x,
          camera.position.y,
          camera.buffer.width,
          camera.buffer.height
        );
      }
    );
    gameLoop.start();
  });
};
