// Types
import {
  lampixInfoCallback,
  movementCallback,
  simpleClassifierCallback,
  positionClassifierCallback,
  prePositionClassifierCallback,
  drawingDetectorCallback,
  getAppsCallback,
  transformCoordinatesCallback,
  Rect,
  CoordinatesToTransform,
  ClassifiedObject,
  Opts
} from '../types';

// Core
import callbacks from './callbacks';
import cache from './cache';
import bindEvents from './bind-events';
import { DEPTH_CLASSIFIER, depthMask } from './depth-mask';

// Utils
import noop from '../utils/noop';
import displayLoader from '../utils/dom/display-loader';
import generateExitBtn from '../utils/dom/generate-exit-btn';
import roundRectValues from '../utils/roundRectValues';

bindEvents();

const internal = window._lampix_internal;

// reference to position classifier areas
let posClassRectArray: Rect[] = [];

const positionCallbackWrapper = (cb: positionClassifierCallback) => {
  return (rectIndex: number, classifiedObjects: ClassifiedObject[], metadata: string) => {
    const areas = lampix.getPositionClassifierRectArray();
    // special handling for the depth classifier area
    // area for depth classifier is always appended at the end of the array
    if (lampix.isDepthMaskActivated && rectIndex === areas.length - 1) {
      // object detected by the depth classifier
      depthMask.positionClassifierCallback(rectIndex, classifiedObjects, metadata);
      return;
    }
    cb(rectIndex, classifiedObjects, metadata);
  };
};

const lampix = {
  isDepthMaskActivated: false,
  activateDepthClassifier: function(opts: Opts<string>) {
    this.isDepthMaskActivated = true;
    // add canvas element
    depthMask.create(opts);
    // append depth mask area, if activated
    let computedRectArray = lampix.getPositionClassifierRectArray();
    computedRectArray = roundRectValues(computedRectArray);
    // register the depth classifier
    internal.registerPositionClassifier(JSON.stringify(computedRectArray));
  },
  deactivateDepthClassifier: function() {
    this.isDepthMaskActivated = false;
    depthMask.remove();
  },
  /** Appends the depth classifier area to the list of position classifier areas */
  getPositionClassifierRectArray: function() {
    if (this.isDepthMaskActivated === true) {
      return [...posClassRectArray, depthMask.getRectArea()];
    }
    return posClassRectArray;
  },
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

    rectArray = roundRectValues(rectArray);
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
  registerSimpleClassifier: (classRectArray: Rect[], cb: simpleClassifierCallback) => {
    callbacks.simpleClassifierCallback = cb || noop;

    if (!cb) {
      classRectArray = [];
    }

    classRectArray = roundRectValues(classRectArray);
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
    classRectArray: Rect[],
    cb: positionClassifierCallback,
    preCb: prePositionClassifierCallback
  ) => {
    classRectArray.forEach((rect: Rect) => {
      // Position classifier can't be finger or depth
      if (rect.classifier === 'finger') {
        throw new Error('registerPositionClassifier: finger classifier is not supported');
      }
      if (rect.classifier === DEPTH_CLASSIFIER) {
        throw new Error('registerPositionClassifier: depth classifier is not supported');
      }
    });

    callbacks.positionClassifierCallback = positionCallbackWrapper(cb || noop);
    // TODO: same handling for prePositionClassifierCallback
    callbacks.prePositionClassifierCallback = preCb || noop;

    if (!cb) {
      classRectArray = [];
    }

    // keep a reference to the position classifier areas
    posClassRectArray = classRectArray;
    // append depth mask area, if activated
    let computedRectArray = lampix.getPositionClassifierRectArray();
    computedRectArray = roundRectValues(computedRectArray);
    internal.registerPositionClassifier(JSON.stringify(computedRectArray));
  },
  /**
   * Helper function to clear position classifier event handler
   */
  unregisterPositionClassifier: () => {
    callbacks.positionClassifierCallback = noop;
    callbacks.prePositionClassifierCallback = noop;
    internal.registerPositionClassifier('[]');
    posClassRectArray = [];
  },
  /**
   * Register handler for drawing inside specified rectangles.
   */
  registerDrawingDetector: (classRectArray: Rect[], cb: drawingDetectorCallback) => {
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
  transformCoordinates: function(toTransform: CoordinatesToTransform[], callback: transformCoordinatesCallback) {
    callbacks.transformCoordinatesCallback = callback || noop;
    internal.transformCoordinates(JSON.stringify(toTransform));
  },
  // TODO: Move dom utils to @lampix/dom
  dom: {
    displayLoader,
    generateExitBtn
  }
};

export { lampix };
