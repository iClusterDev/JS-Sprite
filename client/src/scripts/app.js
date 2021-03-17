import Engine from './Engine';
import playerSrc from '../images/player.png';

const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const images = {};
images.player = new Image();
images.player.src = playerSrc;

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

// const characterActions = ['up', 'right', 'down', 'left'];
const characterActions = ['up'];

class Character {
  constructor() {
    this.width = 103.0625;
    this.height = 113.125;
    this.frameX = 3;
    this.frameY = 3;
    this.x = 0;
    this.y = 0;
    this.speed = Math.random() * 1.5 + 3.5;
    this.action =
      characterActions[Math.floor(Math.random() * characterActions.length)];
  }
  draw() {
    drawSprite(
      images.player,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    if (this.frameX < 13) {
      this.frameX++;
    } else {
      this.frameX = 3;
    }
  }

  update() {
    if (this.action === 'up') {
      if (this.y < canvas.height + this.height) {
        this.y += this.speed;
      } else {
        this.y = 0 - this.height;
        this.x = Math.random() * canvas.width - this.width;
      }
    }
    if (this.action === 'right') {
      if (this.x < canvas.width + this.width) {
        this.x += this.speed;
      } else {
        this.x = 0 - this.width;
        this.y = Math.random() * canvas.height - this.height;
      }
    }
    if (this.action === 'down') {
    }
    if (this.action === 'left') {
    }
  }
}

images.player.addEventListener('load', (e) => {
  const characters = [];
  characters.push(new Character());

  // ==========================================================
  // engine
  // ==========================================================
  const engine = new Engine(
    (timestep) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      characters[0].update();
    },
    () => {
      characters[0].draw();
    }
  );

  // ==========================================================
  // listeners
  // ==========================================================
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // engine.start();
});
