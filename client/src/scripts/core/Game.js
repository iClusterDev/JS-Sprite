import Randomizer from './Randomizer';
import Display from './Display';
import Camera from './Camera';
import Buffer from './Buffer';
import Graphics from './Graphics';

class Actor {
  constructor(actor) {
    let { type, config } = actor;
    return new type(config);
  }
}

class WorldLayer {
  #graphics;
  #tilemap;
  #buffer;

  constructor(config = {}) {
    const {
      graphics = null,
      columns = null,
      rows = null,
      unit = null,
      grid = null,
      tiles = null,
    } = config;

    this.#graphics = new Graphics(graphics);
    this.#buffer = new Buffer({
      width: columns * unit,
      height: rows * unit,
    });

    this.#tilemap = [];
    grid.forEach((row, rIndex) => {
      row.split('').forEach((symbol, sIndex) => {
        let tile = tiles.find((tile) => tile.symbol === symbol);
        if (tile) {
          this.#tilemap.push({
            id: Randomizer.id(),
            row: rIndex,
            column: sIndex,
            ...tile,
          });
        }
      });
    });

    this.#tilemap.forEach((tile) => this.drawTile(tile.id));

    // for (let r = 0; r < rows; r++) {
    //   for (let c = 0; c < columns; c++) {
    //     let color = (r + c) % 2 === 0 ? 'cyan' : 'white';
    //     let posX = c * unit;
    //     let posY = r * unit;
    //     this.#buffer.context.fillStyle = color;
    //     this.#buffer.context.fillRect(posX, posY, unit, unit);
    //   }
    // }
  }

  get canvas() {
    return this.#buffer.canvas;
  }

  getTile(row, column) {}
  setTile(row, column) {}

  drawTile(tileId) {
    const tile = this.#tilemap.find((tile) => tile.id === tileId);
    if (tile) {
      const { row, column } = tile.spriteSheet;
      this.#graphics.sprite = { row, column };
      this.#buffer.draw(
        this.#graphics.sprite,
        0,
        0,
        this.#graphics.sprite.width,
        this.#graphics.sprite.height,
        tile.column * 32,
        tile.row * 32,
        32,
        32
      );
    }
  }

  clearTile(tileId) {}
}

class Game {
  constructor(config = {}) {
    const { display, player, level } = config;
    this.display = new Display(display);
    this.player = new Actor(player);
    this.camera = new Camera({
      height: this.display.height,
      width: this.display.width,
      follow: this.player,
    });

    // world buffer
    this.worldLayer = new WorldLayer({ ...level.worldLayer });

    // random entities buffer
    this.entityLayer = new Buffer({
      width: level.columns * level.unit,
      height: level.rows * level.unit,
    });
    for (let i = 0; i < 20; i++) {
      let color = 'blue';
      let size = level.unit;
      let posX = Randomizer.integerBetween(0, level.columns * size - size);
      let posY = Randomizer.integerBetween(0, level.rows * size - size);
      this.entityLayer.context.fillStyle = color;
      this.entityLayer.context.fillRect(posX, posY, size, size);
    }
  }

  update(dt) {
    // update player
    this.display.clear();
    this.player.update(dt);
  }

  draw() {
    // on the main buffer...
    // draw world layer
    // within camera bounds
    this.display.draw(
      this.worldLayer.canvas,
      this.camera.position.x,
      this.camera.position.y,
      this.camera.width,
      this.camera.height
    );

    // on the main buffer...
    // draw entity layer
    // within camera bounds
    this.display.draw(
      this.entityLayer.canvas,
      this.camera.position.x,
      this.camera.position.y,
      this.camera.width,
      this.camera.height
    );

    // on the main buffer...
    // draw the player
    let playerLocalX = this.player.position.x - this.camera.position.x;
    let playerLocalY = this.player.position.y - this.camera.position.y;
    this.display.draw(
      this.player.sprite,
      0,
      0,
      this.player.sprite.width,
      this.player.sprite.height,
      playerLocalX,
      playerLocalY,
      32,
      32
    );
  }
}

export default Game;
