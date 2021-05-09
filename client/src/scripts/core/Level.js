import Buffer from './Buffer';
import Graphics from './Graphics';
import Validator from './Validator';
import Randomizer from './Randomizer';

/**
 * Tile schema object
 */
const tileSchema = {
  position: {
    type: Object,
    validate: (value) => {
      const hasX = value.hasOwnProperty('x');
      const hasY = value.hasOwnProperty('y');
      if (!hasX || !hasY)
        throw new Error(`"position" has missing "x" and/or "y" keys!`);
    },
  },

  atlas: {
    type: Object,
    validate: (value) => {
      const hasRow = value.hasOwnProperty('row');
      const hasColumn = value.hasOwnProperty('column');
      if (!hasRow || !hasColumn)
        throw new Error(`"atlas" has missing "row" and/or "columns" keys!`);
    },
  },

  symbol: { type: Number },
  solid: { type: Boolean },
};

/**
 * Tile
 * --------------------------------------------------------
 * Data structure holding a tile Object, like:
 * location on the provided atlas, whether
 * the tile is solid, its symbol and
 * position in the game world.
 *
 * @param {*} config Object - configuration object
 * @param {*} config.atlas Object - atlas location {row, column}
 * @param {*} config.solid Boolean - solid tile?
 * @param {*} config.symbol Number - symbol number for mapping
 * @param {*} config.position Object - position in the game world {x, y}
 */
class Tile {
  constructor(config = {}) {
    try {
      new Validator(tileSchema).validate(config);
    } catch (error) {
      throw new Error(`Tile: config - ${error}`);
    }

    const { atlas, solid, symbol, position } = config;

    this.id = Randomizer.id();
    this.atlas = atlas;
    this.solid = solid;
    this.symbol = symbol;
    this.position = position;
  }
}

class Grid {
  #grid;

  constructor(grid) {
    // private properties
    this.#grid = grid;

    // public readonly properties
    this.rows = grid.length;
    this.columns = grid[0].length;

    Object.freeze(this);
  }

  #getBounds(index, aperture, max) {
    if (index < 0 || index > max - 1)
      throw new Error('Grid.getBounds: "index" is out of bounds!');
    if (aperture < 0)
      throw new Error('Grid.getBounds: "aperture" must be greater than 0!"');
    let minIndex = index - aperture;
    let maxIndex = index + aperture + 1;
    if (minIndex < 0) minIndex = 0;
    if (maxIndex > max) maxIndex = max + 1;
    return { minIndex, maxIndex };
  }

  getRow(rowIndex, aperture = 0) {
    let bounds = this.#getBounds(rowIndex, aperture, this.rows);
    // prettier-ignore
    return this.#grid.slice(
      bounds.minIndex, 
      bounds.maxIndex
    );
  }

  getColumn(columnIndex, aperture = 0) {
    const bounds = this.#getBounds(columnIndex, aperture, this.columns);
    return this.#grid.map((row) => {
      // prettier-ignore
      return row.slice(
        bounds.minIndex, 
        bounds.maxIndex
      );
    });
  }

  getItem(rowIndex, columnIndex, aperture = 0) {
    let result = this.getColumn(columnIndex, aperture);
    const bounds = this.#getBounds(rowIndex, aperture, this.rows);
    // prettier-ignore
    return result.slice(
      bounds.minIndex,
      bounds.maxIndex
    );
  }
}

class WorldLayer {
  constructor(config = {}) {
    const { unit, atlas, grid, tiles } = config;

    const tilemap = grid.map((row, rIndex) => {
      return row.map((column, cIndex) => {
        const tile = tiles.find((tile) => tile.symbol === column);
        return tile
          ? new Tile({
              atlas: tile.atlas,
              solid: tile.solid,
              symbol: tile.symbol,
              position: { x: cIndex, y: rIndex },
            })
          : null;
      });
    });

    this.unit = unit;
    this.updated = false;
    this.selected = [];
    this.tilemap = new Grid(tilemap);
    this.atlas = new Graphics(atlas);

    this.buffer = new Buffer({
      width: this.tilemap.columns * unit,
      height: this.tilemap.rows * unit,
    });

    // console.log(this);
  }

  getRect(position, width, height, aperture) {
    const minX = Math.floor(position.x);
    const minY = Math.floor(position.y);
    const maxX = Math.floor(position.x + width);
    const maxY = Math.floor(position.y + height);
  }

  update() {
    // aaa
    // this.selected = this.tilemap
    //   .getColumn(0, 9)
    //   .flat()
    //   .filter((tile) => tile !== null);
    // if (this.selected.length > 0) {
    //   this.selected.forEach((tile) => {
    //     this.buffer.clear(
    //       tile.position.x * this.unit,
    //       tile.position.y * this.unit,
    //       this.unit,
    //       this.unit
    //     );
    //   });
    // }
  }

  draw() {
    // this.selected.forEach((tile) => {
    //   this.atlas.sprite = { row: tile.atlas.row, column: tile.atlas.column };
    //   this.buffer.draw(
    //     this.atlas.sprite,
    //     0,
    //     0,
    //     this.atlas.sprite.width,
    //     this.atlas.sprite.height,
    //     tile.position.x * this.unit,
    //     tile.position.y * this.unit,
    //     this.unit,
    //     this.unit
    //   );
    // });
  }
}

class Level {
  constructor() {
    this.camera = 0;
    this.player = 0;
    this.worldLayer = 0; // buffer
    this.entityLayer = 0; // buffer
    this.collisionLayer = 0; // buffer
  }

  update() {
    // update player
    // update camera
    // update entities
    // update world
  }

  draw() {
    // draw world
    // draw player
    // draw entities
  }
}

export { WorldLayer };
