import { createContext } from 'react';

import Maybe from '../../utils/Maybe';

export default createContext({
  ctx: Maybe.Nothing(),
  width: 0,
  height: 0,
});

export const getSafeCanvasCtx = $canvas => $canvas
  ? Maybe.Just($canvas.getContext('2d'))
  : Maybe.Nothing();
