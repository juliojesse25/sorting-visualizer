const bubbleSort = unsortedArray => {
  let isSorted = false;
  let lastUnsorted = unsortedArray.length - 1;
  const phases = [];
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
  return phases;
};

const mergeSort = unsortedArray => {
  // @todo

  return [unsortedArray];
};

const quickSort = unsortedArray => {
  // @todo

  return [unsortedArray];
};

const heapSort = unsortedArray => {
  // @todo

  return [unsortedArray];
};

const insertionSort = unsortedArray => {
  // @todo

  return [unsortedArray];
};

function swap(indexA, indexB, array) {
  let temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
}

export const sorts = {
  BUBBLE_SORT: bubbleSort,
  MERGE_SORT: mergeSort,
  QUICK_SORT: quickSort,
  HEAP_SORT: heapSort,
  INSERTION_SORT: insertionSort,
};
