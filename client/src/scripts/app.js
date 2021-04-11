import Engine from './core/Engine';
import Display from './core/Display';
import Resource from './core/Resource';

import Hero from './assets/Hero';
import worldSpriteSheetSrc from '../images/world.png';
import heroSpriteSheetSrc from '../images/hero.png';

export default () => {
  const IMAGES = [
    { src: worldSpriteSheetSrc, name: 'worldSpriteSheet' },
    { src: heroSpriteSheetSrc, name: 'heroSpriteSheet' },
  ];

  Resource.preloadImages(IMAGES).then(() => {
    // setup
    const display = new Display({
      id: 'canvas',
      width: 800,
      height: 600,
      background: 'lightBlue',
    });

    const heroSpriteSheet = Resource.getImage('heroSpriteSheet');
    const hero = new Hero({
      position: { x: 100, y: 0 },
      graphics: {
        spriteSheet: heroSpriteSheet,
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
        display.render(hero.sprite, hero.position.x, hero.position.y);
      }
    );
    gameLoop.start();
  });
};
