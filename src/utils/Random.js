
const Random = {
  int: (min, max) => Math.floor(Math.random() * (max - min) + min),
  item: arr => arr[Random.int(0, arr.length)],
};

export default Random;
