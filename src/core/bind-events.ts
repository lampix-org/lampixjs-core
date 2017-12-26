/**
 * The events bound here are strictly called by the backend of the Lampix stack
 */


// Types
import {
  LampixInfo
} from '../types';

// Core
import callbacks from './callbacks';
import cache from './cache';

// Utils
import noop from '../utils/noop';

let bindEvents = () => {
  // Prevent multiple calls
  bindEvents = noop;

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

  window.onLampixInfo = (lampixInfo: LampixInfo) => {
    cache.lampixInfo = lampixInfo;

    if (callbacks.lampixInfoCallback) {
      callbacks.lampixInfoCallback(cache.lampixInfo);
    }
  };
};

export default bindEvents;
