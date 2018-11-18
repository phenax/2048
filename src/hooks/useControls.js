import useSwipe from './useSwipe';
import useKeyboardArrows from './useKeyboardArrows';

// (hook) useControls :: GestureData -> [ Object (Event -> ()), { direction :: Direction } ]
const useControls = (options = {}) => {
  const [ arrow ] = useKeyboardArrows();
  const [ handlers, swipeDirection ] = useSwipe(options);

  if (!swipeDirection.is('Default'))
    return [ handlers, { direction: swipeDirection } ];
  return [ handlers, { direction: arrow } ];
};

export default useControls;
