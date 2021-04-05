import Buffer from './core/Buffer';
import Engine from './core/Engine';
import Display from './core/Display';
import Resource from './core/Resource';
import Graphics from './core/Graphics';

import Hero from './assets/Hero';

import tileSpriteSheetSrc from '../images/tile.png';

const GAME = {
  world: {
    unit: 32,
    rows: 16,
    columns: 60,
    map: [
      '............................................................',
      '............................................................',
      '............................................................',
      '............................................................',
      '............................................................',
      '..................................................#.#.......',
      '...................................######...................',
      '............###########...........................#.#.......',
      '..........#############...######............................',
      '........###############...######............................',
      '#####.##############################....####################',
      '#####.############################....##....................',
      '#####.##########################....##......................',
      '#####.............................##........................',
      '#####...........................##..........................',
      '################################............................',
    ],
  },
};

export default () => {
  const IMAGES = [{ src: tileSpriteSheetSrc, name: 'tileSpriteSheet' }];

  Resource.preloadImages(IMAGES).then(() => {
    // sprites setup
    const tileSpriteSheet = new Graphics({
      spriteSheet: Resource.getImage('tileSpriteSheet'),
      columns: 2,
      rows: 2,
      scale: 2,
    });

    // display setup
    const displayW = (GAME.world.columns / 2) * GAME.world.unit;
    const displayH = GAME.world.rows * GAME.world.unit;
    const display = new Display({
      id: 'canvas',
      width: displayW,
      height: displayH,
    });

    // player setup
    const hero = new Hero({
      position: {
        x: display.width / 2,
        y: display.height / 2,
      },
      graphics: {
        spriteSheet: tileSpriteSheet.getSprite(0, 1),
        columns: 1,
        rows: 1,
        scale: 1,
      },
      input: [
        { code: 'KeyA', action: 'right' },
        { code: 'KeyD', action: 'left' },
        { code: 'KeyW', action: 'up' },
        { code: 'KeyS', action: 'down' },
      ],
    });

    // level setup
    const level = new Buffer(
      GAME.world.columns * GAME.world.unit,
      GAME.world.rows * GAME.world.unit
    );
    for (let row = 0; row < GAME.world.map.length; row++) {
      for (let column = 0; column < GAME.world.map[row].length; column++) {
        const spriteRow = null;
        const spriteColumn = null;
        switch (GAME.world.map[row].charAt(column)) {
          case '.':
            spriteColumn = 1;
            spriteRow = 0;
            break;
          case '#':
            spriteColumn = 0;
            spriteRow = 0;
            break;
          default:
            console.log('error');
        }
        const sprite = tileSpriteSheet.getSprite(spriteColumn, spriteRow);
        level.draw(
          sprite,
          0,
          0,
          sprite.width,
          sprite.height,
          sprite.width * column,
          sprite.height * row,
          sprite.width,
          sprite.height
        );
      }
    }

    // camera setup
    // class Camera {
    //   constructor(display, speed) {
    //     this.x = display.width / 2;
    //     this.y = display.height / 2;
    //     this.displayOffsetX = display.width / 2;
    //     this.displayOffsetY = display.height / 2;
    //     this.speed = speed;
    //     this.updated = false;
    //     this.controller = new Controller([
    //       { code: 'KeyA', action: 'right' },
    //       { code: 'KeyD', action: 'left' },
    //     ]);
    //   }

    //   get offX() {
    //     return this.x - this.displayOffsetX;
    //   }
    //   get offY() {
    //     return this.y - this.displayOffsetY;
    //   }

    //   update(elapsedTime) {
    //     if (this.controller.right.isActive) {
    //       this.x -= this.speed * elapsedTime;
    //       this.updated = true;
    //     } else if (this.controller.left.isActive) {
    //       this.x += this.speed * elapsedTime;
    //       this.updated = true;
    //     } else {
    //       this.updated = false;
    //     }
    //   }
    // }
    // const camera = new Camera(display, 0.25);

    // game loop
    const gameLoop = new Engine(
      function update(elapsedTime) {
        hero.update(
          elapsedTime,
          0,
          0,
          GAME.world.columns * GAME.world.unit,
          GAME.world.rows * GAME.world.unit
        );
      },
      function render() {
        display.clear();
        display.debugCtx.drawImage(
          level.image,
          0,
          0,
          display.width,
          display.height,
          0,
          0,
          display.width,
          display.height
        );
        display.render(hero.sprite, hero.position.x, hero.position.y);
      }
    );
    gameLoop.start();
  });
};
