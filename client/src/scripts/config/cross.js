const crossConfig = (spriteSheet) => {
  return {
    type: 'dynamic',
    position: {
      x: 0,
      y: 0,
    },
    graphics: {
      spriteSheet: spriteSheet,
      columns: 1,
      rows: 1,
      scale: 6,
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
  };
};

export default crossConfig;
