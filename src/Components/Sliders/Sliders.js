import CustomSlider from '../CustomSlider/CustomSlider';
import React, { Component } from 'react';

class Sliders extends React {
  render() {
    const { delay } = this.props;
    return (
      <div>
        <CustomSlider
          value={delay}
          handleAfterChange={this.onHandleAfterChange}
        />
      </div>
    );
  }
}

export default Sliders;
