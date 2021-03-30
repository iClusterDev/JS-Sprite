const zombieConfig = (spriteSheet) => {
  return {
    type: 'dynamic',
    position: {
      x: 100,
      y: 100,
    },
    graphics: {
      spriteSheet: spriteSheet,
      columns: 3,
      rows: 4,
      scale: 1.5,
    },
    animation: {
      animationStep: 10,
      animationMap: [
        {
          action: 'down',
          cycle: 0,
          sequence: [1, 0, 2, 0],
        },
        {
          action: 'downIdle',
          cycle: 0,
          sequence: [1],
          default: true,
        },
        {
          action: 'up',
          cycle: 2,
          sequence: [1, 0, 2, 0],
        },
        {
          action: 'upIdle',
          cycle: 2,
          sequence: [1],
        },
        {
          action: 'left',
          cycle: 3,
          sequence: [0, 1, 0, 2],
        },
        {
          action: 'leftIdle',
          cycle: 3,
          sequence: [0],
        },
        {
          action: 'right',
          cycle: 1,
          sequence: [1, 0, 2, 0],
        },
        {
          action: 'rightIdle',
          cycle: 1,
          sequence: [1],
        },
      ],
    },
  };
};

export default zombieConfig;
