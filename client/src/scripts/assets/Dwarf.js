import Entity from '../core/Entity';

class Dwarf extends Entity {
  constructor(config = {}) {
    super(config);
    this.speed = 2;
  }

  update() {
    this.position.x += this.speed;
  }
}

export default Dwarf;
