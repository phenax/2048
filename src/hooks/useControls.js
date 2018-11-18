import useSwipe from './useSwipe';
import useKeyboardArrows from './useKeyboardArrows';

// TODO: Fix persistent event issue where keyboard rerender with Default cases previous swipe event to take control instead of Default

// (hook) useControls :: GestureData -> [ Object (Event -> ()), { direction :: Direction } ]
const useControls = (options = {}) => {
  const [ arrow ] = useKeyboardArrows();
  const [ handlers, swipeDirection ] = useSwipe(options);

  if (!arrow.is('Default'))
    return [ handlers, { direction: arrow } ];
  return [ handlers, { direction: swipeDirection } ];
};

export default useControls;
