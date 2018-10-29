import {
  RegisteredWatcher,
  Managers
} from '../../types';

import { idsAsJSON } from './idsAsJSON';
import { waitForAPI } from '../../api/waitForAPI';

/**
 * Allows watcher manager to inject device API
 *
 * @param state - Currently registered watchers per category
 * @internal
 */
function removeWatchersInitializer(wm: Managers.Watchers.Manager) {
  function confirmationPromise(rw: RegisteredWatcher): Promise<void> {
    return new Promise((resolve) => {
      wm.pendingRemoval[rw.state._id] = resolve;
    }).then(() => {
      delete wm.pendingRemoval[rw.state._id];
      delete wm.watchers[rw.state._id];
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

    return waitForAPI().then(() => {
      window._lampix_internal.remove_watchers(idsAsJSON(registeredWatchers));

      // The .then avoids returning [undefined, undefined, ..., undefined]
      return Promise.all(promises).then(() => undefined);
    });
  }

  return removeWatchers;
}

export {
  removeWatchersInitializer
};
