class Animation {
  #updated;
  #frameCounter;
  #animationMap;
  #animationStep;
  #currentAnimation;
  #currentSequenceIndex;

  /**
   * Animation component
   *
   * Handles the animation indexes defined as per
   * configuration object. The animation step is
   * the update rate defining the animation speed, defined
   * in number of frames.
   * The animation map is an array of object containing the
   * action: animation name, cycle: cycle index, sequence: array
   * of frame indexes
   *
   * @param {*} animationConfig Object - config object
   * @param {*} animationConfig.step Number - animation step
   * @param {*} animationConfig.map Array - animation indexes definition
   */
  constructor(animationConfig = {}) {
    const { animationStep, animationMap } = animationConfig;
    const defaultAnimation =
      animationMap.find(
        (animationMapItem) => animationMapItem.default === true
      ) || animationMap[0];

    this.#animationMap = animationMap;
    this.#animationStep = animationStep;
    this.#currentAnimation = defaultAnimation;
    this.#currentSequenceIndex = 0;
    this.#frameCounter = 0;
    this.#updated = false;
  }

  get frameChanged() {
    return this.#updated;
  }

  get frameAction() {
    return this.#currentAnimation.action;
  }

  get frameIndex() {
    return {
      x: this.#currentAnimation.sequence[this.#currentSequenceIndex],
      y: this.#currentAnimation.cycle,
    };
  }

  #setAnimationAction(action) {
    this.#currentAnimation = this.#animationMap.find(
      (animationMapItem) => animationMapItem.action === action
    );
  }

  animate(action) {
    this.#frameCounter++;
    this.#updated = false;

    if (this.#frameCounter === this.#animationStep) {
      if (action !== this.#currentAnimation.action)
        this.#setAnimationAction(action);
      this.#frameCounter = 0;
      this.#currentSequenceIndex++;
      if (this.#currentSequenceIndex >= this.#currentAnimation.sequence.length)
        this.#currentSequenceIndex = 0;

      this.#updated = true;
    }
  }
}

export default Animation;
