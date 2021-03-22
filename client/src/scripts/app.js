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
// input
// ==========================================================
let keyPresses = {};

window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
  keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
  keyPresses[event.key] = false;
}

const SPEED = 2;
let positionX = 0;
let positionY = 0;

const FACING_DOWN = 0;
const FACING_UP = 1;
const FACING_LEFT = 2;
const FACING_RIGHT = 3;
let actionCycle = FACING_DOWN;

// ==========================================================
// init
// ==========================================================
function init() {
  const animation = new Animation({
    spriteSheet: spriteSheet,
    scale: 3,
    rows: 4,
    columns: 3,
  });

  const gameLoop = new Engine(
    function update() {
      if (keyPresses.w) {
        positionY -= SPEED;
        actionCycle = FACING_UP;
        animation.animate(actionCycle);
      } else if (keyPresses.s) {
        positionY += SPEED;
        actionCycle = FACING_DOWN;
        animation.animate(actionCycle);
      } else if (keyPresses.a) {
        positionX -= SPEED;
        actionCycle = FACING_LEFT;
        animation.animate(actionCycle);
      } else if (keyPresses.d) {
        positionX += SPEED;
        actionCycle = FACING_RIGHT;
        animation.animate(actionCycle);
      } else {
        animation.idle();
      }
    },

    function render() {
      // if (animation.updated) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.putImageData(
        animation.frame,
        positionX,
        positionY,
        0,
        0,
        animation.frame.width,
        animation.frame.height
      );
      // }
    }
  );

  gameLoop.start();
}
