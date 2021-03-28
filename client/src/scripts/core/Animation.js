// ==========================================================
// animation
// ==========================================================
class Animation {
  #updated;
  #frameCounter;
  #animationMap;
  #animationStep;
  #currentAnimation;
  #currentSequenceIndex;

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

  #set(action) {
    this.#currentAnimation = this.#animationMap.find(
      (animationMapItem) => animationMapItem.action === action
    );
  }

  animate(action) {
    this.#frameCounter++;
    this.#updated = false;

    if (this.#frameCounter === this.#animationStep) {
      if (action !== this.#currentAnimation.action) this.#set(action);
      this.#frameCounter = 0;
      this.#currentSequenceIndex++;
      if (this.#currentSequenceIndex >= this.#currentAnimation.sequence.length)
        this.#currentSequenceIndex = 0;

      this.#updated = true;
    }
  }
}

export default Animation;
