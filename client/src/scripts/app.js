import Engine from './core/Engine';
import Display from './core/Display';
import Resource from './core/Resource';

import ballSrc from '../images/paddle_ball.png';
import levelSrc from '../images/paddle_level.png';
import paddleSrc from '../images/paddle_player.png';
import ballConfig from './config/ball';
import paddleConfig from './config/paddle';
import Ball from './assets/Ball';
import Paddle from './assets/Paddle';

export default () => {
  const images = [
    { src: ballSrc, name: 'ball' },
    { src: levelSrc, name: 'level' },
    { src: paddleSrc, name: 'paddle' },
  ];

  Resource.preloadImages(images).then(() => {
    const ballImg = Resource.getImage('ball');
    const paddleImg = Resource.getImage('paddle');

    const ball = new Ball(ballConfig(ballImg.image));
    const paddle = new Paddle(paddleConfig(paddleImg.image));

    const display = new Display({
      id: 'canvas',
      width: 832,
      height: 640,
      background: 'rgb(180, 217, 230)',
    });

    const gameLoop = new Engine(
      function update() {
        display.clear();
        ball.update(display.width, display.height, paddle);
        paddle.update(display.width, display.height);
      },
      function render() {
        display.render(ball.sprite, ball.position.x, ball.position.y);
        display.render(paddle.sprite, paddle.position.x, paddle.position.y);
      }
    );
    gameLoop.start();
  });
};
