import Enum from 'enum-fp';
import { range, compose, transpose, eqProps, head, last, map, chain, filter, groupWith } from 'ramda';

import RootAction from '../actions';
import { Block, zero } from '../utils/block-utils';

// :: FlowDirection
const FlowDirection = Enum([ 'Left', 'Right' ]);

// FlowDirection.concatArray : ([a], [a]) -> [a]
FlowDirection.concatArray = (arr1, arr2) => FlowDirection.cata({
  Left: () => arr1.concat(arr2),
  Right: () => arr2.concat(arr1),
});

// getNumber :: Block -> Number
const getNumber = x => x.number;
// getFirstNumber :: [Block] -> Number
const getFirstNumber = compose(getNumber, head);
// getLastNumber :: [Block] -> Number
const getLastNumber = compose(getNumber, last);

// sumMatches :: Direction -> [Block] -> [Block]
const sumMatches = direction => compose(
  map(Block),
  chain(xs => {
    const groups =
      range(0, Math.floor(xs.length / 2))
        .map(x => 2 * getFirstNumber(xs));

    return xs.length % 2
      ? FlowDirection.concatArray(groups, [getFirstNumber(xs)])(direction)
      : groups;
  }),
  groupWith(eqProps('number')),
);

// padRow :: (Number, Flow, () -> Block) -> [Block] -> [Block]
const padRow = (size, direction, getBlock) => row => {
  const paddingLen = size - row.length;
  if(paddingLen === 0) return row;
  const padding = range(0, paddingLen).map(getBlock);
  return FlowDirection.concatArray(row, padding)(direction);
};

const addBlock = (newRow, direction) => (row, index) => FlowDirection.match(direction, {
  Left: () => getLastNumber(row) === 0 ? [ ...row.slice(0, row.length - 1), newRow[index] ] : row,
  Right: () => getFirstNumber(row) === 0 ? [ newRow[index], ...row.slice(1, row.length) ] : row,
});

// moveHorizontal :: (Number, FlowDirection, [Block]) -> [[Block]] -> [[Block]]
const moveHorizontal = (size, direction, newBlock) => grid => grid
  .map(filter(item => getNumber(item) !== 0)) // Remove zeroes
  .map(sumMatches(direction)) // Sum the close 
  .map(padRow(size, direction, zero))
  .map(addBlock(newBlock, direction));

// moveVertical :: (Number, FlowDirection, [Block]) -> [[Block]] -> [[Block]]
const moveVertical = (size, direction, newRow) => compose(
  transpose,
  moveHorizontal(size, direction, newRow),
  transpose,
);

export default RootAction.cata({
  MoveLeft: newRow => state => ({
    ...state,
    grid: moveHorizontal(state.grid[0].length, FlowDirection.Left(), newRow)(state.grid),
  }),
  MoveRight: newRow => state => ({
    ...state,
    grid: moveHorizontal(state.grid[0].length, FlowDirection.Right(), newRow)(state.grid),
  }),
  MoveUp: newRow => state => ({
    ...state,
    grid: moveVertical(state.grid[0].length, FlowDirection.Left(), newRow)(state.grid),
  }),
  MoveDown: newRow => state => ({
    ...state,
    grid: moveVertical(state.grid[0].length, FlowDirection.Right(), newRow)(state.grid),
  }),
  _: () => state => state,
});
