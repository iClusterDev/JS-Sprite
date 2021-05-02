import Engine from './core/Engine';
import Display from './core/Display';
import Resource from './core/Resource';
import worldImage from '../images/world.png';

class Tilemap {
  constructor(config = { tileSheet: null, unit: 0, map: [], symbols: [] }) {
    console.log('DEBUG ~ constructor ~ config', config);
  }
}

export default async () => {
  // load resources
  await Resource.preloadImages([{ src: worldImage, name: 'worldTileSheet' }]);

  // display
  const displayConfig = {
    id: 'canvas',
    width: 832,
    height: 640,
    background: 'lightblue',
  };
  const display = new Display(displayConfig);

  // level
  const levelConfig = {
    tileSheet: Resource.getImage('worldTileSheet'),
    unit: 16,
    map: [
      '1........1',
      '1........1',
      '1........1',
      '1........1',
      '1........1',
      '1........1',
      '1........1',
      '1........1',
      '1........1',
      '1555555551',
    ],
    symbols: [
      {
        name: 'yellowBrick',
        row: 0,
        column: 0,
        symbol: '1',
      },
      {
        name: 'grass1',
        row: 1,
        column: 1,
        symbol: '5',
      },
    ],
  };
  const tilemap = new Tilemap(levelConfig);

  // game loop
  const gameLoop = new Engine(
    function update(elapsedTime) {},
    function render() {}
  );

  // start
  gameLoop.start();
};
