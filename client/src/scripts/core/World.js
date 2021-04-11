import Buffer from './Buffer';
import Graphics from './Graphics';

class MapBufferBuffer extends Buffer {
  constructor(config = {}) {
    const { width, height, map, graphics, symbols } = config;

    super(width, height);
    this.map = map;
    this.symbols = symbols;
    this.spriteSheet = new Graphics(graphics);
  }
}

class MapBuffer {
  constructor(config = {}) {
    const { width, height, map, graphics, symbols } = config;
    this.buffer = new Buffer(width, height);
    this.map = map;
    this.symbols = symbols;
    this.spriteSheet = new Graphics(graphics);

    for (let rowIndex = 0; rowIndex < this.map.length; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex < this.map[rowIndex].length;
        columnIndex++
      ) {
        const char = this.map[rowIndex].charAt(columnIndex);
        if (char !== '.') {
          const symbol =
            this.symbols.find((symbol) => symbol.char === char) || null;
          if (symbol) {
            const sprite = this.spriteSheet.getSprite(
              symbol.columnIndex,
              symbol.rowIndex
            );
            this.buffer.draw(
              sprite,
              0,
              0,
              sprite.width,
              sprite.height,
              sprite.width * columnIndex,
              sprite.height * rowIndex,
              sprite.width,
              sprite.height
            );
          }
        }
      }
    }
  }

  get frame() {
    return this.buffer.image;
  }

  get width() {
    return this.buffer.width;
  }

  get height() {
    return this.buffer.height;
  }

  getAt() {}

  setAt() {}

  drawAt() {}

  clearAt() {}

  clearAll() {}

  drawAll() {}
}

class World {
  #bufferColor = 'transparent';
  #bufferW;
  #bufferH;
  #buffer;

  constructor(config = {}) {
    // validate world map
    const {
      background = null,
      columns = 0,
      rows = 0,
      unit = 0,
      map = [],
      symbols = null,
      graphics = null,
    } = config;
    // validate map attributes
    // then create a new empty world buffer
    if (rows === 0 || columns === 0)
      throw new Error('World: rows, columns and unit must be greater than 0');
    if (rows !== map.length) throw new Error('World: inconsistent map rows');
    map.forEach((row) => {
      if (columns !== row.length)
        throw new Error('World: inconsistent map columns');
    });

    this.#buffer = new Buffer(unit * columns, unit * rows);
    this.#bufferH = unit * rows;
    this.#bufferW = unit * columns;

    // set background if any
    if (background) {
      this.#bufferColor = background;
      this.#buffer.fill(background);
    }

    this.entityBuffer = 0;
    this.backgroundBuffer = 0;

    this.mapBuffer = new MapBuffer({
      map: map,
      width: unit * columns,
      height: unit * rows,
      graphics: graphics,
      symbols: symbols,
    });

    this.#buffer.draw(
      this.mapBuffer.frame,
      0,
      0,
      this.mapBuffer.width,
      this.mapBuffer.height
    );

    // tilemap
    // this.tilesMap = map;
    // this.tilesSymbols = symbols;
    // this.tilesSpriteSheet = new Graphics(graphics);

    // for (let row = 0; row < this.tilesMap.length; row++) {
    //   for (let column = 0; column < this.tilesMap[row].length; column++) {
    //     const char = this.tilesMap[row].charAt(column);
    //     if (char !== '.') {
    //       const symbol =
    //         this.tilesSymbols.find((symbol) => symbol.char === char) || null;
    //       if (symbol) {
    //         const tile = this.tilesSpriteSheet.getSprite(
    //           symbol.columnIndex,
    //           symbol.rowIndex
    //         );
    //         this.#buffer.draw(
    //           tile,
    //           0,
    //           0,
    //           tile.width,
    //           tile.height,
    //           tile.width * column,
    //           tile.height * row,
    //           tile.width,
    //           tile.height
    //         );
    //       }
    //     }
    //   }
    // }
  }

  get frame() {
    return this.#buffer.image;
  }
}

export default World;
