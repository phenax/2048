import { useEffect } from 'react';
import { cond, equals, T } from 'ramda';

import Direction from '../utils/Direction';

// keyDirection :: String -> Direction
const keyDirection = cond([
  [ equals(37),  () => Direction.Left()    ],
  [ equals(39),  () => Direction.Right()   ],
  [ equals(38),  () => Direction.Up()      ],
  [ equals(40),  () => Direction.Down()    ],
  [ T,           () => Direction.Default() ],
]);

// (hook) useKeyboardArrows :: (() -> ()) -> ()
const useKeyboardArrows = handler => {
  useEffect(() => {
    const onKey = e => {
      const direction = keyDirection(e.keyCode);

      Direction.match(direction, {
        Default: () => {},
        _: () => handler({ direction }),
      });
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, []);
  return null;
};

export default useKeyboardArrows;
