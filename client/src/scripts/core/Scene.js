// ==========================================================
// Scene
// is singleton
// is an offscreen dysplay
// ==========================================================
class Scene {
  constructor(config = {}) {}
}

// class Scene {
//   #update;

//   constructor(config = {}) {
//     const { display, entities = [], update = () => {} } = config;

//     this.canvas = new OffscreenCanvas(display.width, display.height);
//     this.buffer = this.canvas.getContext('2d');

//     const staticEntities = entities.filter(
//       (entity) => entity.type === 'static'
//     );

//     const dynamicEntities = entities.filter(
//       (entity) => entity.type === 'dynamic'
//     );

//     this.entities = entities;
//     this.entities.forEach((entity) => {
//       this.#draw(entity);
//     });

//     this.#update = update();
//   }

//   get frame() {

//     this.#clear();
//     this.entities.forEach((entity) => {
//       this.#draw(entity);
//     });
//     return this.buffer.canvas;
//   }

//   #clear() {
//     this.buffer.clearRect(
//       0,
//       0,
//       this.buffer.canvas.width,
//       this.buffer.canvas.height
//     );
//   }

//   #draw(entity) {
//     this.buffer.drawImage(
//       entity.sprite,
//       0,
//       0,
//       entity.sprite.width,
//       entity.sprite.height,
//       entity.position.x,
//       entity.position.y,
//       entity.sprite.width,
//       entity.sprite.height
//     );
//   }

//   update() {
//     this.#update();
//   }
// }

export default Scene;
