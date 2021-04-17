import Engine from './core/Engine';
import Display from './core/Display';
import Resource from './core/Resource';
import Buffer from './core/Buffer';

import heroSpriteSheetSrc from '../images/hero.png';
import blockSpriteSheetSrc from '../images/block.png';

import Hero from './assets/Hero';
import Block from './assets/Block';

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
        entity.sprite,
        0,
        0,
        entity.sprite.width,
        entity.sprite.height,
        entity.position.x,
        entity.position.y,
        entity.sprite.width,
        entity.sprite.height
      );
    });
  }
}

export default () => {
  const IMAGES = [
    { src: heroSpriteSheetSrc, name: 'heroSpriteSheet' },
    { src: blockSpriteSheetSrc, name: 'blockSpriteSheet' },
  ];

  Resource.preloadImages(IMAGES).then(() => {
    // setup
    const display = new Display({
      id: 'canvas',
      width: 800,
      height: 600,
      background: 'lightBlue',
    });

    const entityLayer = new EntityLayer([
      new Hero({
        name: 'hero',
        position: { x: 100, y: 0 },
        graphics: {
          spriteSheet: Resource.getImage('heroSpriteSheet'),
          columns: 1,
          rows: 1,
          scale: 2,
        },
        input: [
          { code: 'KeyW', action: 'up' },
          { code: 'KeyS', action: 'down' },
          { code: 'KeyA', action: 'right' },
          { code: 'KeyD', action: 'left' },
        ],
      }),
      new Block({
        name: 'block',
        position: { x: 0, y: 0 },
        graphics: {
          spriteSheet: Resource.getImage('blockSpriteSheet'),
          columns: 1,
          rows: 1,
          scale: 2,
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
    // gameLoop.start();
  });
};
