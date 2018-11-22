import Enum from 'enum-fp';
import { compose, transpose, pathOr } from 'ramda';

import RootAction from '../actions';
import blockUtils from '../utils/block-utils';

const FlowDirection = Enum([ 'Left', 'Right' ]);

const sumMatches = row => row.reduce((acc, item) => [
  ...acc,
  item.number === pathOr(0, [acc.length - 1, 'number'], acc)
    ? ({ ...item, number: item.number * 2 })
    : ({ ...item })
], []);

// padRow :: Number -> FlowDirection -> (() -> Block) -> [Block] -> [Block]
const padRow = (length, direction, getBlock, row) => {
  const padding = Array(length).fill(null).map(getBlock);
  return FlowDirection.match(direction, {
    Left: () => row.concat(padding),
    Right: () => padding.concat(row),
  });
};

// compactRow :: FlowDirection -> [Block] -> [Block]
const compactRow = direction => row => {
  const nonZeros = row.filter(item => item.number !== 0);
  const getZero = () => blockUtils.Block(0);
  return padRow(row.length - nonZeros.length, direction, getZero, nonZeros);
};

const log = msg => data => {
  console.log(msg, data);
  return data;
};

export default RootAction.cata({
  MoveRight: getNextValue => state => {
    const direction = FlowDirection.Right();
    return {
      ...state,
      grid: state.grid
        .map(compactRow(direction))
        // .map(sumMatches) // Sum the close 
        // .map(row => padRow(state.grid[0].length, direction))
        // .map((row, rIndex) => [ getNextValue(rIndex, 0), ...row ]) // Prepend new item
        // .map(row => row.slice(0, state.grid[0].length)), // Clamp the list for the length
    };
  },
  _: () => state => state,
});
