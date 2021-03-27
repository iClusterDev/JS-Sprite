const dwarfConfig = (spriteSheet) => {
  return {
    position: {
      x: 300,
      y: 400,
    },
    graphics: {
      spriteSheet: spriteSheet,
      columns: 1,
      rows: 1,
      scale: 4,
    },
  };
};

export default dwarfConfig;
