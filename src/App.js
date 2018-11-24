import React from 'react';
import { range, map } from 'ramda';

import RootAction from './actions';

import useReducer from './hooks/useReducer';
import useControls from './hooks/useControls';

import random from './utils/random';
import * as blockUtils from './utils/block-utils';
import Direction from './utils/Direction';
import { GRID_COUNT } from './utils/constants';

import rootReducer, { initialState } from './reducers/rootReducer';

import Grid from './components/Grid';
import Canvas from './components/Canvas';
import NumberBlock from './components/NumberBlock';

// toNumberGrid :: [[Block]] -> [[React.Component]]
const toNumberGrid =
  map(map(block => props => <NumberBlock {...props} block={block} />));

// generateRandomRow :: () -> [Block]
const generateRandomRow = () => {
  const newRow = range(0, GRID_COUNT).map(blockUtils.zero);
  newRow[random.int(0, GRID_COUNT)] = blockUtils.randomBlock([ 0, 1, 2, 4 ]);
  return newRow;
};

export default React.memo(() => {
  const [ state, dispatch ] = useReducer(rootReducer, initialState);

  const handlers = useControls(({ direction }) => {
    const newRow = generateRandomRow();

    Direction.match(direction, {
      Default: () => {},
      Left: () => dispatch(RootAction.MoveLeft(newRow)),
      Right: () => dispatch(RootAction.MoveRight(newRow)),
      Up: () => dispatch(RootAction.MoveUp(newRow)),
      Down: () => dispatch(RootAction.MoveDown(newRow)),
    });
  });

  const boxSize = 100;
  const margin = 10;
  const canvasSize = (boxSize + margin) * GRID_COUNT + margin;

  return (
    <div className="game">
      <header className="game--header">2048</header>
      <div className="game--container">
        <Canvas width={canvasSize} height={canvasSize} {...handlers}>
          <Grid
            grid={toNumberGrid(state.grid)}
            size={boxSize}
            margin={margin}
          />
        </Canvas>
      </div>
    </div>
  );
});
