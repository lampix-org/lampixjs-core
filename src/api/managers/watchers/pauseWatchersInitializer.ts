import {
  RegisteredWatcher,
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
function pauseWatchersInitializer() {
  /**
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function pauseWatchers(rwList: RegisteredWatcher[]): Promise<void> {
    const { promise, request } = listen<ResponsePayloads.WatchersPaused>(LampixEvents.WatchersPaused, {
      watcherIds: rwList.map((rw) => rw.state._id)
    });

    promise.then(() => rwList.forEach((rw) => { rw.state.active = false; }));

    return waitForAPI()
      .then(() => {
        window._lampix_internal.pause_watchers(JSON.stringify(request));
        return promise;
      })
      .then(() => undefined);
  }

  return pauseWatchers;
}

export {
  pauseWatchersInitializer
};
