
const SCALE_UNIT = 9;

// :: Block
export const Block = number => ({ number });

// zero :: () -> Block
export const zero = () => Block(0);

// getRgbUnit :: (Number, Number) -> Number
export const getRgbUnit = (scale, number) =>
  number === 0 ? 240 : Math.floor(SCALE_UNIT * scale * number) % 255;

// getColor :: Number -> String
export const getColor = number =>
  `rgb(${[
    getRgbUnit(1, number),
    getRgbUnit(39, number),
    getRgbUnit(83, number),
  ].join(',')})`;
