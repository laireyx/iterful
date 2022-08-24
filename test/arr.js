function createRandomArray(size = 1024) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 65536));
  }

  return arr;
}

export { createRandomArray };
