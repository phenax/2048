
const Block = {
  scaleUnit: 9,//Random.int(0, 100),
  getRgbUnit: (scale, number) => Math.floor(Block.scaleUnit * scale * number) % 255,
  getColor: number => `rgba(${[
    Block.getRgbUnit(1, number),
    Block.getRgbUnit(39, number),
    Block.getRgbUnit(83, number),
    number === 0 ? 0 : 255,
  ].join(',')})`,
};

export default Block;
