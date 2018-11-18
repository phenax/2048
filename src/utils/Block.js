
const Block = {
  scaleUnit: 9,//Random.int(0, 100),
  getRgbUnit: (scale, number) => number === 0 ? 240 : Math.floor(Block.scaleUnit * scale * number) % 255,
  getColor: number => `rgb(${[
    Block.getRgbUnit(1, number),
    Block.getRgbUnit(39, number),
    Block.getRgbUnit(83, number),
  ].join(',')})`,
};

export default Block;
