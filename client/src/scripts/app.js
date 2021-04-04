import Buffer from './core/Buffer';
import Player from './core/Player';
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
      '........###############...######............................',
      '#####.############################..########################',
      '#####.###########################..##.......................',
      '#####.##########################..##........................',
      '#####.............................##.........................',
      '#####...........................##..........................',
      '################################............................',
    ],
  },
};

class Hero extends Player {
  constructor(config = {}) {
    super(config);
    this.updated = false;
    this.speed = {
      x: 0.25,
      y: 0.25,
    };
  }

  update(elapsedTime, minPositionX, minPositionY, worldWidth, worldHeight) {
    // update position
    let deltaX = 0;
    let deltaY = 0;
    if (this.controller.right.isActive) {
      deltaX -= this.speed.x * elapsedTime;
    } else if (this.controller.left.isActive) {
      deltaX += this.speed.x * elapsedTime;
    }

    if (this.controller.up.isActive) {
      deltaY -= this.speed.y * elapsedTime;
    } else if (this.controller.down.isActive) {
      deltaY += this.speed.y * elapsedTime;
    }

    if (deltaX !== 0 || deltaY !== 0) {
      let newPositionX = this.position.x + deltaX;
      let newPositionY = this.position.y + deltaY;

      // ...and here you check for out of bounds
      let maxPositionX = worldWidth - this.width;
      let maxPositionY = worldHeight - this.height;

      if (newPositionX < minPositionX) {
        this.position.x = minPositionX;
      } else if (newPositionX > maxPositionX) {
        this.position.x = maxPositionX;
      } else {
        this.position.x += deltaX;
      }

      if (newPositionY < minPositionY) {
        this.position.y = minPositionY;
      } else if (newPositionY > maxPositionY) {
        this.position.y = maxPositionY;
      } else {
        this.position.y += deltaY;
      }

      // ...and here you check for collision

      this.updated = true;
    }
  }
}

export default () => {
  const IMAGES = [{ src: tileSpriteSheetSrc, name: 'tileSpriteSheet' }];

  Resource.preloadImages(IMAGES).then(() => {
    // display setup
    const displayW = (GAME.world.columns / 2) * 32;
    const displayH = GAME.world.rows * 32;
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

    // player setup
    const hero = new Hero({
      position: {
        x: 0,
        y: 0,
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
          GAME.world.columns * 32,
          GAME.world.rows * 32
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
