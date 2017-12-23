import { Callbacks } from 'types';

const noop = (): void => void 0;

const callbacks: Callbacks = {
  drawingDetectorCallback: noop,
  lampixInfoCallback: noop,
  movementCallback: noop,
  positionClassifierCallback: noop,
  prePositionClassifierCallback: noop,
  simpleClassifierCallback: noop
};

const cache: any = {};
// const lampixInternal = window._lampix_internal;

window.onMovement = (rectIndex, outlines) => {
  if (callbacks.movementCallback) {
    callbacks.movementCallback(rectIndex, outlines);
  }
};

window.onSimpleClassifier = (rectIndex, classTag) => {
  if (callbacks.simpleClassifierCallback) {
    callbacks.simpleClassifierCallback(rectIndex, classTag);
  }
};

window.onPositionClassifier = (rectIndex, classifiedObjects) => {
  if (callbacks.positionClassifierCallback) {
    callbacks.positionClassifierCallback(rectIndex, classifiedObjects);
  }
};

window.onPrePositionClassifier = (rectIndex, detectedObjects) => {
  if (callbacks.prePositionClassifierCallback) {
    callbacks.prePositionClassifierCallback(rectIndex, detectedObjects);
  }
};

window.onDrawingDetector = (rectIndex, objects) => {
  if (callbacks.drawingDetectorCallback) {
    callbacks.drawingDetectorCallback(rectIndex, objects);
  }
};

window.onLampixInfo = (lampixInfo) => {
  cache.lampixInfo = lampixInfo;

  if (callbacks.lampixInfoCallback) {
    callbacks.lampixInfoCallback(cache.lampixInfo);
  }
};
