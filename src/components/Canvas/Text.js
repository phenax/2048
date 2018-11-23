import { useContext } from 'react';

import CanvasContext from './CanvasContext';
// import { fmap } from '../../utils/Maybe';

import { draw, setFont, drawText } from '../../utils/canvas';

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

export default props => {
  const { ctx } = useContext(CanvasContext);
  renderText(props)(ctx);
  return null;
};
