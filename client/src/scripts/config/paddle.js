const paddleConfig = (spriteSheet) => {
  return {
    type: 'static',
    position: {
      x: 0,
      y: 532,
    },
    graphics: {
      spriteSheet: spriteSheet,
      columns: 1,
      rows: 1,
      scale: 4,
    },
    input: [
      {
        action: 'right',
        code: 'KeyD',
      },
      {
        action: 'left',
        code: 'KeyA',
      },
    ],
  };
};

export default paddleConfig;
