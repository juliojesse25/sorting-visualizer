import React, { Component } from 'react';
import './Visualizer.scss';
import sorts from '../../Logic/algorithms';
import { randomIntFromInterval } from '../../Logic/helpers';
import CustomSlider from '../CustomSlider/CustomSlider';
import { VISUALIZER_CONSTANTS } from './Visualizer.constants';

class Visualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      phases: [],
      delay: 200,
      cancelExecution: false,
      timeoutID: null,
      bars: 50,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const { bars } = this.state;
    const array = [];
    for (let i = 0; i < bars; i++) {
      array.push(
        randomIntFromInterval(
          VISUALIZER_CONSTANTS.ARRAY_BAR_VALUE_MIN,
          VISUALIZER_CONSTANTS.ARRAY_BAR_VALUE_MAX,
        ),
      );
    }

    clearTimeout(this.state.timeoutID);
    this.setState({ array, cancelExecution: true });
  }

  mergeSort() {
    const { array } = this.state;

    const phases = sorts.mergeSort(array);

    this.setState({ phases, cancelExecution: false }, this.stepThroughPhases);
  }

  quickSort() {
    const { array } = this.state;

    const phases = sorts.quickSort(array);

    this.setState({ phases, cancelExecution: false }, this.stepThroughPhases);
  }

  bubbleSort() {
    const { array } = this.state;

    const phases = sorts.bubbleSort(array);

    this.setState({ phases, cancelExecution: false }, this.stepThroughPhases);
  }

  heapSort() {
    const { array } = this.state;

    const phases = sorts.heapSort(array);

    this.setState({ phases, cancelExecution: false }, this.stepThroughPhases);
  }

  stepThroughPhases() {
    const { phases, delay } = this.state;
    const newArray = phases.shift();

    this.setState({ array: newArray, phases }, () => {
      if (this.state.phases.length && !this.state.cancelExecution) {
        const timeoutID = setTimeout(() => {
          this.stepThroughPhases();
        }, delay);
        this.setState({ timeoutID });
      }
    });
  }

  onHandleAfterChange = value => {
    this.setState({ delay: value });
  };

  onHaltExecution = () => {
    clearTimeout(this.state.timeoutID);
    this.setState({ cancelExecution: true, phases: [] });
  };

  render() {
    const { array, delay } = this.state;

    return (
      <React.Fragment>
        <div className="sort-options">
          <CustomSlider
            value={delay}
            handleAfterChange={this.onHandleAfterChange}
          />
          <button
            type="button"
            className="btn btn-success sort-button"
            onClick={() => this.resetArray()}
          >
            Generate New Array
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.mergeSort()}
          >
            Merge Sort
          </button>
          <button
            type="button"
            className="btn btn-success sort-button"
            onClick={() => this.quickSort()}
          >
            Quick Sort
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.bubbleSort()}
          >
            Bubble Sort
          </button>
          <button
            className="btn btn-success sort-button"
            onClick={() => this.heapSort()}
          >
            Heap Sort
          </button>
          <button
            className="btn btn-danger sort-button"
            onClick={() => this.onHaltExecution()}
          >
            Halt Execution
          </button>
        </div>
        <div className="array-container">
          {array.map((value, index) => (
            <div
              className="array-bar"
              key={index}
              style={{
                height: `${value *
                  VISUALIZER_CONSTANTS.ARRAY_BAR_HEIGHT_MULTIPLIER}px`,
                width: `${VISUALIZER_CONSTANTS.ARRAY_BAR_WIDTH}px`,
              }}
            ></div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Visualizer;
