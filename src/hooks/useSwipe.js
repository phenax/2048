import { useGesture } from 'react-with-gesture';
import { cond, T } from 'ramda';

import Direction from '../utils/Direction';

// type GestureData = { xVelocity :: Number, yVelocity :: Number, threshold :: Number };

const THRESHOLD = 0;

// swipeDirection :: GestureData -> Direction
const swipeDirection = cond([
  [ ({ xVelocity, down }) => !down && -xVelocity > THRESHOLD,   () => Direction.Left()    ],
  [ ({ xVelocity, down }) => !down && xVelocity > THRESHOLD,    () => Direction.Right()   ],
  [ ({ yVelocity, down }) => !down && -yVelocity > THRESHOLD,   () => Direction.Up()      ],
  [ ({ yVelocity, down }) => !down && yVelocity > THRESHOLD,    () => Direction.Down()    ],
  [ T,                                                          () => Direction.Default() ],
]);

// (hook) useSwipe :: (() -> ()) -> [ Object (Event -> ()) ]
const useSwipe = onSwipe => {
  const [ handlers ] = useGesture({
    transient: true,
    onAction: data => onSwipe({ direction: swipeDirection({ ...data, threshold: 0 }) }),
  });

  return handlers;
};

export default useSwipe;
