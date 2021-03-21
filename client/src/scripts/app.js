import Engine from './Engine';
import playerSrc from '../images/player.png';

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

const images = {};
images.player = new Image();
images.player.src = playerSrc;

function randomBetween(min, max) {
  return Math.floor(Math.random() * max - min);
}

// const characterActions = ['up', 'right', 'down', 'left'];
const characterActions = ['up', 'right', 'down'];
const animationMap = [
  {
    name: 'up',
    mirror: false,
    frame: 3,
    start: 3,
    end: 13,
    row: 0,
  },
  {
    name: 'right',
    mirror: false,
    frame: 3,
    start: 3,
    end: 13,
    row: 3,
  },
  {
    name: 'down',
    mirror: false,
    frame: 0,
    start: 0,
    end: 12,
    row: 6,
  },
  {
    name: 'left',
    mirror: true,
    frame: 3,
    start: 3,
    end: 13,
    row: 3,
  },
];

class Character {
  constructor(spriteSheet, animationMap, context) {
    this.context = context;
    this.spriteSheet = spriteSheet;
    this.width = 103.0625; // computed from spriteSheet / xFrames
    this.height = 113.125; // computed from spriteSheet / yFrames
    this.speed = 5;
    this.x = randomBetween(0, this.context.canvas.width - this.width);
    this.y = randomBetween(0, this.context.canvas.height - this.height);
    this.action = characterActions[randomBetween(0, characterActions.length)];
    this.animation = animationMap.find(
      (animation) => animation.name === this.action
    );
  }

  moveUp() {
    if (this.y < 0 - this.height) {
      this.y = this.context.canvas.height;
      this.x = randomBetween(0, this.context.canvas.width - this.width);
    } else {
      this.y -= this.speed;
    }
  }

  moveRight() {
    if (this.x > this.context.canvas.width) {
      this.x = 0 - this.width;
      this.y = randomBetween(0, this.context.canvas.height - this.height);
    } else {
      this.x += this.speed;
    }
  }

  moveDown() {
    if (this.y > this.context.canvas.height) {
      this.y = 0 - this.height;
      this.x = randomBetween(0, this.context.canvas.width - this.width);
    } else {
      this.y += this.speed;
    }
  }

  moveLeft() {
    if (this.x < 0 - this.width) {
      this.x = this.context.canvas.width;
      this.y = randomBetween(0, this.context.canvas.height - this.height);
    } else {
      this.x -= this.speed;
    }
  }

  draw() {
    this.context.drawImage(
      this.spriteSheet,
      this.width * this.animation.frame,
      this.height * this.animation.row,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update() {
    switch (this.action) {
      case 'up':
        this.moveUp();
        break;
      case 'right':
        this.moveRight();
        break;
      case 'down':
        this.moveDown();
        break;
      default:
        console.log('Error: Update()');
    }

    if (this.animation.frame < this.animation.end) {
      this.animation.frame++;
    } else {
      this.animation.frame = this.animation.start;
    }
  }
}

images.player.addEventListener('load', (e) => {
  const characters = [];
  const numberOfCharacters = 1;
  for (let i = 0; i < numberOfCharacters; i++) {
    characters.push(new Character(images.player, animationMap, ctx));
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

  engine.start();
});
