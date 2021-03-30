const dwarfConfig = (spriteSheet) => {
  return {
    type: 'dynamic',
    position: {
      x: 300,
      y: 400,
    },
    graphics: {
      spriteSheet: spriteSheet,
      columns: 1,
      rows: 1,
      scale: 3,
    },
  };
};

export default dwarfConfig;
