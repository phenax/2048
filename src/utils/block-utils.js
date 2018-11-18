
const blockUtils = {
  scaleUnit: 9,//Random.int(0, 100),
  getRgbUnit: (scale, number) => number === 0 ? 240 : Math.floor(blockUtils.scaleUnit * scale * number) % 255,
  getColor: number => `rgb(${[
    blockUtils.getRgbUnit(1, number),
    blockUtils.getRgbUnit(39, number),
    blockUtils.getRgbUnit(83, number),
  ].join(',')})`,
};

export default blockUtils;
