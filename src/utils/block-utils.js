
const SCALE_UNIT = 9;

export const Block = number => ({ number });

export const getRgbUnit = (scale, number) =>
  number === 0 ? 240 : Math.floor(SCALE_UNIT * scale * number) % 255;

export const getColor = number =>
  `rgb(${[
    getRgbUnit(1, number),
    getRgbUnit(39, number),
    getRgbUnit(83, number),
  ].join(',')})`;
