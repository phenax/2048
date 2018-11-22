import Enum from 'enum-fp';
import { compose, transpose, eqProps, head, map, filter, groupWith } from 'ramda';

import RootAction from '../actions';
import { Block } from '../utils/block-utils';

// :: FlowDirection
const FlowDirection = Enum([ 'Left', 'Right' ]);

// getZero :: () -> Block
const getZero = () => Block(0);

const log = msg => data => {
  console.log(msg, data);
  return data;
};

const getNumber = x => x.number;

// sumMatches :: [Block] -> [Block]
const sumMatches = compose(
  map(compose(
    Block,
    xs => xs.length * getNumber(head(xs)),
  )),
  groupWith(eqProps('number')),
);

// padRow :: Number -> FlowDirection -> (() -> Block) -> [Block] -> [Block]
const padRow = (size, direction, getBlock) => row => {
  const paddingLen = size - row.length;
  if(paddingLen === 0) return row;
  const padding = Array(paddingLen).fill(null).map(getBlock);
  return FlowDirection.match(direction, {
    Left: () => row.concat(padding),
    Right: () => padding.concat(row),
  });
};

// moveHorizontal :: (FlowDirection, () -> Block) -> [[Block]] -> [[Block]]
const moveHorizontal = (size, direction, newBlock) => grid => grid
  .map(filter(item => getNumber(item) !== 0)) // Remove zeroes
  .map(sumMatches) // Sum the close 
  .map(padRow(size, direction, getZero))
  .map(row => getNumber(row[0]) === 0 ? [newBlock(), ...row.slice(1, row.length)] : row);

// moveVertical :: (FlowDirection, () -> Block) -> [[Block]] -> [[Block]]
const moveVertical = (size, direction, newBlock) => compose(
  transpose,
  moveHorizontal(size, direction, newBlock),
  transpose,
);

export default RootAction.cata({
  MoveLeft: getNextBlock => state => ({
    ...state,
    grid: moveHorizontal(state.grid[0].length, FlowDirection.Left(), getNextBlock)(state.grid),
  }),
  MoveRight: getNextBlock => state => ({
    ...state,
    grid: moveHorizontal(state.grid[0].length, FlowDirection.Right(), getNextBlock)(state.grid),
  }),
  MoveUp: getNextBlock => state => ({
    ...state,
    grid: moveVertical(state.grid[0].length, FlowDirection.Left(), getNextBlock)(state.grid),
  }),
  MoveDown: getNextBlock => state => ({
    ...state,
    grid: moveVertical(state.grid[0].length, FlowDirection.Right(), getNextBlock)(state.grid),
  }),
  _: () => state => state,
});
