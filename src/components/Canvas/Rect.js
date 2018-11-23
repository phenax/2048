import { useContext } from 'react';

import CanvasContext from './CanvasContext';
import { draw, drawRect, setFill } from '../../utils/canvas';

// renderRect :: RectProps -> Maybe CanvasRenderingContext2D -> Maybe CanvasRenderingContext2D
const renderRect = ({ width, height, x, y, fill }) => draw(
  setFill(fill),
  drawRect(x, y, width, height),
);

export default props => {
  const { ctx } = useContext(CanvasContext);
  renderRect(props)(ctx);
  return null;
};
