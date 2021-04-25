import Engine from './core/Engine';
import Camera from './core/Camera';
import Display from './core/Display';
import Resource from './core/Resource';

import zombieImage from '../images/zombie.png';
import Zombie from './assets/Zombie';

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
