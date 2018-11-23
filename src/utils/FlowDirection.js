import Enum from 'enum-fp';

// :: FlowDirection
const FlowDirection = Enum({ Forward: [], Reverse: [] });

// FlowDirection.concatArray : ([a], [a]) -> [a]
FlowDirection.concatArray = (arr1, arr2) => FlowDirection.cata({
  Forward: () => arr1.concat(arr2),
  Reverse: () => arr2.concat(arr1),
});

export default FlowDirection;
