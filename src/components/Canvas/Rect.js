import React, { useContext } from 'react';

import CanvasContext from './CanvasContext';
import { draw, drawRect, setFill, drawShadow } from '../../utils/canvas';

// renderRect :: RectProps -> Maybe CanvasRenderingContext2D -> Maybe CanvasRenderingContext2D
const renderRect = ({ width, height, x, y, fill }) => draw(
  setFill(fill),
  drawShadow({ size: 3, color: 'rgba(0,0,0,0.05)', offsetX: 1, offsetY: 1 }),
  drawRect(x, y, width, height),
);

const Rect = React.memo(props => {
  const { ctx } = useContext(CanvasContext);
  renderRect(props)(ctx);
  return null;
});

export default Rect;
