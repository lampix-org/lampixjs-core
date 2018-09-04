import {
  RegisteredWatcher,
  Manager,
  LampixInternal
} from '../../types';

import { registerClassifierWatchers } from './registerClassifierWatchers';
import { registerSegmenterWatchers } from './registerSegmenterWatchers';
import { isClassifier } from '../../utils/isClassifier';
import { isSegmenter } from '../../utils/isSegmenter';

/**
 * Allows watcher manager to inject device API
 *
 * @param api - Device API
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
    const classifiers = watchers.filter(isClassifier);
    const segmenters = watchers.filter(isSegmenter);

    if (classifiers.length > 0) {
      state.classifiers = [...state.classifiers, ...classifiers];
      registerClassifierWatchers(api, state);
    }

    if (segmenters.length > 0) {
      state.segmenters = [...state.segmenters, ...segmenters];
      registerSegmenterWatchers(api, state);
    }
  }

  return addWatchers;
}

export {
  addWatchersInitializer
};
