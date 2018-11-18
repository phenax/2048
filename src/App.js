import React from 'react';
import { Stage, Text, Rect } from 'react-konva';
import { range } from 'ramda';

import RootAction from './actions';

import useReducer from './hooks/useReducer';
import Random from './utils/Random';
import Block from './utils/Block';

import rootReducer from './reducers/rootReducer';

import Grid from './components/Grid';

import './App.css';

const GRID_COUNT = 4;

const generateGrid = gridCount => range(0, gridCount).map(row =>
  range(0, gridCount).map(col => ({
    row,
    col,
    number: Random.item([ 0, 0, 0, 1, 2, 4 ]),
  }))
);

const initialState = {
  grid: generateGrid(GRID_COUNT),
};

export default () => {
  const [ state, dispatch ] = useReducer(rootReducer, initialState);

  const boxSize = 100;
  const margin = 10;
  const canvasSize = (boxSize + margin) * GRID_COUNT + margin;

  const grid = state.grid.map((row, rIndex) =>
    row.map(({ number }, cIndex) => ({ x, y, size }) => (
      <React.Fragment>
        <Rect
          x={x}
          y={y}
          width={size}
          height={size}
          fill={Block.getColor(number)}
        />
        <Text
          x={x}
          y={y}
          width={size}
          height={size}
          text={number}
          fontSize={16}
          fontStyle="bold"
          fontFamily="Arial"
          align="center"
          verticalAlign="middle"
        />
      </React.Fragment>
    ))
  );

  return (
    <div className="App">
      <header className="App-header">
        2048 ({state.update})
        <button onClick={() => dispatch(RootAction.SwipeLeft())}>Click</button>
      </header>
      <div>
        <Stage width={canvasSize} height={canvasSize}>
          <Grid grid={grid} size={boxSize} margin={margin} background={'#eee'} />
        </Stage>
      </div>
    </div>
  );
};
