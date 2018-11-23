import { useContext } from 'react';

import CanvasContext from './CanvasContext';
import { fmap } from '../../utils/Maybe';

const drawText = ({ text, width, height, x, y, color, font, textAlign, verticalAlign }) => ctx => {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = color;
  
  ctx.font = font;
  ctx.textAlign = textAlign;
  ctx.textBaseline = verticalAlign;

  const position = { x, y };

  if(width && textAlign === 'center') {
    position.x += width / 2;
  }

  if(height && verticalAlign === 'middle') {
    position.y += height / 2;
  }

  ctx.fillText(text, position.x, position.y);
  ctx.restore();
  return ctx;
};

export default props => {
  const { ctx } = useContext(CanvasContext);
  fmap(drawText(props), ctx);
  return null;
};
