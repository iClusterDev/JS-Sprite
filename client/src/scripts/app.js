import playerSrc from '../images/player.png';
import zombieSrc from '../images/zombie.png';
import playerConfig from './config/player';
import zombieConfig from './config/zombie';
import Engine from './core/Engine';
import Player from './core/Player';

// ==========================================================
// resource load
// ==========================================================
const images = [
  { src: playerSrc, name: 'player' },
  { src: zombieSrc, name: 'zombie' },
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
  const playerImg = result.find((item) => item.name === 'player');
  const zombieImg = result.find((item) => item.name === 'zombie');
  init(playerImg.image, zombieImg.image);
});

// ==========================================================
// display
// ==========================================================
const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ==========================================================
// init
// ==========================================================
function init(playerSpriteSheet, zombieSpriteSheet) {
  const player = new Player(playerConfig(playerSpriteSheet));
  const zombie = new Player(zombieConfig(zombieSpriteSheet));
  const gameLoop = new Engine(
    function update() {
      player.update();
      zombie.update();
    },
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        player.frame,
        0,
        0,
        player.frame.width,
        player.frame.height,
        player.position.x + 100,
        player.position.y,
        player.frame.width,
        player.frame.height
      );
      ctx.drawImage(
        zombie.frame,
        0,
        0,
        zombie.frame.width,
        zombie.frame.height,
        zombie.position.x,
        zombie.position.y,
        zombie.frame.width,
        zombie.frame.height
      );
    }
  );
  gameLoop.start();
}
