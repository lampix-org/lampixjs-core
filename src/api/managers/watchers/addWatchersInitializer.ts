import {
  RegisteredWatcher,
  Watcher,
  Managers
} from '../../../types';

import { createRegisteredWatcher } from './createRegisteredWatcher';
import { waitForAPI } from '../../waitForAPI';
import { LampixEvents } from '../../../events';
import { listen } from '../communication/settler';

const watcherData = (w: RegisteredWatcher) => ({
  id: w.state._id,
  ...w.source
});

const watchersAsJSON = (rwList: RegisteredWatcher[]) => JSON.stringify(rwList.map(watcherData));

/**
 * Allows watcher manager to inject device API
 *
 * @param state - Currently registered watchers per category
 * @internal
 */
function addWatchersInitializer(wm: Managers.Watchers.Manager) {
  function createRwPromise(rw: RegisteredWatcher) {
    return listen(LampixEvents.WatcherAdded, rw.state._id)
      .then(() => {
        wm.watchers[rw.state._id] = rw;
        return rw;
      });
  }

  /**
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function addWatchers(watchers: Watcher.Watcher[]): Promise<RegisteredWatcher[]> {
    const rwList: RegisteredWatcher[] = watchers.map((w) => createRegisteredWatcher(w, wm));

    const promises: Promise<RegisteredWatcher>[] = rwList.map(createRwPromise);

    return waitForAPI().then(() => {
      window._lampix_internal.add_watchers(watchersAsJSON(rwList));
      return Promise.all(promises);
    });
  }

  return addWatchers;
}

export {
  addWatchersInitializer
};