import React, { useContext } from 'react';

import CanvasContext from './CanvasContext';
import { draw, setFont, drawText } from '../../utils/canvas';

// renderText :: TextProps -> Maybe CanvasRenderingContext2D -> Maybe CanvasRenderingContext2D
const renderText = ({
  text,
  width, height,
  x, y,
  color, fontFamily, fontSize,
  textAlign = "center", verticalAlign = "middle",
}) => draw(
  setFont({ color, fontFamily, fontSize, textAlign, verticalAlign }),
  drawText(text, x, y, width, height),
);

const Text = React.memo(props => {
  const { ctx } = useContext(CanvasContext);
  renderText(props)(ctx);
  return null;
});

export default Text;
