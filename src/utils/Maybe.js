import Enum from 'enum-fp';
import { curry } from 'ramda';

const Maybe = Enum({
  Just: ['value'],
  Nothing: [],
});

// fmap :: (a -> b) -> Maybe a -> Maybe b
export const fmap = curry((fn, m) => Maybe.match(m, {
  Just: x => Maybe.Just(fn(x)),
  Nothing: () => m,
}));

export default Maybe;
