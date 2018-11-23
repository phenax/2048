import { createContext } from 'react';

import Maybe from '../../utils/Maybe';

export const CanvasData = (ctx = Maybe.Nothing(), width = 0, height = 0) => ({ ctx, width, height });

export default createContext(CanvasData());

