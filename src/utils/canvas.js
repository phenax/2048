import Maybe, { fmap } from './Maybe';
import { curry, pipe } from 'ramda';

// getSafeCanvasCtx :: HTMLCanvasElement -> Maybe CanvasRenderingContext2D
export const getSafeCanvasCtx = $canvas => $canvas
  ? Maybe.Just($canvas.getContext('2d'))
  : Maybe.Nothing();

// startDrawing :: CanvasRenderingContext2D -> CanvasRenderingContext2D
export const startDrawing = ctx => {
  ctx.save();
  ctx.beginPath();
  return ctx;
};

// stopDrawing :: CanvasRenderingContext2D -> CanvasRenderingContext2D
export const stopDrawing = ctx => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.restore();
  return ctx;
};

// draw :: (...(CanvasRenderingContext2D -> CanvasRenderingContext2D))
//      -> Maybe CanvasRenderingContext2D -> Maybe CanvasRenderingContext2D
export const draw = (...fns) => pipe(
  fmap(startDrawing),
  ...fns.map(fn => fmap(fn)),
  fmap(stopDrawing),
);

export const setFontFamily = curry((family, ctx) => {
  const [size] = `${ctx.font}`.split(' ');
  ctx.font = `${size} ${family}`;
  return ctx;
});

export const setFontSize = curry((size, ctx) => {
  const [, family] = `${ctx.font}`.split(' ');
  ctx.font = `${size}px ${family}`;
  return ctx;
});

export const setFill = curry((fill, ctx) => {
  ctx.fillStyle = fill;
  return ctx;
});

export const setAlignment = curry((horizontal, vertical, ctx) => {
  ctx.textAlign = horizontal;
  ctx.textBaseline = vertical;
  return ctx;
});

export const setFont = curry(({ fontFamily, fontSize, color, textAlign, verticalAlign }, ctx) =>
  pipe(
    setFill(color),
    setFontSize(fontSize),
    setFontFamily(fontFamily),
    setAlignment(textAlign, verticalAlign),
  )(ctx)
);

export const drawText = curry((text, x, y, width, height, ctx) => {
  ctx.translate(width / 2, height / 2);
  ctx.fillText(text, x, y);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  return ctx;
});

export const drawRect = curry((x, y, width, height, ctx) => {
  ctx.rect(x, y, width, height);
  ctx.fill();
  return ctx;
});
