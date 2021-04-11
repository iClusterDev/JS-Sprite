import Buffer from './core/Buffer';
import Engine from './core/Engine';
import Display from './core/Display';
import Resource from './core/Resource';
import Graphics from './core/Graphics';
import Entity from './core/Entity';
import World from './core/World';

import worldSpriteSheetSrc from '../images/world.png';
import blockSpriteSheetSrc from '../images/block.png';
import heroSpriteSheetSrc from '../images/hero.png';

import Hero from './assets/Hero';
class Block extends Entity {
  constructor(config = {}) {
    super(config);
  }
}

export default () => {
  const IMAGES = [
    { src: worldSpriteSheetSrc, name: 'worldSpriteSheet' },
    { src: blockSpriteSheetSrc, name: 'blockSpriteSheet' },
    { src: heroSpriteSheetSrc, name: 'heroSpriteSheet' },
  ];

  Resource.preloadImages(IMAGES).then(() => {
    // game setup
    const blockConfig = {
      position: { x: 0, y: 0 },
      graphics: {
        spriteSheet: Resource.getImage('blockSpriteSheet'),
        columns: 1,
        rows: 1,
        scale: 2,
      },
    };

    const heroConfig = {
      position: { x: 0, y: 0 },
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
    };

    // game setup
    const GAME = {
      display: {
        columns: 30,
        rows: 16,
        unit: 32,
      },
      levels: [
        {
          columns: 60,
          rows: 16,
          unit: 32,
          map: [
            '............................................................',
            '............................................................',
            '............................................................',
            '............................................................',
            '............................................................',
            '..................................................#.#.......',
            '...................................555555...................',
            '............55555555555...........................#.#.......',
            '..........55###########...555555............................',
            'H.......55#############...######............................',
            '55555.55###############555##########....55555555555555555555',
            '#####.############################....55....................',
            '#####.##########################....55......................',
            '#####.............................55........................',
            '#####...........................55..........................',
            '#####555555555555555555555555555............................',
          ],
          background: 'lightBlue',
          graphics: {
            spriteSheet: Resource.getImage('worldSpriteSheet'),
            columns: 3,
            rows: 3,
            scale: 2,
          },
          symbols: [
            {
              name: 'block1',
              char: '#',
              columnIndex: 0,
              rowIndex: 0,
            },
            {
              name: 'grass1',
              char: '5',
              columnIndex: 1,
              rowIndex: 1,
            },
          ],
          tiles: {
            graphics: {
              spriteSheet: Resource.getImage('worldSpriteSheet'),
              columns: 3,
              rows: 3,
              scale: 2,
            },
            symbols: [
              {
                name: 'block1',
                char: '#',
                columnIndex: 0,
                rowIndex: 0,
              },
              {
                name: 'grass1',
                char: '5',
                columnIndex: 1,
                rowIndex: 1,
              },
            ],
          },
        },
      ],
    };

    // display setup
    const displayW = GAME.display.columns * GAME.display.unit;
    const displayH = GAME.display.rows * GAME.display.unit;
    const display = new Display({
      id: 'canvas',
      width: displayW,
      height: displayH,
    });

    const world = new World(GAME.levels[0]);
    display.render(world.frame, 0, 0);

    // game loop
    // const gameLoop = new Engine(
    //   function update(elapsedTime) {},
    //   function render() {}
    // );
    // gameLoop.start();
  });
};
