import heroSrc from '../images/hero.png';
import zombieSrc from '../images/zombie.png';
import heroConfig from './config/hero';
import zombieConfig from './config/zombie';
import Engine from './core/Engine';
import Hero from './assets/Hero';
import Zombie from './assets/Zombie';

// ==========================================================
// resource load
// ==========================================================
const images = [
  { src: heroSrc, name: 'hero' },
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
  const heroImg = result.find((item) => item.name === 'hero');
  const zombieImg = result.find((item) => item.name === 'zombie');
  init(heroImg.image, zombieImg.image);
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
function init(heroSpriteSheet, zombieSpriteSheet) {
  const hero = new Hero(heroConfig(heroSpriteSheet));
  const zombie = new Zombie(zombieConfig(zombieSpriteSheet));
  const gameLoop = new Engine(
    function update() {
      hero.update();
      zombie.update(ctx.canvas.width);
    },
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        hero.frame,
        0,
        0,
        hero.frame.width,
        hero.frame.height,
        hero.position.x + 100,
        hero.position.y,
        hero.frame.width,
        hero.frame.height
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
  // gameLoop.start();
}
