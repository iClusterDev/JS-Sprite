import Engine from './core/Engine';
import Display from './core/Display';
import Resource from './core/Resource';

import heroSpriteSheetSrc from '../images/hero.png';
import blockSpriteSheetSrc from '../images/block.png';

import Hero from './assets/Hero';
import Enemy from './assets/Enemy';

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

    const hero = new Hero({
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
    });

    const enemy = new Enemy({
      name: 'enemy',
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
    });

    // game loop
    const gameLoop = new Engine(
      function update(elapsedTime) {
        display.clear();
        hero.update(elapsedTime, 0, 0, display.width, display.height);
        enemy.update(elapsedTime, 0, 0, display.width, display.height);
      },
      function render() {
        display.render(hero.sprite, hero.position.x, hero.position.y);
        display.render(enemy.sprite, enemy.position.x, enemy.position.y);
      }
    );
    gameLoop.start();
    // gameLoop.stop();
  });
};
