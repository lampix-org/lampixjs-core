// Types
import {
  lampixInfoCallback,
  movementCallback,
  simpleClassifierCallback,
  positionClassifierCallback,
  prePositionClassifierCallback,
  drawingDetectorCallback,
  Rect,
  ClassifierRect,
} from '../types';

// Core
import callbacks from './callbacks';
import cache from './cache';

// Utils
import noop from '../utils/noop';

const internal = window._lampix_internal;

const lampix = {
  /** Provides Lampix info. See {@link LampixInfo}. */
  getLampixInfo: (cb: lampixInfoCallback = noop) => {
    callbacks.lampixInfoCallback = cb;

    if (cache.lampixInfo && callbacks.lampixInfoCallback) {
      callbacks.lampixInfoCallback(cache.lampixInfo);
    } else {
      internal.getLampixInfo();
    }
  },
  /** Register handler for movement events inside specified rectangles. */
  registerMovement: (rectArray: Rect[], cb: movementCallback) => {
    callbacks.movementCallback = cb || noop;

    if (!cb) {
      rectArray = [];
    }

    internal.registerMovement(JSON.stringify(rectArray));
  },
  /**
   * Register handler for simple classifier events inside specified rectangles.
   * These events are useful for simple UI elements such as buttons.
   * Simple classifiers do not provide outline or position information.
   * Faster than registerPositionClassifier.
   */
  registerSimpleClassifier: (classRectArray: ClassifierRect[], cb: simpleClassifierCallback) => {
    callbacks.simpleClassifierCallback = cb || noop;

    if (!cb) {
      classRectArray = [];
    }

    internal.registerSimpleClassifier(JSON.stringify(classRectArray));
  },
  /**
   * Register handler for position classifier events inside specified rectangles.
   * Position classifiers provide outline and position information per object.
   */
  registerPositionClassifier: (
    classRectArray: ClassifierRect[],
    cb: positionClassifierCallback,
    preCb: prePositionClassifierCallback
  ) => {
    // To be changed after clarifying its purpose
    const classifier = classRectArray[classRectArray.length - 1].classifier;

    if (classifier === 'finger') {
      throw new Error('registerPositionClassifier: finger classifier is not supported');
    }

    callbacks.positionClassifierCallback = cb || noop;
    callbacks.prePositionClassifierCallback = preCb || noop;

    if (!cb) {
      classRectArray = [];
    }

    internal.registerPositionClassifier(JSON.stringify(classRectArray));
  },
  /**
   * Register handler for drawing inside specified rectangles.
   */
  registerDrawingDetector: (classRectArray: ClassifierRect[], cb: drawingDetectorCallback) => {
    callbacks.drawingDetectorCallback = cb || noop;

    if (!cb) {
      classRectArray = [];
    }

    internal.registerDrawingDetector(JSON.stringify(classRectArray));
  },
  playFullScreenVideo: (filename: string) => {
    internal.playFullScreenVideo(filename);
  },
  /**
   * Specified rectangles will be ignored by registerMovement and registerPositionClassifier.
   * Does not apply to registerSimpleClassifier.
   */
  setIgnoredRects: (rectArray: Rect[]) => {
    internal.setIgnoredRects(JSON.stringify(rectArray));
  }
};

export default lampix;
