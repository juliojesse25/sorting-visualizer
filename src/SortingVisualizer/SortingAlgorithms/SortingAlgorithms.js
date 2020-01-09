const bubbleSort = function(unsortedArray, phases) {
  let isSorted = false;
  let lastUnsorted = unsortedArray.length - 1;
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < lastUnsorted; i++) {
      if (unsortedArray[i] > unsortedArray[i + 1]) {
        swap(i, i + 1, unsortedArray);
        isSorted = false;
      }
      phases.push([...unsortedArray]);
    }
    lastUnsorted--;
  }
};
function swap(indexA, indexB, array) {
  let temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
}

export default {
  bubbleSort,
};
