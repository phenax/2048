import React from 'react';

import CanvasContext, { CanvasData } from './CanvasContext';
import useCanvasCtx from '../../hooks/useCanvasCtx';
import { clearCanvas } from '../../utils/canvas';
import { fmap } from '../../utils//Maybe';

const Canvas = React.memo(({ width, height, children, ...props }) => {
  const [ canvasRef, ctx ] = useCanvasCtx();

  fmap(clearCanvas, ctx);

  return (
    <canvas width={width} height={height} {...props} ref={canvasRef}>
      <CanvasContext.Provider value={CanvasData(ctx, width, height)}>
        {children}
      </CanvasContext.Provider>
    </canvas>
  );
});

export default Canvas;
