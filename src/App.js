import React from 'react';
import { Stage, Text } from 'react-konva';
import { range } from 'ramda';

import RootAction from './actions';

import useReducer from './hooks/useReducer';
import rootReducer from './reducers/rootReducer';

import Grid from './components/Grid';

import './App.css';

export default () => {
  const [ state, dispatch ] = useReducer(rootReducer, { update: 0 });

  const gridCount = 4;
  const boxSize = 100;
  const margin = 10;
  const canvasSize = (boxSize + margin) * gridCount + margin;

  const grid = range(0, gridCount).map(row =>
    range(0, gridCount).map(col => ({ x, y, size }) => (
      <Text
        text={`${row},${col}`}
        fontSize={16}
        fontStyle="bold"
        fontFamily="Arial"
        x={x}
        y={y}
        align="center"
        verticalAlign="middle"
        width={size}
        height={size}
      />
    ))
  )

  return (
    <div className="App">
      <header className="App-header">
        2048 ({state.update})
        <button onClick={() => dispatch(RootAction.SwipeLeft())}>Click</button>
      </header>
      <div>
        <Stage width={canvasSize} height={canvasSize}>
          <Grid grid={grid} size={boxSize} margin={margin} />
        </Stage>
      </div>
    </div>
  );
};
