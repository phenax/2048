import React from 'react';
import { Rect, Text } from './Canvas';
import { getColor } from '../utils/block-utils';

const NumberBlock = ({ block, size, x, y }) => {
  const bounds = { x, y, width: size, height: size };
  return (
    <React.Fragment>
      <Rect {...bounds} fill={getColor(block.number)} />
      {block.number !== 0 && <Text
        {...bounds}
        text={block.number}
        color="#333"
        fontSize={25}
        fontFamily="Arial"
      />}
    </React.Fragment>
  );
};

export default NumberBlock;
