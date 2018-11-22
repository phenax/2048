import RootAction from '../actions';

import blockUtils from '../utils/block-utils';

const sumMatches = arr => arr.reduce((acc, item) => [
  ...acc,
  item.number === acc[acc.length - 1].number
    ? ({ ...item, number: item.number * 2 })
    : ({ ...item })
], []);

export default RootAction.cata({
  MoveRight: getNextValue => state => ({
    ...state,
    grid: state.grid.map((row, rIndex) =>
      [ getNextValue(rIndex, 0), ...row ]
        .slice(0, state.grid[0].length)
    ),
  }),
  _: () => state => state,
});
