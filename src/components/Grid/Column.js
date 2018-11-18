import React from 'react';
import { Rect, Group } from 'react-konva';

const getCoords = ({ row, col, size, margin }) => ({
  x: col * (size + margin) + margin,
  y: row * (size + margin) + margin,
});

export default ({ render, row = 0, col = 0, margin, size, background = '#888', border }) => (
  <Group>
    <Rect
      {...getCoords({ row, col, margin, size })}
      height={size}
      width={size}
      fill={background}
      stroke={border}
    />
    {render({ ...getCoords({ row, col, margin, size }), size, margin })}
  </Group>
);
