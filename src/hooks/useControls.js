import useSwipe from './useSwipe';
import useKeyboardArrows from './useKeyboardArrows';

// (hook) useControls :: (() -> ()) -> [ Object (Event -> ()) ]
const useControls = eventHandler => {
  useKeyboardArrows(eventHandler);
  const handlers = useSwipe(eventHandler);
  return handlers;
};

export default useControls;
