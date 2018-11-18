
const random = {
  int: (min, max) => Math.floor(Math.random() * (max - min) + min),
  item: arr => arr[random.int(0, arr.length)],
};

export default random;
