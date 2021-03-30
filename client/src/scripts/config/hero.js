const heroConfig = (spriteSheet) => {
  return {
    type: 'dynamic',
    position: {
      x: 100,
      y: 100,
    },
    input: [
      {
        action: 'up',
        code: 'KeyW',
      },
      {
        action: 'right',
        code: 'KeyD',
      },
      {
        action: 'down',
        code: 'KeyS',
      },
      {
        action: 'left',
        code: 'KeyA',
      },
    ],
    graphics: {
      spriteSheet: spriteSheet,
      columns: 3,
      rows: 4,
      scale: 3,
    },
    animation: {
      animationStep: 10,
      animationMap: [
        {
          action: 'down',
          cycle: 0,
          sequence: [0, 1, 0, 2],
        },
        {
          action: 'downIdle',
          cycle: 0,
          sequence: [0],
          default: true,
        },
        {
          action: 'up',
          cycle: 1,
          sequence: [0, 1, 0, 2],
        },
        {
          action: 'upIdle',
          cycle: 1,
          sequence: [0],
        },
        {
          action: 'left',
          cycle: 2,
          sequence: [0, 1, 0, 2],
        },
        {
          action: 'leftIdle',
          cycle: 2,
          sequence: [0],
        },
        {
          action: 'right',
          cycle: 3,
          sequence: [0, 1, 0, 2],
        },
        {
          action: 'rightIdle',
          cycle: 3,
          sequence: [0],
        },
      ],
    },
  };
};

export default heroConfig;
