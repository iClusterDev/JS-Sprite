import Engine from './core/Engine';
import Display from './core/Display';
import Resource from './core/Resource';

export default () => {
  const IMAGES = [];

  Resource.preloadImages(IMAGES).then(() => {
    const display = new Display({
      id: 'canvas',
      width: 832,
      height: 640,
      background: 'rgb(180, 217, 230)',
    });

    const gameLoop = new Engine(
      function update() {},
      function render() {}
    );
    gameLoop.start();
  });
};
