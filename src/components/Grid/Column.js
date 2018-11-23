import React from 'react';
import { Rect } from '../Canvas';

const getCoords = ({ row, col, size, margin }) => ({
  x: col * (size + margin) + margin,
  y: row * (size + margin) + margin,
});

const Column = ({ render, row = 0, col = 0, margin, size, background }) => (
  <React.Fragment>
    <Rect
      {...getCoords({ row, col, margin, size })}
      height={size}
      width={size}
      fill={background}
    />
    {render({ ...getCoords({ row, col, margin, size }), size, margin })}
  </React.Fragment>
);

export default Column;
