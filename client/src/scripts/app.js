import Engine from './core/Engine';
import Display from './core/Display';
import SpriteSheet from './core/SpriteSheet';

import ballSrc from '../images/paddle_ball.png';
import levelSrc from '../images/paddle_level.png';
import paddleSrc from '../images/paddle_player.png';

import ballConfig from './config/ball';
import paddleConfig from './config/paddle';

import Ball from './assets/Ball';
import Paddle from './assets/Paddle';

// ==========================================================
// resource load
// ==========================================================
const images = [
  { src: ballSrc, name: 'ball' },
  { src: levelSrc, name: 'level' },
  { src: paddleSrc, name: 'paddle' },
];

const preloadImage = (src, name) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = function () {
      resolve({ image, name });
    };
    image.onerror = function () {
      reject(new Error('preload error'));
    };
  });
};

const preloadImages = (imagesArray) => {
  return Promise.all(
    imagesArray.map((imageItem) => preloadImage(imageItem.src, imageItem.name))
  );
};

preloadImages(images).then((result) => {
  const ballImg = result.find((item) => item.name === 'ball');
  const levelImg = result.find((item) => item.name === 'level');
  const paddleImg = result.find((item) => item.name === 'paddle');
  init(ballImg.image, paddleImg.image, levelImg.image);
});

// ==========================================================
// level
// ==========================================================
const levelConfig = (spriteSheet) => {
  return {
    width: 832,
    height: 640,
    graphics: {
      spriteSheet: spriteSheet,
      columns: 3,
      rows: 3,
      scale: 4,
    },
    tiles: [
      {
        name: 'empty',
        symbol: '.',
      },
      {
        name: 'yellowBrick',
        symbol: 'Y',
        column: 0,
        row: 0,
      },
      {
        name: 'greenBrick',
        symbol: 'G',
        column: 1,
        row: 0,
      },
      {
        name: 'blueBrick',
        symbol: 'B',
        column: 2,
        row: 0,
      },
      {
        name: 'redBrick',
        symbol: 'R',
        column: 0,
        row: 1,
      },
    ],
    map: `
      . . . . . . . . . . . . .
      . . . . . . . . . . . . .
      . Y . Y . Y Y Y . Y . Y .
      . . . . . . . . . . . . .
      . . . . . . . . . . . . .
      . . . . . . . . . . . . .
      . . . . . . . . . . . . .
      . . . . . . . . . . . . .
      . . . . . . . . . . . . .
      . . . . . . . . . . . . .
    `,
  };
};

class Level {
  #buffer;
  #updated;

  constructor(config = {}) {
    const {
      width = null,
      height = null,
      graphics = null,
      tiles = null,
      map = null,
    } = config;
    if (!width || !height || !graphics || !tiles || !map)
      throw new Error('Level: missing required parameters!');

    this.#updated = false;
    // this.#buffer = new OffscreenCanvas(width, height).getContext('2d');
    // this.#buffer.imageSmoothingEnabled = false;
    this.graphics = new SpriteSheet(graphics);

    const tile = this.graphics.getSprite(0, 1);
    // this.#buffer.drawImage(
    //   tile,
    //   0,
    //   0,
    //   tile.width,
    //   tile.height,
    //   0,
    //   0,
    //   this.#buffer.canvas.width,
    //   this.#buffer.canvas.height
    // );

    // for (let i = 0; i < map.length; i++) {
    //   if (map.charAt(i) !== ' ') {
    //     const symbol = map.charAt(i);
    //     console.log('DEBUG ~ constructor ~ symbol', symbol);
    //   }
    // }
  }

  get buffer() {
    return this.graphics.getSprite(0, 0);
  }
}

// ==========================================================
// init
// ==========================================================
function init(ballSpriteSheet, paddleSpriteSheet, levelSpriteSheet) {
  const display = new Display({
    id: 'canvas',
    width: 832,
    height: 640,
    background: 'rgb(180, 217, 230)',
  });

  const level = new Level(levelConfig(levelSpriteSheet));
  // console.log('DEBUG ~ init ~ level', level.buffer);

  const ball = new Ball(ballConfig(ballSpriteSheet));
  const paddle = new Paddle(paddleConfig(paddleSpriteSheet));

  const gameLoop = new Engine(
    function update() {
      display.clear();
      ball.update(display.width, display.height, paddle);
      paddle.update(display.width, display.height);
    },
    function render() {
      display.render(level.buffer, level.buffer.width * 0, 0);
      display.render(level.buffer, level.buffer.width * 1, 0);
      display.render(level.buffer, level.buffer.width * 2, 0);
      display.render(level.buffer, level.buffer.width * 3, 0);
      display.render(level.buffer, level.buffer.width * 4, 0);
      display.render(ball.sprite, ball.position.x, ball.position.y);
      display.render(paddle.sprite, paddle.position.x, paddle.position.y);
    }
  );
  gameLoop.start();
}
