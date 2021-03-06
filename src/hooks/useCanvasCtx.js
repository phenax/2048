import { useRef, useState, useEffect } from 'react';

import { getSafeCanvasCtx } from '../utils/canvas';

export default (initialCtx = null) => {
  const [ ctx, setCanvasCtx ] = useState(getSafeCanvasCtx(initialCtx));
  const canvasRef = useRef();

  useEffect(() => {
    setCanvasCtx(getSafeCanvasCtx(canvasRef.current));
  }, [canvasRef]);

  return [ canvasRef, ctx ];
};
