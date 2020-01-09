import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import { Handle } from 'rc-slider';
import Slider from 'rc-slider';
import './CustomSlider.scss';

class CustomSlider extends Component {
  handleDrag = props => {
    const { value, dragging, index, ...restProps } = props;
    // this.setState({ delay: value });
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

  render() {
    const { value, handleAfterChange } = this.props;
    return (
      <div className="custom-slider">
        <p>Select sorting delay in milliseconds</p>
        <Slider
          min={20}
          max={2000}
          defaultValue={value}
          handle={this.handleDrag}
          onAfterChange={handleAfterChange}
        />
      </div>
    );
  }
}

export default CustomSlider;
