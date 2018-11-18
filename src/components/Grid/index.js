import React from 'react';
import { Layer } from 'react-konva';

import Row from './Row';
import Column from './Column';

export const Grid = ({ children }) => <Layer>{children}</Layer>;

Grid.Row = Row;
Grid.Column = Column;

export default ({ grid, size, margin }) => (
  <Grid>
    {grid.map((columns, row) => (
      <Row key={row}>
        {columns.map((Content, col) => (
          <Column key={col} row={row} col={col} size={size} margin={margin} render={Content} />
        ))}
      </Row>
    ))}
  </Grid>
);
