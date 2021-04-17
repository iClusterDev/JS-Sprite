import Engine from './core/Engine';
import Display from './core/Display';
import Resource from './core/Resource';

export default () => {
  const IMAGES = [];

  Resource.preloadImages(IMAGES).then(() => {
    // setup
    const display = new Display({
      id: 'canvas',
      width: 800,
      height: 600,
      background: 'lightBlue',
    });

    // game loop
    const gameLoop = new Engine(
      function update(elapsedTime) {},
      function render() {}
    );
    // gameLoop.start();
  });
};
