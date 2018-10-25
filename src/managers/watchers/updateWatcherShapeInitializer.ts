import {
  WatcherID,
  LampixInternal,
  Managers,
  PublicAPI
} from '../../types';

import { waitForAPI } from '../../api/waitForAPI';

/**
 * Allows watcher manager to inject device API
 *
 * @param api - Device API
 * @param state - Currently registered watchers per category
 * @internal
 */
function updateWatcherShapeInitializer(api: LampixInternal, wm: Managers.Watchers.Manager) {
  function createPromise(watcherId: WatcherID): Promise<void> {
    return new Promise((resolve) => {
      wm.pendingUpdate[watcherId] = resolve;
    }).then(() => {
      delete wm.pendingUpdate[watcherId];
    });
  }

  /**
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function updateWatcherShape(watcherId: WatcherID, shape: PublicAPI.Shape): Promise<void> {
    return waitForAPI().then(() => {
      api.update_watcher_shape(watcherId, JSON.stringify(shape));
      return createPromise(watcherId);
    });
  }

  return updateWatcherShape;
}

export {
  updateWatcherShapeInitializer
};
