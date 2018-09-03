import {
  RegisteredWatcher,
  Manager,
  LampixInternal
} from '../../types';

import { WatcherTypes } from '../../constants';
import { registerClassifierWatchers } from './registerClassifierWatchers';
import { registerSegmenterWatchers } from './registerSegmenterWatchers';

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
    const reducer = (watcher) => {
      switch (watcher.source.type) {
        case WatcherTypes.Classifier:
          state.classifiers.push(watcher);
          break;
        case WatcherTypes.Segmenter:
          state.segmenters.push(watcher);
          break;
        default:
          break;
      }
    };

    watchers.forEach(reducer, state);

    registerClassifierWatchers(api, state);
    registerSegmenterWatchers(api, state);
  }

  return addWatchers;
}

export {
  addWatchersInitializer
};
