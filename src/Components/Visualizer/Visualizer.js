import React, { Component } from 'react';
import './Visualizer.scss';
import _ from 'lodash';
import { sorts } from '../../Logic/algorithms';
import { generateRandomArray, nameToString } from '../../Logic/helpers';
import {
  CustomSlider,
  GenerateCustomSlider,
} from '../CustomSlider/CustomSlider';
import { DEFAULTS } from './Visualizer.constants';

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
    const { array } = this.state;
    const sort = sorts[sortType];
    const phases = sort(array);

    this.setState({ phases, cancelExecution: false }, this.stepThroughPhases);
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
                height: `${value * DEFAULTS.HEIGHT_MULTIPLIER}px`,
                width: `${DEFAULTS.WIDTH}px`,
              }}
            ></div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Visualizer;
