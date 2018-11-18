import { useGesture } from 'react-with-gesture';
import { cond, T } from 'ramda';

import Direction from '../utils/Direction';

// type GestureData = { xVelocity :: Number, yVelocity :: Number, threshold :: Number };

// swipeDirection :: GestureData -> Direction
const swipeDirection = cond([
  [ ({ xVelocity, threshold }) => -xVelocity > threshold,   () => Direction.Left()    ],
  [ ({ xVelocity, threshold }) => xVelocity > threshold,    () => Direction.Right()   ],
  [ ({ yVelocity, threshold }) => -yVelocity > threshold,   () => Direction.Up()      ],
  [ ({ yVelocity, threshold }) => yVelocity > threshold,    () => Direction.Down()    ],
  [ T,                                                      () => Direction.Default() ],
]);

// (hook) useSwipe :: (() -> ()) -> [ Object (Event -> ()) ]
const useSwipe = handler => {
  const [ handlers ] = useGesture({
    transient: true,
    onAction: data => {
      console.log('>. data', data);
      const direction = data.down
        ? Direction.Default()
        : swipeDirection({ ...data, threshold: 0 });
      handler({ direction });
    },
  });

  return handlers;
};

export default useSwipe;
