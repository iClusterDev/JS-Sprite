import heroSrc from '../images/hero.png';
import dwarfSrc from '../images/dwarf.png';
import zombieSrc from '../images/zombie.png';
import heroConfig from './config/hero';
import dwarfConfig from './config/dwarf';
import zombieConfig from './config/zombie';
import Display from './core/Display';
import Engine from './core/Engine';
import Hero from './assets/Hero';
import Dwarf from './assets/Dwarf';
import Zombie from './assets/Zombie';

// ==========================================================
// resource load
// ==========================================================
const images = [
  { src: heroSrc, name: 'hero' },
  { src: dwarfSrc, name: 'dwarf' },
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
  const dwarfImg = result.find((item) => item.name === 'dwarf');
  const zombieImg = result.find((item) => item.name === 'zombie');
  init(heroImg.image, zombieImg.image, dwarfImg.image);
});

// ==========================================================
// init
// ==========================================================
function init(heroSpriteSheet, zombieSpriteSheet, dwarfSpriteSheet) {
  const display = new Display({
    id: 'canvas',
    width: 1000,
    height: 800,
  });

  const hero = new Hero(heroConfig(heroSpriteSheet));
  const dwarf = new Dwarf(dwarfConfig(dwarfSpriteSheet));
  const zombie = new Zombie(zombieConfig(zombieSpriteSheet));

  const gameLoop = new Engine(
    function update() {
      hero.update();
      zombie.update(display.width);
    },
    function render() {
      display.clear();
      display.render(hero.frame, hero.position.x, hero.position.y);
      display.render(dwarf.frame, dwarf.position.x, dwarf.position.y);
      display.render(zombie.frame, zombie.position.x, zombie.position.y);
    }
  );
  gameLoop.start();
}
