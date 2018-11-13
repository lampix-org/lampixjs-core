import {
  RegisteredWatcher,
  Watcher,
  Managers,
  ResponsePayloads
} from '../../../types';

import { createRegisteredWatcher } from './createRegisteredWatcher';
import { waitForAPI } from '../../waitForAPI';
import { LampixEvents } from '../../../events';
import { listen } from '../communication/settler';

const watcherData = (w: RegisteredWatcher) => ({
  id: w.state._id,
  ...w.source
});

/**
 * Allows watcher manager to inject device API
 *
 * @param state - Currently registered watchers per category
 * @internal
 */
function addWatchersInitializer(wm: Managers.Watchers.Manager) {
  /**
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function addWatchers(watchers: Watcher.Watcher[]): Promise<RegisteredWatcher[]> {
    const rwList: RegisteredWatcher[] = watchers.map((w) => createRegisteredWatcher(w, wm));

    const { promise, request } = listen<ResponsePayloads.AddWatchers>(LampixEvents.WatcherAdded, {
      watchers: rwList.map(watcherData)
    });

    promise.then(() => rwList.forEach((rw) => {
      wm.watchers[rw.state._id] = rw;
      return rw;
    }));

    return waitForAPI()
      .then(() => {
        window._lampix_internal.add_watchers(JSON.stringify(request));
        return promise;
      })
      .then(() => rwList);
  }

  return addWatchers;
}

export {
  addWatchersInitializer
};
