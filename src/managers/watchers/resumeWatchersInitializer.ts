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
function resumeWatchersInitializer(api: LampixInternal, wm: Managers.Watchers.Manager) {
  function createPromise(rw: RegisteredWatcher): Promise<void> {
    return new Promise((resolve) => {
      wm.pendingResuming[rw.state._id] = resolve;
    }).then(() => {
      rw.state.active = true;
      delete wm.pendingResuming[rw.state._id];
    });
  }

  /**
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function resumeWatchers(rwList: RegisteredWatcher[]): Promise<void> {
    const promises: Promise<void>[] = rwList.map(createPromise);
    api.resume_watchers(idsAsJSON(rwList));

    return Promise.all(promises).then(() => undefined);
  }

  return resumeWatchers;
}

export {
  resumeWatchersInitializer
};
