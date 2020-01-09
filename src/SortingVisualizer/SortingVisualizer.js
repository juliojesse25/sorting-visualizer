import React, { Component } from 'react';
import './SortingVisualizer.scss';
import sortingAlgorithms from './SortingAlgorithms/SortingAlgorithms';

class SortingVisualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      phases: [],
      timeout: 100,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 20; i++) {
      array.push(randomIntFromInterval(5, 100));
    }
    this.setState({ array });
  }

  mergeSort() {
    // Implement merge sort here
  }

  quickSort() {
    // Implement quick sort here
  }

  bubbleSort() {
    // Implement bubble sort here

    const { array } = this.state;

    const copy = [...array];
    const phases = [];

    sortingAlgorithms.bubbleSort(copy, phases);

    this.setState({ phases }, this.stepThroughPhases);
  }

  heapSort() {
    // Implement heap sort here
  }

  stepThroughPhases() {
    const { phases, timeout } = this.state;
    const newArray = phases.shift();

    this.setState({ array: newArray, phases }, () => {
      if (this.state.phases.length) {
        setTimeout(() => {
          this.stepThroughPhases();
        }, timeout);
      }
    });
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value * 3}px`, width: '20px' }}
          ></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button
          onClick={() => {
            this.mergeSort();
          }}
        >
          Merge Sort
        </button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button
          onClick={() => {
            this.bubbleSort();
          }}
        >
          Bubble Sort
        </button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}

function swap(indexA, indexB, array) {
  let temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
}

export default SortingVisualizer;
