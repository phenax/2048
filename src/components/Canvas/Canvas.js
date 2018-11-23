import React, { memo } from 'react';

import CanvasContext from './CanvasContext';
import useCanvasCtx from '../../hooks/useCanvasCtx';

const Canvas = memo(({ width, height, children, ...props }) => {
  const [ canvasRef, ctx ] = useCanvasCtx();

  const ctxData = { ctx, width, height };

  return (
    <canvas width={width} height={height} {...props} ref={canvasRef}>
      <CanvasContext.Provider value={ctxData}>
          {children}
      </CanvasContext.Provider>
    </canvas>
  );
});

export default Canvas;
