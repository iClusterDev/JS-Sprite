import Engine from './core/Engine';
import Display from './core/Display';
import Resource from './core/Resource';

import heroSpriteSheetSrc from '../images/hero.png';

import Hero from './assets/Hero';

export default () => {
  const IMAGES = [{ src: heroSpriteSheetSrc, name: 'heroSpriteSheet' }];

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

    // game loop
    const gameLoop = new Engine(
      function update(elapsedTime) {
        display.clear();
        hero.update(elapsedTime, 0, 0, display.width, display.height);
      },
      function render() {
        display.draw(
          hero.sprite,
          0,
          0,
          hero.sprite.width,
          hero.sprite.height,
          hero.position.x,
          hero.position.y,
          hero.sprite.width,
          hero.sprite.height
        );
      }
    );
    1;
    gameLoop.start();
    // gameLoop.stop();
  });
};
