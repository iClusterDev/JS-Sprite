import Buffer from './Buffer';
import Graphics from './Graphics';
import Validator from './Validator';
import Randomizer from './Randomizer';
import Camera from './Camera';

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

  get grid() {
    return this.#grid;
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

  getRect(rectX, rectY, rows, columns, aperture = 0) {
    let rowStart = Math.floor(rectY - aperture);
    let colStart = Math.floor(rectX - aperture);
    // if (rowStart < 0) rowStart = 0;
    // if (colStart < 0) colStart = 0;

    let rowEnd = Math.floor(rectY + rows - 1 + aperture);
    let colEnd = Math.floor(rectX + columns - 1 + aperture);
    // if (rowEnd < this.rows - 1) rowEnd = this.rows - 1;
    // if (colEnd < this.columns - 1) colEnd = this.columns - 1;

    let result = this.#grid.slice(rowStart, rowEnd + 1);
    return result.map((row) => {
      return row.slice(colStart, colEnd + 1);
    });
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
    this.actives = [];
    this.tilemap = new Grid(tilemap);
    this.atlas = new Graphics(atlas);

    const width = this.tilemap.columns * this.unit;
    const height = this.tilemap.rows * this.unit;
    this.buffer = new Buffer({
      width,
      height,
    });
    for (let row = 0; row < this.tilemap.rows; row++) {
      for (let col = 0; col < this.tilemap.grid[row].length; col++) {
        console.log(row, col);
      }
    }
  }

  updateRect(cameraX, cameraY, cameraWidth, cameraHeight) {
    this.actives = this.tilemap
      .getRect(
        cameraX,
        cameraY,
        cameraHeight / this.unit,
        cameraWidth / this.unit
      )
      .flat()
      .filter((tile) => tile);
  }
}

class EntityLayer {
  constructor(config = {}) {
    const { unit, grid, tiles } = config;

    const tilemap = grid.map((row, rIndex) => {
      return row.map((column, cIndex) => {
        const tile = tiles.find((tile) => tile.symbol === column);
        if (tile)
          tile.config.position = {
            x: cIndex,
            y: rIndex,
          };

        return tile ? new tile.type(tile.config) : null;
      });
    });

    this.unit = unit;
    this.updated = false;
    this.actives = [];
    this.tilemap = new Grid(tilemap);
  }

  updateRect(elapsedTime, cameraX, cameraY, cameraWidth, cameraHeight) {
    this.actives = this.tilemap
      .getRect(
        cameraX,
        cameraY,
        cameraHeight / this.unit,
        cameraWidth / this.unit
      )
      .flat()
      .filter((tile) => tile);

    // FIXME
    // only for dynamic entities
    // check and run the update function
    if (this.actives.length > 0) {
      this.actives.forEach((entity) => {
        entity.update(elapsedTime);
      });
    }
  }
}

class Game {
  constructor(config = {}) {
    const { player, camera, level } = config;

    // FIXME
    // check on the player
    this.player = player;

    // FIXME
    // camera size cannot exceed display size
    this.camera = camera
      ? new Camera({
          width: 832,
          height: 640,
          follow: this.player,
        })
      : {
          width: 832,
          height: 640,
          position: { x: 0, y: 0 },
        };

    // FIXME
    // the layers must have the same size
    this.worldLayer = new WorldLayer(level.worldLayer);
    this.entityLayer = new EntityLayer(level.entityLayer);

    // FIXME
    //size same as display + 3tiles aperture?
    this.buffer = new Buffer({
      width: this.camera.width,
      height: this.camera.height,
    });
  }

  get frame() {
    const self = this;

    self.buffer.draw(
      this.camera.buffer.canvas,
      0,
      0,
      this.camera.width,
      this.camera.height,
      this.camera.position.x,
      this.camera.position.y,
      this.camera.width,
      this.camera.height
    );

    self.buffer.draw(
      this.player.sprite,
      0,
      0,
      this.player.sprite.width,
      this.player.sprite.height,
      this.player.position.x,
      this.player.position.y,
      this.player.sprite.width,
      this.player.sprite.height
    );

    // self.worldLayer.actives.forEach((active) => {
    //   self.worldLayer.atlas.sprite = {
    //     column: active.atlas.column,
    //     row: active.atlas.row,
    //   };

    //   self.buffer.draw(
    //     self.worldLayer.atlas.sprite,
    //     0,
    //     0,
    //     self.worldLayer.atlas.sprite.width,
    //     self.worldLayer.atlas.sprite.height,
    //     active.position.x,
    //     active.position.y,
    //     self.worldLayer.atlas.sprite.width,
    //     self.worldLayer.atlas.sprite.height
    //   );
    // });

    // self.entityLayer.actives.forEach((active) => {
    //   self.buffer.draw(
    //     active.graphics.sprite,
    //     0,
    //     0,
    //     active.graphics.sprite.width,
    //     active.graphics.sprite.height,
    //     active.position.x,
    //     active.position.y,
    //     active.graphics.sprite.width,
    //     active.graphics.sprite.height
    //   );
    // });

    return this.buffer.canvas;
  }

  update(elapsedTime) {
    this.buffer.clear();
    this.player.update(elapsedTime, 0, 0, 832 * 2, 640);
    // this.buffer.clear(
    //   this.camera.position.x,
    //   this.camera.position.y,
    //   this.camera.width,
    //   this.camera.height
    // );
    // update player & camera
    // update entities
    // this.entityLayer.updateRect(
    //   elapsedTime,
    //   this.camera.position.x,
    //   this.camera.position.y,
    //   this.camera.width,
    //   this.camera.height
    // );
    // update world
    // this.worldLayer.updateRect(
    //   this.camera.position.x,
    //   this.camera.position.y,
    //   this.camera.width,
    //   this.camera.height
    // );
  }
}

export { WorldLayer, Game };
