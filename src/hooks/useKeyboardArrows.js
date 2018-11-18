import { useEffect, useState } from 'react';
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

// (hook) useKeyboardArrows :: () -> [ Direction, Direction -> () ]
const useKeyboardArrows = () => {
  const [ direction, setDirection ] = useState(Direction.Default());

  useEffect(() => {
    const handler = e => {
      const newDirection = keyDirection(e.keyCode);

      Direction.match(newDirection, {
        Default: () => {},
        _: () => setDirection(newDirection),
      });
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);

  return [ direction, setDirection ];
};

export default useKeyboardArrows;
