import {
  RegisteredWatcher,
  Managers,
  LampixInternal
} from '../../types';

const idsAsJSON = (registeredWatchers: RegisteredWatcher[]) => JSON.stringify(registeredWatchers.map((rw) => rw._id));

/**
 * Allows watcher manager to inject device API
 *
 * @param api - Device API
 * @param state - Currently registered watchers per category
 * @internal
 */
function removeWatchersInitializer(api: LampixInternal, wm: Managers.Watchers.Manager) {
  /**
   * Removes all the provided watchers from the watch list
   *
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function removeWatchers(...registeredWatchers: RegisteredWatcher[]) {
    registeredWatchers.forEach((rw) => { delete wm.watchers[rw._id]; });
    api.remove_watchers(idsAsJSON(registeredWatchers));
  }

  return removeWatchers;
}

export {
  removeWatchersInitializer
};
