const squareConfig = (spriteSheet) => {
  return {
    position: {
      x: 300,
      y: 400,
    },
    graphics: {
      spriteSheet: spriteSheet,
      columns: 1,
      rows: 1,
      scale: 6,
    },
  };
};

export default squareConfig;
