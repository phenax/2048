import React from 'react';
import { Stage, Text, Rect, Group } from 'react-konva';
import { range } from 'ramda';

import RootAction from './actions';

import useReducer from './hooks/useReducer';
import useControls from './hooks/useControls';
import random from './utils/random';
import blockUtils from './utils/block-utils';
import Direction from './utils/Direction';

import rootReducer from './reducers/rootReducer';

import Grid from './components/Grid';

import './App.css';

const GRID_COUNT = 4;

const randomBlock = () =>
  blockUtils.Block(random.item([ 0, 0, 0, 1, 2, 4 ]));

const generateGrid = gridCount => range(0, gridCount).map(() =>
  range(0, gridCount)
    .map(randomBlock)
);

const initialState = {
  grid: generateGrid(GRID_COUNT),
};

const NumberBlock = ({ block, size, x, y }) => {
  return (
    <Group>
      <Rect
        x={x}
        y={y}
        width={size}
        height={size}
        fill={blockUtils.getColor(block.number)}
      />
      <Text
        x={x}
        y={y}
        width={size}
        height={size}
        text={block.number}
        fontSize={16}
        fontStyle="bold"
        fontFamily="Arial"
        align="center"
        verticalAlign="middle"
      />
      </Group>
  );
};

export default () => {
  const [ state, dispatch ] = useReducer(rootReducer, initialState);

  const boxSize = 100;
  const margin = 10;
  const canvasSize = (boxSize + margin) * GRID_COUNT + margin;

  const handlers = useControls(({ direction }) => {
    Direction.match(direction, {
      Default: () => {},
      Left: () => dispatch(RootAction.MoveLeft(randomBlock)),
      Right: () => dispatch(RootAction.MoveRight(randomBlock)),
      Up: () => dispatch(RootAction.MoveUp(randomBlock)),
      Down: () => dispatch(RootAction.MoveDown(randomBlock)),
    });
  });

  const grid = state.grid.map(row =>
    row.map(block => props =>
      <NumberBlock {...props} block={block} />));

  return (
    <div className="App">
      <header className="App-header">2048</header>
      <div>
        <Stage width={canvasSize} height={canvasSize} {...handlers}>
          <Grid grid={grid} size={boxSize} margin={margin} background={'#eee'} />
        </Stage>
      </div>
    </div>
  );
};
