import {
  RegisteredWatcher,
  LampixInternal,
  Managers
} from '../../types';

import { idsAsJSON } from './idsAsJSON';

/**
 * Allows watcher manager to inject device API
 *
 * @param api - Device API
 * @param state - Currently registered watchers per category
 * @internal
 */
function pauseWatchersInitializer(api: LampixInternal, wm: Managers.Watchers.Manager) {
  function createPromise(rw: RegisteredWatcher): Promise<void> {
    return new Promise((resolve) => {
      wm.pendingPausing[rw.state._id] = resolve;
    }).then(() => {
      rw.state.active = false;
      delete wm.pendingPausing[rw.state._id];
    });
  }

  /**
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function pauseWatchers(rwList: RegisteredWatcher[]): Promise<void> {
    const promises: Promise<void>[] = rwList.map(createPromise);
    api.pause_watchers(idsAsJSON(rwList));

    return Promise.all(promises).then(() => undefined);
  }

  return pauseWatchers;
}

export {
  pauseWatchersInitializer
};
