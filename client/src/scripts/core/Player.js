import Controller from './Controller';
import Entity from './Entity';

class Player extends Entity {
  /**
   * Game Player character
   *
   * Player object.
   * Requires the input setting object
   * within its config file.
   * @param {*} config
   * @param {*} config.input: Object - player input settings
   * @param {*} config.position: Object - x/y coordinates on canvas
   * @param {*} config.graphics: Object - spritesheet settings
   * @param {*} config.animation: Object - (*optional) animation settings
   */
  constructor(playerConfig = {}) {
    const {
      input = null,
      position = null,
      graphics = null,
      animation = null,
    } = playerConfig;
    if (!input) throw new Error('Player: input setting parameter is required!');

    super({ position, graphics, animation });

    this.controller = new Controller(input);
  }
}

export default Player;
