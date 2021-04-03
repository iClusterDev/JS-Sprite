import Buffer from './core/Buffer';
import Engine from './core/Engine';
import Display from './core/Display';
import Resource from './core/Resource';
import Graphics from './core/Graphics';
import Controller from './core/Controller';

import tileSpriteSheetSrc from '../images/tile.png';

const GAME = {
  world: {
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
      'P.......###############...######............................',
      '#####.############################..########################',
      '#####.###########################..##.......................',
      '#####.##########################..##........................',
      '#####.............................##.........................',
      '#####...........................##..........................',
      '################################............................',
    ],
  },
};

export default () => {
  const IMAGES = [{ src: tileSpriteSheetSrc, name: 'tileSpriteSheet' }];

  Resource.preloadImages(IMAGES).then(() => {
    // display setup
    const displayW = (GAME.world.columns / 2) * 16 * 2;
    const displayH = GAME.world.rows * 16 * 2;
    const display = new Display({
      id: 'canvas',
      width: displayW,
      height: displayH,
    });

    // sprites setup
    const tileSpriteSheet = new Graphics({
      spriteSheet: Resource.getImage('tileSpriteSheet'),
      columns: 2,
      rows: 2,
      scale: 2,
    });

    // level setup
    const level = new Buffer(GAME.world.columns * 32, GAME.world.rows * 32);
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
          case 'P':
            spriteColumn = 0;
            spriteRow = 1;
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
    class Camera {
      constructor(display, speed) {
        this.x = display.width / 2;
        this.y = display.height / 2;
        this.displayOffsetX = display.width / 2;
        this.displayOffsetY = display.height / 2;
        this.speed = speed;
        this.updated = false;
        this.controller = new Controller([
          { code: 'KeyA', action: 'right' },
          { code: 'KeyD', action: 'left' },
        ]);
      }

      get offX() {
        return this.x - this.displayOffsetX;
      }
      get offY() {
        return this.y - this.displayOffsetY;
      }

      update(elapsedTime) {
        if (this.controller.right.isActive) {
          this.x -= this.speed * elapsedTime;
          this.updated = true;
        } else if (this.controller.left.isActive) {
          this.x += this.speed * elapsedTime;
          this.updated = true;
        } else {
          this.updated = false;
        }
      }
    }
    const camera = new Camera(display, 0.25);

    // first draw
    display.clear();
    display.debugCtx.drawImage(
      level.image,
      camera.offX,
      camera.offY,
      display.width,
      display.height,
      0,
      0,
      display.width,
      display.height
    );

    // game loop
    const gameLoop = new Engine(
      function update(elapsedTime) {
        camera.update(elapsedTime);
      },
      function render() {
        if (camera.updated) {
          display.clear();
          display.debugCtx.drawImage(
            level.image,
            camera.offX,
            camera.offY,
            display.width,
            display.height,
            0,
            0,
            display.width,
            display.height
          );
        }
      }
    );
    gameLoop.start();
  });
};
