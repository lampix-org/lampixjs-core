// Types
import {
  LampixInfo,
  ClassifiedObject,
  AppInfo,
  CoordinatesToTransform
} from '../types';

// Core
import callbacks from './callbacks';
import cache from './cache';

// Utils
import noop from '../utils/noop';

/**
 * Creates the functions called by the Lampix backend.
 * These provides the main form of communication between a Lampix and the running app.
 */
let bindEvents = () => {
  // Prevent multiple calls
  bindEvents = noop;

  window.onMovement = (rectIndex, outlines) => {
    if (callbacks.movementCallback) {
      callbacks.movementCallback(rectIndex, outlines);
    }
  };

  window.onSimpleClassifier = (rectIndex: number, classTag: string, metadata: string) => {
    if (callbacks.simpleClassifierCallback) {
      callbacks.simpleClassifierCallback(rectIndex, classTag, metadata);
    }
  };

  window.onPositionClassifier = (rectIndex: number, classifiedObjects: ClassifiedObject[], metadata: string) => {
    if (callbacks.positionClassifierCallback) {
      callbacks.positionClassifierCallback(rectIndex, classifiedObjects, metadata);
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

  window.onGetApps = (apps: AppInfo[]) => {
    cache.apps = apps;

    if (callbacks.getAppsCallback) {
      callbacks.getAppsCallback(cache.apps);
    }
  };

  window.onTransformCoordinates = (transformedRect: CoordinatesToTransform[]) => {
    if (callbacks.transformCoordinatesCallback) {
      callbacks.transformCoordinatesCallback(transformedRect);
    }
  };
};

export default bindEvents;
