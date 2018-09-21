import {
  RegisteredWatcher,
  LampixInternal,
  Watcher,
  Managers
} from '../../types';

import { createRegisteredWatcher } from './createRegisteredWatcher';

const watcherData = (w: RegisteredWatcher) => ({
  id: w._id,
  ...w.source
});

const watchersAsJSON = (rwList: RegisteredWatcher[]) => JSON.stringify(rwList.map(watcherData));

/**
 * Allows watcher manager to inject device API
 *
 * @param api - Device API
 * @param state - Currently registered watchers per category
 * @internal
 */
function addWatchersInitializer(api: LampixInternal, wm: Managers.Watchers.Manager) {
  function createRwPromise(rw: RegisteredWatcher) {
    return new Promise((resolve) => {
      wm.pendingAddition[rw._id] = resolve;
    }).then(() => {
      delete wm.pendingAddition[rw._id];
      wm.watchers[rw._id] = rw;

      return rw;
    });
  }

  /**
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function addWatchers(watchers: Watcher.Watcher[]): Promise<RegisteredWatcher[]> {
    const rwList: RegisteredWatcher[] = watchers.map((w) => createRegisteredWatcher(w, wm));

    // Hehe
    const promises: Promise<RegisteredWatcher>[] = rwList.map(createRwPromise);
    api.add_watchers(watchersAsJSON(rwList));

    return Promise.all(promises);
  }

  return addWatchers;
}

export {
  addWatchersInitializer
};
