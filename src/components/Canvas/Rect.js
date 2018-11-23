import { useContext } from 'react';

import CanvasContext from './CanvasContext';
import { fmap } from '../../utils/Maybe';

const drawRect = ({ width, height, x, y, fill, stroke }) => ctx => {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.rect(x, y, width, height);
  if(stroke) ctx.stroke();
  if(fill) ctx.fill();
  ctx.closePath();
  ctx.restore();
  return ctx;
};

export default props => {
  const { ctx } = useContext(CanvasContext);
  fmap(drawRect(props), ctx);
  return null;
};
