const ballConfig = (spriteSheet) => {
  return {
    type: 'static',
    position: {
      x: 300,
      y: 0,
    },
    graphics: {
      spriteSheet: spriteSheet,
      columns: 1,
      rows: 1,
      scale: 4,
    },
  };
};

export default ballConfig;
