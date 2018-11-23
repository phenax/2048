import { range } from 'ramda';

import RootAction from '../actions';

import FlowDirection from '../utils/FlowDirection';
import { moveHorizontal, moveVertical, randomBlock } from '../utils/block-utils';
import { GRID_COUNT } from '../utils/constants';

const generateGrid = gridCount =>
  range(0, gridCount).map(() => range(0, gridCount).map(() => randomBlock([ 0, 0, 0, 0, 0, 1, 2, 4 ])));

export const initialState = {
  grid: generateGrid(GRID_COUNT),
};

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
