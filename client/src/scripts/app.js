import Scene from './core/Scene';
import Engine from './core/Engine';
import Display from './core/Display';

import crossSrc from '../images/cross.png';
import squareSrc from '../images/square.png';
import crossConfig from './config/cross';
import squareConfig from './config/square';

import Cross from './assets/Cross';
import Square from './assets/Square';

// ==========================================================
// resource load
// ==========================================================
const images = [
  { src: crossSrc, name: 'cross' },
  { src: squareSrc, name: 'square' },
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
  const crossImg = result.find((item) => item.name === 'cross');
  const squareImg = result.find((item) => item.name === 'square');
  init(crossImg.image, squareImg.image);
});

// ==========================================================
// init
// ==========================================================
function init(crossSpriteSheet, squareSpriteSheet) {
  const display = new Display({
    id: 'canvas',
    width: 1000,
    height: 800,
  });

  const cross = new Cross(crossConfig(crossSpriteSheet));
  const square = new Square(squareConfig(squareSpriteSheet));

  const sceneConfig = {
    container: display,
    layers: {},
  };
  const scene = new Scene(sceneConfig);

  // const gameLoop = new Engine(
  //   function update() {
  //     display.clear();
  //     scene.update();
  //   },
  //   function render() {
  //     display.render(scene.sprite, 0, 0);
  //   }
  // );
  // gameLoop.start();
}
