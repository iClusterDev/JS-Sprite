// ==========================================================
// spritesheet
// ==========================================================
class SpriteSheet {
  constructor(config = {}) {
    const { spriteSheet, rows, columns, scale = 1 } = config;
    if (!spriteSheet || !rows || !columns)
      throw new Error('SpriteSheet(): Missing required parameter!');

    this.buffer = new OffscreenCanvas(
      spriteSheet.width * scale,
      spriteSheet.height * scale
    ).getContext('2d');
    this.frameW = (spriteSheet.width / columns) * scale;
    this.frameH = (spriteSheet.height / rows) * scale;

    this.buffer.drawImage(
      spriteSheet,
      0,
      0,
      spriteSheet.width * scale,
      spriteSheet.height * scale
    );
  }

  getFrame(sX, sY) {
    return this.buffer.getImageData(
      this.frameW * sX,
      this.frameH * sY,
      this.frameW,
      this.frameH
    );
  }
}

// ==========================================================
// animation
// ==========================================================
class Animation {
  constructor(config = {}) {
    this.spriteSheet = new SpriteSheet(config);
    this.frameCycle = [0, 1, 0, 2];
    this.frameCycleIndex = 0;
    this.actionCycle = {
      up: 1,
      right: 2,
      down: 0,
      left: 3,
    };
    this.frameCount = 0;
    this.updated = false;
  }

  get frame() {
    return this.spriteSheet.getFrame(
      this.frameCycle[this.frameCycleIndex],
      this.actionCycle.left
    );
  }

  animate() {
    this.frameCount++;
    this.updated = false;
    if (this.frameCount === 10) {
      this.frameCount = 0;
      this.frameCycleIndex++;
      if (this.frameCycleIndex >= this.frameCycle.length) {
        this.frameCycleIndex = 0;
      }
      this.updated = true;
    }
  }
}

export default Animation;
