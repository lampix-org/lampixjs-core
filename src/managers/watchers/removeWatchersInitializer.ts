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
  function confirmationPromise(rw: RegisteredWatcher) {
    return new Promise((resolve) => {
      wm.pendingRemoval[rw._id] = resolve;
    }).then(() => {
      delete wm.pendingRemoval[rw._id];
      delete wm.watchers[rw._id];
    });
  }

  /**
   * Removes all the provided watchers from the watch list
   *
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function removeWatchers(registeredWatchers: RegisteredWatcher[]): Promise<void> {
    const promises = registeredWatchers.map(confirmationPromise);
    api.remove_watchers(idsAsJSON(registeredWatchers));

    // The .then avoids returning [undefined, undefined, ..., undefined]
    return Promise.all(promises).then(() => undefined);
  }

  return removeWatchers;
}

export {
  removeWatchersInitializer
};
