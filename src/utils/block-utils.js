import { createPipe } from 'pipey';
import { range, compose, transpose, eqProps, head, last, map, chain, filter, groupWith } from 'ramda';

import FlowDirection from './FlowDirection';

// :: Block
export const Block = number => ({ number });

// zero :: () -> Block
export const zero = () => Block(0);

// getColor :: Number -> String
export const getColor = number => number === 0
  ? 'rgb(240, 240, 240)'
  : `hsl(${[
    `${150 + (10 * (Math.log2(number) % 10))}`,
    '60%',
    '58%',
  ].join(',')})`;

const mapIndexed = createPipe('map');

// getNumber :: Block -> Number
const getNumber = x => x.number;
// getFirstNumber :: [Block] -> Number
const getFirstNumber = compose(getNumber, head);
// getLastNumber :: [Block] -> Number
const getLastNumber = compose(getNumber, last);

// sumMatches :: FlowDirection -> [Block] -> [Block]
export const sumMatches = direction => compose(
  map(Block),
  chain(xs => {
    const groups = range(0, Math.floor(xs.length / 2))
      .map(x => 2 * getFirstNumber(xs));

    return xs.length % 2
      ? FlowDirection.concatArray(groups, [getFirstNumber(xs)])(direction)
      : groups;
  }),
  groupWith(eqProps('number')),
);

// padRow :: (Number, FlowDirection, () -> Block) -> [Block] -> [Block]
export const padRow = (size, direction, getBlock) => row => {
  const paddingLen = size - row.length;
  if(paddingLen === 0) return row;
  const padding = range(0, paddingLen).map(getBlock);
  return FlowDirection.concatArray(row, padding)(direction);
};

// addBlock :: ([Block], FlowDirection) -> ([Block], index) -> [Block]
export const addBlock = (newRow, direction) => (row, index) => FlowDirection.match(direction, {
  Forward: () => getLastNumber(row) === 0 ? [ ...row.slice(0, row.length - 1), newRow[index] ] : row,
  Reverse: () => getFirstNumber(row) === 0 ? [ newRow[index], ...row.slice(1, row.length) ] : row,
});

// moveHorizontal :: (Number, FlowDirection, [Block]) -> [[Block]] -> [[Block]]
export const moveHorizontal = (size, direction, newBlock) => compose(
  mapIndexed(addBlock(newBlock, direction)),
  map(padRow(size, direction, zero)),
  map(sumMatches(direction)),
  map(filter(item => getNumber(item) !== 0)),
);

// moveVertical :: (Number, FlowDirection, [Block]) -> [[Block]] -> [[Block]]
export const moveVertical = (size, direction, newRow) => compose(
  transpose,
  moveHorizontal(size, direction, newRow),
  transpose,
);
