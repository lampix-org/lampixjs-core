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
function removeWatchersInitializer(api: LampixInternal, state: Manager.Watchers) {
  /**
   * Removes all the provided watchers from the watch list
   *
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function removeWatchers(...watchers: RegisteredWatcher[]) {
    const classifiers = watchers.filter(isClassifier);
    const segmenters = watchers.filter(isSegmenter);

    state.classifiers = state.classifiers.filter((w) => !classifiers.includes(w));
    state.segmenters = state.segmenters.filter((w) => !segmenters.includes(w));

    registerClassifierWatchers(api, state);
    registerSegmenterWatchers(api, state);
  }

  return removeWatchers;
}

export {
  removeWatchersInitializer
};
