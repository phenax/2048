import RootAction from '../actions';

export default RootAction.cata({
  SwipeLeft: () => state => ({ ...state, update: state.update + 1 }),
  _: () => state => state,
});
