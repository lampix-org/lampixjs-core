// Types
import {
  lampixInfoCallback,
  movementCallback,
  simpleClassifierCallback,
  positionClassifierCallback,
  prePositionClassifierCallback,
  drawingDetectorCallback,
  getAppsCallback,
  Rect,
  ClassifierRect,
  CoordinatesToTransform
} from '../types';

// Core
import callbacks from './callbacks';
import cache from './cache';
import bindEvents from './bind-events';

// Utils
import noop from '../utils/noop';
import displayLoader from '../utils/dom/display-loader';
import generateExitBtn from '../utils/dom/generate-exit-btn';

bindEvents();

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
   * Helper function to clear movement event handler
   */
  unregisterMovementHandler: () => {
    callbacks.movementCallback = noop;
    internal.registerMovement('[]');
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
   * Helper function to clear simple classifier event handler
   */
  unregisterSimpleClassifier: () => {
    callbacks.simpleClassifierCallback = noop;
    internal.registerSimpleClassifier('[]');
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
    classRectArray.forEach((rect: ClassifierRect) => {
      // Position classifier can't be finger
      if (rect.classifier === 'finger') {
        throw new Error('registerPositionClassifier: finger classifier is not supported');
      }
    });

    callbacks.positionClassifierCallback = cb || noop;
    callbacks.prePositionClassifierCallback = preCb || noop;

    if (!cb) {
      classRectArray = [];
    }

    internal.registerPositionClassifier(JSON.stringify(classRectArray));
  },
  /**
   * Helper function to clear position classifier event handler
   */
  unregisterPositionClassifier: () => {
    callbacks.positionClassifierCallback = noop;
    callbacks.prePositionClassifierCallback = noop;
    internal.registerPositionClassifier('[]');
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
  },
  getApps: (cb: getAppsCallback) => {
    callbacks.getAppsCallback = cb;

    if (cache.apps && callbacks.getAppsCallback) {
      callbacks.getAppsCallback(cache.apps);
    } else {
      internal.getApps();
    }
  },
  switchToApp: function(appName: string) {
    this.unregisterMovementHandler();
    this.unregisterPositionClassifier();
    this.unregisterSimpleClassifier();

    // TODO: This should be properly implemented on the backend
    // With loading info and everything
    displayLoader();
    setTimeout(() => internal.switchToApp(appName), 2000);
  },
  exit: function() {
    this.switchToApp('App Switcher');
  },
  transformCoordinates: function(toTransform: CoordinatesToTransform) {
    internal.transformCoordinates(JSON.stringify(toTransform));
  },
  // TODO: Move dom utils to @lampix/dom
  dom: {
    displayLoader,
    generateExitBtn
  }
};

export { lampix };
