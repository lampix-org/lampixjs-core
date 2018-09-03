import {
  RegisteredWatcher,
  Manager,
  LampixInternal
} from '../../types';

import { WatcherTypes } from '../../constants';

const watcherSource = (w: RegisteredWatcher) => w.source;
const lampixReadableArray = (watchers: RegisteredWatcher[]) => JSON.stringify(watchers.map(watcherSource));

/**
 * Sends classifier watchers to Lampix device
 *
 * @remarks
 * Lampix device works with arrays of {@link Watcher}
 *
 * @internal
 */
function registerClassifierWatchers(
  api: LampixInternal,
  state: Manager.Watchers,
  rectangles: RegisteredWatcher[]
) {
  if (rectangles.length === 0) return;

  state.classifiers = [
    ...state.classifiers,
    ...rectangles
  ];

  api.registerSimpleClassifier(lampixReadableArray(state.classifiers));
}

/**
 * Sends segmenter watchers to Lampix device
 *
 * @remarks
 * Lampix device works with arrays of {@link Watcher}
 *
 * @internal
 */
function registerSegmenterWatchers(
  api: LampixInternal,
  state: Manager.Watchers,
  rectangles: RegisteredWatcher[]
) {
  if (rectangles.length === 0) return;

  state.segmenters = [
    ...state.segmenters,
    ...rectangles
  ];

  api.registerPositionClassifier(lampixReadableArray(state.segmenters));
}

/**
 * Allows watcher manager to inject device API
 *
 * @param api - Device API, dependency
 * @param state - Currently registered watchers per category
 * @internal
 */
function addWatchersInitializer(api: LampixInternal, state: Manager.Watchers) {
  /**
   * Splits watchers into their respective categories
   * Calls each category registration handler with
   * its respective data
   *
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function addWatchers(watchers: RegisteredWatcher[]) {
    const reducer = (acc, watcher) => {
      switch (watcher.source.type) {
        case WatcherTypes.Classifier:
          acc.classifiers.push(watcher);
          return acc;
        case WatcherTypes.Segmenter:
          acc.segmenters.push(watcher);
          return acc;
        default:
          return acc;
      }
    };

    const splitWatchers = watchers.reduce(reducer, {
      classifiers: [],
      segmenters: []
    });

    registerClassifierWatchers(api, state, splitWatchers.classifiers);
    registerSegmenterWatchers(api, state, splitWatchers.segmenters);
  }

  return addWatchers;
}

export {
  addWatchersInitializer
};
