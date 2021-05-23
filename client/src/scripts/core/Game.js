import Randomizer from './Randomizer';
import Display from './Display';
import Camera from './Camera';
import Buffer from './Buffer';
import Graphics from './Graphics';

// class Checkerboard {
//   #buffer = null;

//   constructor(rows, columns, unit) {
//     this.#buffer = new Buffer({ width: columns * unit, height: rows * unit });
//     for (let r = 0; r < rows; r++) {
//       for (let c = 0; c < columns; c++) {
//         let color = (r + c) % 2 === 0 ? 'cyan' : 'white';
//         let posX = c * unit;
//         let posY = r * unit;
//         this.#buffer.context.fillStyle = color;
//         this.#buffer.context.fillRect(posX, posY, unit, unit);
//       }
//     }
//   }

//   get canvas() {
//     return this.#buffer.canvas;
//   }
// }

class Actor {
  constructor(actor) {
    let { type, config } = actor;
    return new type(config);
  }
}

class Tile {
  constructor() {
    this.id = Randomizer.id();
    this.data = {};

    Object.freeze(this);
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

    const width = columns * unit;
    const height = rows * unit;

    this.#graphics = new Graphics(graphics);
    this.#buffer = new Buffer({
      width: width,
      height: height,
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
  }

  get canvas() {
    return this.#buffer.canvas;
  }

  // getTile(row, column) {}
  // setTile(row, column) {}
  // clearTile(tileId) {}
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
}

class EntityLayer {
  #entitymap;
  #buffer;

  constructor(config = {}) {
    const {
      columns = null,
      rows = null,
      unit = null,
      grid = null,
      actors = null,
    } = config;

    const width = columns * unit;
    const height = rows * unit;

    this.#buffer = new Buffer({
      width: width,
      height: height,
    });

    this.#entitymap = [];
    grid.forEach((row, rIndex) => {
      row.split('').forEach((symbol, sIndex) => {
        let actor = actors.find((actor) => actor.symbol === symbol);
        if (actor) {
          actor.config.position = {
            x: sIndex * unit,
            y: rIndex * unit,
          };
          this.#entitymap.push(new Actor(actor));
        }
      });
    });

    this.#entitymap.forEach((actor) => this.drawActor(actor.id));
  }

  get canvas() {
    this.#entitymap.forEach((actor) => this.drawActor(actor.id));
    return this.#buffer.canvas;
  }

  get entities() {
    return this.#entitymap;
  }

  updateActor(actorId, elapsedTime) {
    const actor = this.#entitymap.find((actor) => actor.id === actorId);
    if (actorId) {
      this.#buffer.clear(
        actor.position.x,
        actor.position.y,
        actor.sprite.width,
        actor.sprite.height
      );
    }
    actor.update(elapsedTime);
  }

  // getTile(row, column) {}
  // setTile(row, column) {}
  // clearTile(tileId) {}
  drawActor(actorId) {
    const actor = this.#entitymap.find((actor) => actor.id === actorId);
    if (actor) {
      this.#buffer.draw(
        actor.sprite,
        0,
        0,
        actor.sprite.width,
        actor.sprite.height,
        actor.position.x,
        actor.position.y,
        actor.sprite.width,
        actor.sprite.height
      );
    }
  }
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

    this.worldLayer = new WorldLayer({ ...level.worldLayer });
    this.entityLayer = new EntityLayer({ ...level.entityLayer });
  }

  update(dt) {
    // update player
    this.display.clear();
    this.player.update(dt);
    this.entityLayer.entities.forEach((entity) => {
      this.entityLayer.updateActor(entity.id, dt);
    });
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
