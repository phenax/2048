import React, { memo, useRef, useState, useEffect } from 'react';

import CanvasContext, { getSafeCanvasCtx } from './CanvasContext';

const Canvas = memo(({ width, height, children, ...props }) => {
  const [ ctx, setCanvasCtx ] = useState(getSafeCanvasCtx(null));
  const canvasRef = useRef();

  useEffect(() => {
    setCanvasCtx(getSafeCanvasCtx(canvasRef.current));
  }, [canvasRef]);

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
