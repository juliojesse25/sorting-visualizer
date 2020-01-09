import React, { Component } from "react"
import "./SortingVisualizer.scss"
import sortingAlgorithms from "./SortingAlgorithms/SortingAlgorithms"

class SortingVisualizer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      array: [50, 40, 30, 20, 10],
      index: 0,
      phases: []
    }
  }

  componentDidMount() {
    this.resetArray()
  }

  resetArray() {
    // const array = []
    // for (let i = 0; i < 6; i++) {
    //   array.push(randomIntFromInterval(5, 100))
    // }
    // this.setState({ array })
  }

  mergeSort() {
    // Implement merge sort here
  }

  quickSort() {
    // Implement quick sort here
  }

  bubbleSort() {
    // Implement bubble sort here
    const { index } = this.state

    const bubbleSort = function*(array) {
      let isSorted = false
      let lastUnsorted = array.length - 1
      while (!isSorted) {
        isSorted = true
        for (let i = 0; i < lastUnsorted; i++) {
          if (array[i] > array[i + 1]) {
            swap(i, i + 1, array)
            isSorted = false
          }
          yield [array, index + 1]
        }
        lastUnsorted--
      }
    }

    // const phases = []
    // while (array) {
    //   const iterator = bubbleSort(this.state.array)
    //   const array = iterator.next().value
    //   phases.push(array)
    // }
    // this.setState({ phases, index: newIndex })
  }

  heapSort() {
    // Implement heap sort here
  }

  render() {
    const { array } = this.state
    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value * 3}px`, width: "20px" }}
          ></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
      </div>
    )
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false
  }
  return true
}

function swap(indexA, indexB, array) {
  let temp = array[indexA]
  array[indexA] = array[indexB]
  array[indexB] = temp
}

export default SortingVisualizer
