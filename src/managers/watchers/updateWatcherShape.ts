import {
  Watcher,
  RegisteredWatcher,
  Managers,
  LampixInternal
} from '../../types';

import { registerClassifierWatchers } from './registerClassifierWatchers';
import { registerSegmenterWatchers } from './registerSegmenterWatchers';

/**
 * Allows watcher manager to inject device API
 *
 * @param api - Device API
 * @param state - Currently registered watchers per category
 * @internal
 */
function updateWatcherPositionInitializer(api: LampixInternal, state: Managers.Watchers.Collection) {
  /**
   * Removes all the provided watchers from the watch list
   *
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function updateWatcherPosition(rw: RegisteredWatcher, w: Partial<Watcher.Watcher>) {
    registerClassifierWatchers(api, state);
    registerSegmenterWatchers(api, state);
  }

  return updateWatcherPosition;
}

export {
  updateWatcherPositionInitializer
};
