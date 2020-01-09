import _ from 'lodash';

export const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const arraysAreEqual = (arrayOne, arrayTwo) => {
  return _.isEqual(arrayOne, arrayTwo);
};
