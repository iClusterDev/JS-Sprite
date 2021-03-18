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

function randomBetween(min, max) {
  return Math.floor(Math.random() * max - min);
}

const characterActions = ['up', 'right', 'down', 'left'];

class Character {
  constructor(spriteSheet) {
    this.spriteSheet = spriteSheet;
    this.width = 103.0625;
    this.height = 113.125;
    this.speed = 5;
    this.x = randomBetween(0, canvas.width - this.width);
    this.y = randomBetween(0, canvas.height - this.height);
    this.action =
      characterActions[Math.floor(Math.random() * characterActions.length)];
    if (this.action === 'up') {
      this.frameX = 3;
      this.frameY = 0;
    }
    if (this.action === 'right') {
      this.frameX = 3;
      this.frameY = 3;
    }
    if (this.action === 'left') {
      this.frameX = 3;
      this.frameY = 3;
    }
    if (this.action === 'down') {
      this.frameX = 0;
      this.frameY = 6;
    }
  }
  draw() {
    if (this.action === 'left') {
      // reverse the left frames
    }
    drawSprite(
      this.spriteSheet,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update() {
    if (this.action === 'up') {
      if (this.y < 0 - this.height) {
        this.y = canvas.height;
        this.x = randomBetween(0, canvas.width - this.width);
      } else {
        this.y -= this.speed;
      }

      if (this.frameX < 13) {
        this.frameX++;
      } else {
        this.frameX = 3;
      }
    }

    if (this.action === 'right') {
      if (this.x > canvas.width) {
        this.x = 0 - this.width;
        this.y = randomBetween(0, canvas.height - this.height);
      } else {
        this.x += this.speed;
      }

      if (this.frameX < 13) {
        this.frameX++;
      } else {
        this.frameX = 3;
      }
    }

    if (this.action === 'down') {
      if (this.y > canvas.height) {
        this.y = 0 - this.height;
        this.x = randomBetween(0, canvas.width - this.width);
      } else {
        this.y += this.speed;
      }

      if (this.frameX < 12) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    }

    if (this.action === 'left') {
      if (this.x < 0 - this.width) {
        this.x = canvas.width;
        this.y = randomBetween(0, canvas.height - this.height);
      } else {
        this.x -= this.speed;
      }

      this.frameX = 3;
      this.frameY = 3;
    }
  }
}

images.player.addEventListener('load', (e) => {
  const characters = [];
  const numberOfCharacters = 10;
  for (let i = 0; i < numberOfCharacters; i++) {
    characters.push(new Character(images.player));
  }

  // ==========================================================
  // engine
  // ==========================================================
  const engine = new Engine(
    (timestep) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < characters.length; i++) {
        characters[i].update();
      }
    },
    () => {
      for (let i = 0; i < characters.length; i++) {
        characters[i].draw();
      }
    }
  );

  // ==========================================================
  // listeners
  // ==========================================================
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  engine.start();
});
