import {
  RegisteredWatcher,
  Managers,
  ResponsePayloads
} from '../../../types';

import { waitForAPI } from '../../../api/waitForAPI';
import { LampixEvents } from '../../../events';
import { listen } from '../communication/settler';

/**
 * Allows watcher manager to inject device API
 *
 * @param state - Currently registered watchers per category
 * @internal
 */
function removeWatchersInitializer(wm: Managers.Watchers.Manager) {
  /**
   * Removes all the provided watchers from the watch list
   *
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function removeWatchers(registeredWatchers: RegisteredWatcher[]): Promise<void> {
    const { promise, request } = listen<ResponsePayloads.RemoveWatchers>(LampixEvents.WatchersRemoved, {
      watcherIds: registeredWatchers.map((rw) => rw.state._id)
    });

    promise.then(() => registeredWatchers.forEach((rw) => {
      delete wm.watchers[rw.state._id];
    }));

    return waitForAPI()
      .then(() => {
        window._lampix_internal.remove_watchers(JSON.stringify(request));
        return promise;
      })
      .then(() => undefined);
  }

  return removeWatchers;
}

export {
  removeWatchersInitializer
};
