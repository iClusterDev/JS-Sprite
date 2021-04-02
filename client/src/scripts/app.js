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
        symbol: '-',
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
      {
        name: 'ground1',
        symbol: '1',
        column: 1,
        row: 1,
      },
      {
        name: 'ground2',
        symbol: '2',
        column: 0,
        row: 2,
      },
      {
        name: 'ground3',
        symbol: '3',
        column: 0,
        row: 2,
      },
      {
        name: 'ground4',
        symbol: '4',
        column: 1,
        row: 2,
      },
    ],
    map: [
      ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', 'Y', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', 'Y', 'Y', 'Y', '-', '-', '-', '-', '-'],
      ['-', 'R', '-', 'B', 'B', 'G', 'Y', 'G', 'B', 'B', '-', 'R', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['1', '3', '2', '4', '2', '1', '3', '2', '3', '1', '4', '2', '3'],
    ],
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
    this.graphics = new SpriteSheet(graphics);

    // FIXME
    // in map all the column must have
    // the same size
    this.columns = map[0].length;
    this.rows = map.length;
    this.#buffer = new OffscreenCanvas(
      this.graphics.spriteW * this.columns,
      this.graphics.spriteH * this.rows
    ).getContext('2d');
    this.#buffer.imageSmoothingEnabled = false;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < map[r].length; c++) {
        const tile = tiles.find((tile) => tile.symbol === map[r][c]);
        if (tile.name !== 'empty') {
          const sprite = this.graphics.getSprite(tile.column, tile.row);
          this.#buffer.drawImage(sprite, c * sprite.width, r * sprite.height);
        }
      }
    }
  }

  get frame() {
    return this.#buffer.canvas;
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
  const ball = new Ball(ballConfig(ballSpriteSheet));
  const paddle = new Paddle(paddleConfig(paddleSpriteSheet));

  const gameLoop = new Engine(
    function update() {
      display.clear();
      ball.update(display.width, display.height, paddle);
      paddle.update(display.width, display.height);
    },
    function render() {
      display.render(level.frame, 0, 0);
      display.render(ball.sprite, ball.position.x, ball.position.y);
      display.render(paddle.sprite, paddle.position.x, paddle.position.y);
    }
  );
  gameLoop.start();
}
