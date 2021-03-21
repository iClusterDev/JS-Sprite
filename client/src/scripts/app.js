import characterSrc from '../images/character2.png';
import Engine from './Engine';

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
// globals
// ==========================================================
const scale = 2;
const width = 16;
const height = 18;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(
    spriteSheet,
    frameX * width,
    frameY * height,
    width,
    height,
    canvasX,
    canvasY,
    scaledWidth,
    scaledHeight
  );
}

let animationCycle = [0, 1, 0, 2];
let currentAnimationCycleIndex = 0;
let upCycle = 1;
let rightCycle = 2;
let downCycle = 0;
let leftCycle = 3;
let frameCount = 0;

// ==========================================================
// engine
// ==========================================================
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frameCount++;
  if (frameCount === 10) {
    frameCount = 0;
    currentAnimationCycleIndex++;
    if (currentAnimationCycleIndex >= animationCycle.length) {
      currentAnimationCycleIndex = 0;
    }
  }
}

function render() {
  drawFrame(animationCycle[currentAnimationCycleIndex], upCycle, 200, 200);
  drawFrame(animationCycle[currentAnimationCycleIndex], rightCycle, 300, 300);
  drawFrame(animationCycle[currentAnimationCycleIndex], downCycle, 100, 100);
  drawFrame(animationCycle[currentAnimationCycleIndex], leftCycle, 400, 400);
}

const engine = new Engine(update, render);

// ==========================================================
// init
// ==========================================================
function init() {
  engine.start();
}
