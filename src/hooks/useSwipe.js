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

// (hook) useSwipe :: GestureData -> [ Object (Event -> ()), Direction ]
const useSwipe = ({ threshold = 0 } = {}) => {
  const [ handlers, data ] = useGesture();

  !data.down && console.log('>> data', data.xVelocity, data.yVelocity, swipeDirection({ ...data, threshold }).name);

  const direction = data.down
    ? Direction.Default()
    : swipeDirection({ ...data, threshold });

  return [ handlers, direction ];
};

export default useSwipe;
