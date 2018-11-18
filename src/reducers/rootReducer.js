import RootAction from '../actions';

export default RootAction.cata({
  MoveLeft: getNextValue => state => ({
    ...state,
    grid: state.grid.map((row, rIndex) =>
      [ getNextValue(rIndex, 0), ...row ]
        .slice(0, state.grid[0].length)
    ),
  }),
  _: () => state => state,
});
