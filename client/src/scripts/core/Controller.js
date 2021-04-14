class KeyInput {
  constructor() {
    this.isActive = false;
    this.isDown = false;
  }

  getInput(isDown) {
    if (this.isDown !== isDown) this.isActive = isDown;
    this.isDown = isDown;
  }
}

class Controller {
  #keyMap;

  /**
   * Game controller.
   *
   * Handles the input state.
   * The keyMap array must be given as constructor parameter.
   * This maps the key pressed (code) to an action name.
   *
   * @param {*} keyMap - Array of {code: String, action: String}
   *
   * @props action.isActive
   * @props action.isDown
   */
  constructor(keyMap = []) {
    this.#keyMap = keyMap;
    this.#keyMap.forEach((keyItem) => {
      const { action } = keyItem;
      this[action] = new KeyInput();
    });

    this.#init();
  }

  #init() {
    window.addEventListener('keydown', (event) => {
      const { type, code } = event;
      this.keyDownUp(type, code);
    });

    window.addEventListener('keyup', (event) => {
      const { type, code } = event;
      this.keyDownUp(type, code);
    });
  }

  keyDownUp(type, code) {
    const isDown = type === 'keydown' ? true : false;
    const keyItem =
      this.#keyMap.find((keyItem) => code === keyItem.code) || null;
    if (keyItem) {
      const { action } = keyItem;
      this[action].getInput(isDown);
    }
  }
}

export default Controller;
