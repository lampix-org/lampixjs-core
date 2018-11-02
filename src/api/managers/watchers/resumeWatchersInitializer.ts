import {
  RegisteredWatcher,
  Managers
} from '../../../types';

import { idsAsJSON } from './idsAsJSON';
import { waitForAPI } from '../../waitForAPI';
import { LampixEvents } from '../../../events';
import { listen } from '../communication/settler';

/**
 * Allows watcher manager to inject device API
 *
 * @param state - Currently registered watchers per category
 * @internal
 */
function resumeWatchersInitializer(wm: Managers.Watchers.Manager) {
  function createPromise(rw: RegisteredWatcher): Promise<void> {
    return listen(LampixEvents.WatcherResumed, rw.state._id)
      .then(() => {
        rw.state.active = true;
      });
  }

  /**
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function resumeWatchers(rwList: RegisteredWatcher[]): Promise<void> {
    const promises: Promise<void>[] = rwList.map(createPromise);

    return waitForAPI().then(() => {
      window._lampix_internal.resume_watchers(idsAsJSON(rwList));
      return Promise.all(promises).then(() => undefined);
    });

  }

  return resumeWatchers;
}

export {
  resumeWatchersInitializer
};
