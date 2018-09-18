import {
  RegisteredWatcher,
  Managers,
  LampixInternal
} from '../../types';

import { debounceRegisterCall } from './debounceRegisterCall';

const watcherData = (w: RegisteredWatcher) => ({
  id: w._id,
  ...w.source
});

const watchersAsJSON = (watchers: RegisteredWatcher[]) => JSON.stringify(watchers.map(watcherData));

/**
 * Allows watcher manager to inject device API
 *
 * @param api - Device API
 * @param state - Currently registered watchers per category
 * @internal
 */
function addWatchersInitializer(api: LampixInternal, wm: Managers.Watchers.Manager) {
  /**
   * Splits watchers into their respective categories
   * Calls each category registration handler with
   * its respective data
   *
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function addWatchers(...registeredWatchers: RegisteredWatcher[]): void {
    registeredWatchers.forEach((rw) => { wm.watchers[rw._id] = rw; });
    api.add_watchers(watchersAsJSON(registeredWatchers));
  }

  return debounceRegisterCall(addWatchers);
}

export {
  addWatchersInitializer
};
