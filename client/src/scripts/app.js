import playerImg from '../images/player.png';
import Engine from './core/Engine';
import Player from './core/Player';

// ==========================================================
// resource load
// ==========================================================
const spriteSheet = new Image();
spriteSheet.src = playerImg;
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
const playerConfig = {
  position: {
    x: 100,
    y: 100,
  },
  input: [
    {
      action: 'up',
      code: 'KeyW',
    },
    {
      action: 'right',
      code: 'KeyD',
    },
    {
      action: 'down',
      code: 'KeyS',
    },
    {
      action: 'left',
      code: 'KeyA',
    },
  ],
  graphics: {
    spriteSheet: spriteSheet,
    columns: 3,
    rows: 4,
    scale: 3,
  },
  animation: {
    animationStep: 10,
    animationMap: [
      {
        action: 'down',
        cycle: 0,
        sequence: [0, 1, 0, 2],
      },
      {
        action: 'downIdle',
        cycle: 0,
        sequence: [0],
        default: true,
      },
      {
        action: 'up',
        cycle: 1,
        sequence: [0, 1, 0, 2],
      },
      {
        action: 'upIdle',
        cycle: 1,
        sequence: [0],
      },
      {
        action: 'left',
        cycle: 2,
        sequence: [0, 1, 0, 2],
      },
      {
        action: 'leftIdle',
        cycle: 2,
        sequence: [0],
      },
      {
        action: 'right',
        cycle: 3,
        sequence: [0, 1, 0, 2],
      },
      {
        action: 'rightIdle',
        cycle: 3,
        sequence: [0],
      },
    ],
  },
};

// ==========================================================
// init
// ==========================================================
function init() {
  const player = new Player(playerConfig);

  const gameLoop = new Engine(
    function update() {
      player.update();
    },
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.putImageData(
        player.frame,
        player.position.x,
        player.position.y,
        0,
        0,
        player.frame.width,
        player.frame.height
      );
    }
  );
  // gameLoop.start();
}
