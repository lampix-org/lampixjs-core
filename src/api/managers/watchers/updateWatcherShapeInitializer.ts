import {
  WatcherID,
  Managers,
  PublicAPI
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
function updateWatcherShapeInitializer(wm: Managers.Watchers.Manager) {
  function createPromise(watcherId: WatcherID): Promise<void> {
    return listen(LampixEvents.WatcherUpdated, watcherId)
      .then(() => undefined);
  }

  /**
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function updateWatcherShape(watcherId: WatcherID, shape: PublicAPI.Shape): Promise<void> {
    return waitForAPI().then(() => {
      window._lampix_internal.update_watcher_shape(watcherId, JSON.stringify(shape));
      return createPromise(watcherId);
    });
  }

  return updateWatcherShape;
}

export {
  updateWatcherShapeInitializer
};
