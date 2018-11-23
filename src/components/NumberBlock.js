import React from 'react';
import { Rect, Text } from './Canvas';
import { getColor, isZero } from '../utils/block-utils';
import { FONT_SIZE } from '../utils/constants';

const NumberBlock = ({ block, size, x, y }) => {
  const bounds = { x, y, width: size, height: size };
  return (
    <React.Fragment>
      <Rect {...bounds} fill={getColor(block.number)} />
      {!isZero(block) && <Text
        {...bounds}
        text={block.number}
        color="#333"
        fontSize={FONT_SIZE}
        fontFamily="Arial"
      />}
    </React.Fragment>
  );
};

export default NumberBlock;
