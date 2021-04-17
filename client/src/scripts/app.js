import Engine from './core/Engine';
import Display from './core/Display';
import Resource from './core/Resource';
import Buffer from './core/Buffer';
import Zombie from './assets/Zombie';

import zombieSpriteSheetSrc from '../images/zombie.png';

class EntityLayer extends Buffer {
  constructor(entities = []) {
    super(800, 600);
    this.updated = false;
    this.entities = entities;
  }

  update(elapsedTime, minPositionX, minPositionY, worldWidth, worldHeight) {
    this.entities.forEach((entity) => {
      if (entity.update) {
        entity.update(
          elapsedTime,
          minPositionX,
          minPositionY,
          worldWidth,
          worldHeight
        );
      }
    });

    this.clear();
    this.entities.forEach((entity) => {
      this.draw(
        entity.graphics.sprite,
        0,
        0,
        entity.graphics.sprite.width,
        entity.graphics.sprite.height,
        entity.position.x,
        entity.position.y,
        entity.graphics.sprite.width,
        entity.graphics.sprite.height
      );
    });
  }
}

export default () => {
  const IMAGES = [{ src: zombieSpriteSheetSrc, name: 'zombieSpriteSheet' }];

  Resource.preloadImages(IMAGES).then(() => {
    // setup
    const display = new Display({
      id: 'canvas',
      width: 800,
      height: 600,
      background: 'lightBlue',
    });

    const entityLayer = new EntityLayer([
      new Zombie({
        name: 'hero',
        position: { x: 100, y: 0 },
        graphics: {
          spriteSheet: Resource.getImage('zombieSpriteSheet'),
          columns: 3,
          rows: 4,
          scale: 2,
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
      }),
    ]);

    // game loop
    const gameLoop = new Engine(
      function update(elapsedTime) {
        entityLayer.update(elapsedTime, 0, 0, display.width, display.height);
      },
      function render() {
        display.clear();
        display.draw(
          entityLayer.canvas,
          0,
          0,
          entityLayer.canvas.width,
          entityLayer.canvas.height
        );
      }
    );
    1;
    gameLoop.start();
  });
};
