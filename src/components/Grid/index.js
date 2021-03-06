import React from 'react';

import Row from './Row';
import Column from './Column';

const Grid = ({ grid, ...props }) => (
  <React.Fragment>
    {grid.map((columns, row) => (
      <Row key={row}>
        {columns.map((Content, col) => (
          <Column key={col} row={row} col={col} render={Content} {...props} />
        ))}
      </Row>
    ))}
  </React.Fragment>
);

export default Grid;
