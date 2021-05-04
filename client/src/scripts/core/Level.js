import Buffer from './Buffer';
import Graphics from './Graphics';
import Validator from './Validator';
import Randomizer from './Randomizer';

const tilemapSchema = {
  unit: {
    type: Number,
    validate: (value) => {
      if (value === 0) throw new Error(`"unit" must be greater than 0!`);
    },
  },

  map: {
    type: Array,
    validate: (value) => {
      if (value.length === 0) throw new Error(`"map" cannot be an empty Array`);
      value.reduce((previous, current, index) => {
        if (index > 0 && current.length !== previous)
          throw new Error(`"map" has inconsistent columns lengths!`);
        return (previous = current.length);
      }, 0);
    },
  },

  tiles: {
    type: Array,
    validate: (value) => {
      if (value.length === 0)
        throw new Error(`"tiles" cannot be an empty Array`);
    },
  },
};

class Tilemap {
  constructor(config = {}) {
    try {
      new Validator(tilemapSchema).validate(config);
    } catch (error) {
      throw new Error(`Tilemap: Validator - ${error}`);
    }

    const { unit, map, tiles } = config;

    this.tiles = [];
    this.unit = unit;
    this.rows = map.length;
    this.columns = map[0].length;

    map.forEach((row, rIndex) => {
      row.forEach((symbol, sIndex) => {
        const tile = tiles.find((tile) => tile.symbol === symbol);
        if (tile) {
          this.tiles.push({
            id: Randomizer.id(),
            row: rIndex,
            unit: unit,
            atlas: tile.atlas,
            solid: tile.solid,
            column: sIndex,
            position: {
              x: sIndex * unit,
              y: rIndex * unit,
            },
          });
        }
      });
    });
  }
}

class Level {
  constructor(
    { atlas = {}, tilemap = {} } = {
      atlas: {},
      tilemap: {},
    }
  ) {
    this.atlas = new Graphics(atlas);
    this.tilemap = new Tilemap(tilemap);
    this.buffer = new Buffer({
      width: this.tilemap.columns * this.tilemap.unit,
      height: this.tilemap.rows * this.tilemap.unit,
    });

    this.#draw();
  }

  #draw() {
    const self = this;
    self.tilemap.tiles.forEach((tile) => {
      self.atlas.sprite = {
        row: tile.atlas.row,
        column: tile.atlas.column,
      };

      let { sprite } = self.atlas;
      self.buffer.draw(
        sprite,
        0,
        0,
        sprite.width,
        sprite.height,
        tile.position.x,
        tile.position.y,
        tile.unit,
        tile.unit
      );
    });
  }
}

export { Level };
