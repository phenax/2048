import RootAction from '../actions';

import FlowDirection from '../utils/FlowDirection';
import { moveHorizontal, moveVertical } from '../utils/block-utils';

export default RootAction.cata({
  MoveLeft: newRow => ({ grid, ...state }) => ({
    ...state,
    grid: moveHorizontal(grid.length, FlowDirection.Forward(), newRow)(grid),
  }),
  MoveRight: newRow => ({ grid, ...state }) => ({
    ...state,
    grid: moveHorizontal(grid.length, FlowDirection.Reverse(), newRow)(grid),
  }),
  MoveUp: newRow => ({ grid, ...state }) => ({
    ...state,
    grid: moveVertical(grid.length, FlowDirection.Forward(), newRow)(grid),
  }),
  MoveDown: newRow => ({ grid, ...state }) => ({
    ...state,
    grid: moveVertical(grid.length, FlowDirection.Reverse(), newRow)(grid),
  }),
  _: () => ({ grid, ...state }) => state,
});
