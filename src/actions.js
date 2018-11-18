import Enum from 'enum-fp';
// import T from 'enum-fp/types';

const RootAction = Enum([ 'MoveLeft', 'MoveRight', 'MoveUp', 'MoveDown' ]);

export default RootAction;
