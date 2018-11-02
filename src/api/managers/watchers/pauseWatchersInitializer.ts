import {
  RegisteredWatcher
} from '../../../types';

import { idsAsJSON } from './idsAsJSON';
import { waitForAPI } from '../../../api/waitForAPI';
import { LampixEvents } from '../../../events';
import { listen } from '../communication/settler';

/**
 * Allows watcher manager to inject device API
 *
 * @param state - Currently registered watchers per category
 * @internal
 */
function pauseWatchersInitializer() {
  function createPromise(rw: RegisteredWatcher): Promise<void> {
    return listen(LampixEvents.WatcherPaused, rw.state._id)
      .then(() => {
        rw.state.active = false;
      });
  }

  /**
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function pauseWatchers(rwList: RegisteredWatcher[]): Promise<void> {
    const promises: Promise<void>[] = rwList.map(createPromise);

    return waitForAPI().then(() => {
      window._lampix_internal.pause_watchers(idsAsJSON(rwList));
      return Promise.all(promises).then(() => undefined);
    });
  }

  return pauseWatchers;
}

export {
  pauseWatchersInitializer
};
