import Enum from 'enum-fp';
import { compose, transpose, prop, pathOr, curry, map, filter, groupWith, equals } from 'ramda';

import RootAction from '../actions';
import blockUtils from '../utils/block-utils';

// :: FlowDirection
const FlowDirection = Enum([ 'Left', 'Right' ]);

// getZero :: () -> Block
const getZero = () => blockUtils.Block(0);

const log = msg => data => {
  console.log(msg, data);
  return data;
};

// sumMatches :: [Block] -> [Block]
const sumMatches = compose(
  map(compose(
    blockUtils.Block,
    xs => xs[0] ? (xs.length * xs[0].number) : 0,
  )),
  groupWith((a, b) => equals(a.number, b.number)),
);

// padRow :: Number -> FlowDirection -> (() -> Block) -> [Block] -> [Block]
const padRow = (paddingLen, direction, getBlock, row) => {
  if(paddingLen === 0) return row;
  const padding = Array(paddingLen).fill(null).map(getBlock);
  return FlowDirection.match(direction, {
    Left: () => row.concat(padding),
    Right: () => padding.concat(row),
  });
};

// moveHorizontal :: (FlowDirection, () -> Block) -> [[Block]] -> [[Block]]
const moveHorizontal = (direction, newBlock) => grid => grid
  .map(filter(item => item.number !== 0)) // Remove zeroes
  .map(sumMatches) // Sum the close 
  .map(row => padRow(grid[0].length - row.length, direction, getZero, row))
  .map(row => row[0].number === 0 ? [newBlock(), ...row.slice(1, row.length)] : row);

// moveVertical :: (FlowDirection, () -> Block) -> [[Block]] -> [[Block]]
const moveVertical = (direction, newBlock) => compose(
  transpose,
  moveHorizontal(direction, newBlock),
  transpose,
);

export default RootAction.cata({
  MoveLeft: getNextBlock => state => ({
    ...state,
    grid: moveHorizontal(FlowDirection.Left(), getNextBlock)(state.grid),
  }),
  MoveRight: getNextBlock => state => ({
    ...state,
    grid: moveHorizontal(FlowDirection.Right(), getNextBlock)(state.grid),
  }),
  MoveUp: getNextBlock => state => ({
    ...state,
    grid: moveVertical(FlowDirection.Left(), getNextBlock)(state.grid),
  }),
  MoveDown: getNextBlock => state => ({
    ...state,
    grid: moveVertical(FlowDirection.Right(), getNextBlock)(state.grid),
  }),
  _: () => state => state,
});
