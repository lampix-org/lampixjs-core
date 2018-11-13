import {
  RegisteredWatcher,
  ResponsePayloads
} from '../../../types';

import { waitForAPI } from '../../waitForAPI';
import { LampixEvents } from '../../../events';
import { listen } from '../communication/settler';

/**
 * Allows watcher manager to inject device API
 *
 * @param state - Currently registered watchers per category
 * @internal
 */
function resumeWatchersInitializer() {
  /**
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function resumeWatchers(rwList: RegisteredWatcher[]): Promise<void> {
    const { promise, request } = listen<ResponsePayloads.WatchersResumed>(LampixEvents.WatchersResumed, {
      watcherIds: rwList.map((rw) => rw.state._id)
    });

    promise.then(() => rwList.forEach((rw) => { rw.state.active = true; }));

    return waitForAPI()
      .then(() => {
        window._lampix_internal.resume_watchers(JSON.stringify(request));
        return promise;
      })
      .then(() => undefined);

  }

  return resumeWatchers;
}

export {
  resumeWatchersInitializer
};
