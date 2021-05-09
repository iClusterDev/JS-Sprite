import Engine from './core/Engine';
import Display from './core/Display';
import Resource from './core/Resource';
import { WorldLayer } from './core/Level';
import worldImage from '../images/world.png';

export default async () => {
  await Resource.preloadImages([{ src: worldImage, name: 'worldTileSheet' }]);

  // display
  const display = new Display({
    id: 'canvas',
    width: 832,
    height: 640,
  });

  const worldTileSheet = Resource.getImage('worldTileSheet');
  const worldConfig = {
    // columns: 10,
    // rows: 10,
    // unit: 32,
    world: {
      unit: 32,
      atlas: {
        spritesheet: worldTileSheet,
        columns: 3,
        rows: 3,
      },
      grid: [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      ],
      tiles: [
        {
          solid: false,
          symbol: 1,
          atlas: {
            column: 0,
            row: 0,
          },
        },
        {
          solid: false,
          symbol: 2,
          atlas: {
            column: 1,
            row: 0,
          },
        },
        {
          solid: true,
          symbol: 3,
          atlas: {
            column: 0,
            row: 1,
          },
        },
      ],
    },
  };

  const worldLayer = new WorldLayer(worldConfig.world);
  worldLayer.update();
  worldLayer.draw();

  // display.draw(worldLayer.buffer.canvas, 0, 0, 400, 400, 0, 0, 400, 400);

  // game loop
  // const gameLoop = new Engine(
  //   function update(elapsedTime) {},
  //   function render() {}
  // );

  // start
  // gameLoop.start();
};
