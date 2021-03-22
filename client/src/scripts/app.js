import characterSrc from '../images/character2.png';
import Engine from './Engine';
import Animation from './Animation';
import Controller from './Controller';

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
  const keyMap = [
    { code: 'ArrowRight', action: 'right' },
    { code: 'ArrowDown', action: 'down' },
    { code: 'ArrowLeft', action: 'left' },
    { code: 'ArrowUp', action: 'up' },
    { code: 'KeyD', action: 'right' },
    { code: 'KeyS', action: 'down' },
    { code: 'KeyA', action: 'left' },
    { code: 'KeyW', action: 'up' },
  ];
  const controller = new Controller(keyMap);
  window.addEventListener('keydown', (event) => {
    const { type, code } = event;
    controller.keyDownUp(type, code);
  });
  window.addEventListener('keyup', (event) => {
    const { type, code } = event;
    controller.keyDownUp(type, code);
  });

  const animation = new Animation({
    spriteSheet: spriteSheet,
    scale: 3,
    rows: 4,
    columns: 3,
  });

  const gameLoop = new Engine(
    function update() {
      if (controller.up.isActive) {
        positionY -= SPEED;
        actionCycle = FACING_UP;
        animation.animate(actionCycle);
      } else if (controller.right.isActive) {
        positionX += SPEED;
        actionCycle = FACING_RIGHT;
        animation.animate(actionCycle);
      } else if (controller.down.isActive) {
        positionY += SPEED;
        actionCycle = FACING_DOWN;
        animation.animate(actionCycle);
      } else if (controller.left.isActive) {
        positionX -= SPEED;
        actionCycle = FACING_LEFT;
        animation.animate(actionCycle);
      } else {
        animation.idle();
      }
    },

    function render() {
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
    }
  );

  gameLoop.start();
}
