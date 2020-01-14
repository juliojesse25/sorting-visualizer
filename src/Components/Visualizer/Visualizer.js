import React, { Component } from 'react';
import _ from 'lodash';
import './Visualizer.scss';
import { GenerateCustomSlider } from '../CustomSlider/CustomSlider';
import { sorts } from '../../Logic/algorithms';
import { DEFAULTS } from './Visualizer.constants';
import { generateRandomArray, nameToString } from '../../Logic/helpers';

const algorithms = _.keys(sorts);

class Visualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      phases: [],
      cancelExecution: false,
      timeoutID: null,
      delay: DEFAULTS.DELAY,
      size: DEFAULTS.SIZE,
      isSorting: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray = () => {
    const { size } = this.state;
    const array = generateRandomArray(
      size,
      DEFAULTS.INTERVAL_MIN,
      DEFAULTS.INTERVAL_MAX,
    );

    clearTimeout(this.state.timeoutID);
    this.setState({ array, cancelExecution: true });
  };

  handleSort = sortType => {
    const { array, isSorting } = this.state;

    if (isSorting) {
      this.onHaltExecution();
    }

    const sort = sorts[sortType];
    const phases = sort(array);

    this.setState(
      { phases, cancelExecution: false, isSorting: true },
      this.stepThroughPhases,
    );
  };

  stepThroughPhases = () => {
    const { phases, delay } = this.state;
    const newArray = phases.shift();

    this.setState({ array: newArray, phases }, () => {
      if (this.state.phases.length && !this.state.cancelExecution) {
        const timeoutID = setTimeout(this.stepThroughPhases, delay);
        this.setState({ timeoutID });
      }
    });
  };

  onHandleAfterChange = (attribute, value) => {
    this.setState({ [attribute]: value });
  };

  onHaltExecution = () => {
    clearTimeout(this.state.timeoutID);
    this.setState({ cancelExecution: true, phases: [] });
  };

  render() {
    const { array, delay, size } = this.state;

    return (
      <div className="visualizer">
        <div className="sliders">
          <GenerateCustomSlider
            attribute="delay"
            handleAfterChange={this.onHandleAfterChange}
            max={1000}
            min={5}
            text="Select sorting delay in milliseconds"
            value={delay}
          />
          <GenerateCustomSlider
            attribute="size"
            handleAfterChange={this.onHandleAfterChange}
            max={100}
            min={15}
            text="Select number of columns for next new array"
            value={size}
          />
        </div>
        <div className="sort-options">
          <button
            type="button"
            className="btn btn-warning sort-button"
            onClick={this.resetArray}
          >
            Generate New Array
          </button>
          {_.map(algorithms, (name, index) => {
            return (
              <button
                key={index}
                type="button"
                className="btn btn-success sort-button"
                onClick={() => this.handleSort(name)}
              >
                {nameToString(name)}
              </button>
            );
          })}
          <button
            className="btn btn-danger sort-button"
            onClick={this.onHaltExecution}
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
                height: `${value * DEFAULTS.HEIGHT_MULTIPLIER}px`,
                width: `${DEFAULTS.WIDTH}px`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

export default Visualizer;
