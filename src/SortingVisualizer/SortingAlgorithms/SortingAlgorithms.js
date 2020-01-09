const bubbleSort = function*(array, callback, options) {
  let isSorted = false
  let lastUnsorted = array.length - 1
  while (!isSorted) {
    isSorted = true
    for (let i = 0; i < lastUnsorted; i++) {
      if (array[i] > array[i + 1]) {
        swap(i, i + 1, array)
        isSorted = false
        callback({ [options.key]: array }, () => {})
      }
      yield array
    }
    lastUnsorted--
  }
  //   return array
}

function swap(indexA, indexB, array) {
  let temp = array[indexA]
  array[indexA] = array[indexB]
  array[indexB] = temp
}

export default {
  bubbleSort
}
