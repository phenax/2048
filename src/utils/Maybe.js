import Enum from 'enum-fp';
import { curry } from 'ramda';

// :: Maybe
const Maybe = Enum({
  Just: ['value'],
  Nothing: [],
});

// fmap :: (a -> b) -> Maybe a -> Maybe b
export const fmap = curry((fn, m) => Maybe.match(m, {
  Just: x => Maybe.Just(fn(x)),
  Nothing: () => m,
}));

// fold :: (a -> b) -> b -> Maybe a -> b
export const fold = curry((fn, defaultValue, m) => Maybe.match(m, {
  Just: x => fn(x),
  Nothing: () => defaultValue,
}))

export default Maybe;
