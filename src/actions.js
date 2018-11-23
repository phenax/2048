import Enum, { T } from 'enum-fp';

const Row = T.List(T.Record({ number: T.Number() }));

const RootAction = Enum({
  MoveLeft: [ Row ],
  MoveRight: [ Row ],
  MoveUp: [ Row ],
  MoveDown: [ Row ],
});

export default RootAction;
