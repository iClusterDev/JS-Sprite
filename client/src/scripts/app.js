import characterSrc from '../images/character2.png';
import Engine from './Engine';
import Animation from './Animation';

// ==========================================================
// resource load
// ==========================================================
const spriteSheet = new Image();
spriteSheet.src = characterSrc;
spriteSheet.onload = function () {
  init();
};

// ==========================================================
// display
// ==========================================================
const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ==========================================================
// init
// ==========================================================
function init() {
  const animation = new Animation({
    spriteSheet: spriteSheet,
    scale: 2,
    rows: 4,
    columns: 3,
  });

  const engine = new Engine(
    function update() {
      animation.animate();
    },
    function render() {
      if (animation.updated) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(
          animation.frame,
          100,
          100,
          0,
          0,
          animation.frame.width,
          animation.frame.height
        );
      }
    }
  );

  engine.start();
}

// import characterSrc from '../images/character2.png';
// import Engine from './Engine';

// // ==========================================================
// // resource load
// // ==========================================================
// const spriteSheet = new Image();
// spriteSheet.src = characterSrc;
// spriteSheet.onload = function () {
//   init();
// };

// // ==========================================================
// // display
// // ==========================================================
// const canvas = document.querySelector('#canvas');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// const ctx = canvas.getContext('2d');
// window.addEventListener('resize', () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// });

// // ==========================================================
// // globals
// // ==========================================================
// class Animation {
//   constructor(spriteSheet, rows, columns, scale) {
//     const canvas = new OffscreenCanvas(
//       spriteSheet.width * scale,
//       spriteSheet.height * scale
//     );
//     this.buffer = canvas.getContext('2d');
//     this.buffer.drawImage(
//       spriteSheet,
//       0,
//       0,
//       spriteSheet.width * scale,
//       spriteSheet.height * scale
//     );

//     this.scale = 2;
//     this.width = (spriteSheet.width / columns) * scale;
//     this.height = (spriteSheet.height / rows) * scale;

//     this.animationCycle = [0, 1, 0, 2];
//     this.currentAnimationCycleIndex = 0;
//     this.upCycle = 1;
//     this.rightCycle = 2;
//     this.downCycle = 0;
//     this.leftCycle = 3;
//     this.frameCount = 0;
//   }

//   get frame() {
//     return this.buffer.getImageData(
//       this.width * this.animationCycle[this.currentAnimationCycleIndex],
//       this.height * this.upCycle,
//       this.width,
//       this.height
//       // this.width * 1,
//       // this.height * 1,
//       // this.width,
//       // this.height
//     );
//   }

//   animate() {
//     this.frameCount++;
//     if (this.frameCount === 10) {
//       this.frameCount = 0;
//       this.currentAnimationCycleIndex++;
//       if (this.currentAnimationCycleIndex >= this.animationCycle.length) {
//         this.currentAnimationCycleIndex = 0;
//       }
//     }
//   }
// }

// const scale = 2;
// const width = 16;
// const height = 18;
// const scaledWidth = scale * width;
// const scaledHeight = scale * height;

// function drawFrame(frameX, frameY, canvasX, canvasY) {
//   ctx.drawImage(
//     spriteSheet,
//     frameX * width,
//     frameY * height,
//     width,
//     height,
//     canvasX,
//     canvasY,
//     scaledWidth,
//     scaledHeight
//   );
// }

// let animationCycle = [0, 1, 0, 2];
// let currentAnimationCycleIndex = 0;
// let upCycle = 1;
// let rightCycle = 2;
// let downCycle = 0;
// let leftCycle = 3;
// let frameCount = 0;

// // ==========================================================
// // engine
// // ==========================================================
// function update() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   // frameCount++;
//   // if (frameCount === 10) {
//   //   frameCount = 0;
//   //   currentAnimationCycleIndex++;
//   //   if (currentAnimationCycleIndex >= animationCycle.length) {
//   //     currentAnimationCycleIndex = 0;
//   //   }
//   // }
// }

// function render() {
//   // drawFrame(animationCycle[currentAnimationCycleIndex], upCycle, 200, 200);
//   // drawFrame(animationCycle[currentAnimationCycleIndex], rightCycle, 300, 300);
//   // drawFrame(animationCycle[currentAnimationCycleIndex], downCycle, 100, 100);
//   // drawFrame(animationCycle[currentAnimationCycleIndex], leftCycle, 400, 400);
//   ctx.putImageData(
//     animation.frame,
//     0,
//     0,
//     0,
//     0,
//     animation.frame.width,
//     animation.frame.height
//   );
// }

// // const engine = new Engine(update, render);

// // ==========================================================
// // init
// // ==========================================================
// function init() {
//   const animation = new Animation(spriteSheet, 4, 3, 2);
//   const engine = new Engine(
//     () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       animation.animate();
//     },
//     () => {
//       // ctx.putImageData(animation.frame, 0, 0);
//       ctx.putImageData(
//         animation.frame,
//         100,
//         100,
//         0,
//         0,
//         animation.frame.width,
//         animation.frame.height
//       );
//     }
//   );
//   engine.start();
// }
