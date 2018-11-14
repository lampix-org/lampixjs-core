import {
  WatcherID,
  PublicAPI,
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
function updateWatcherShapeInitializer() {
  /**
   * @param watchers - Mixed array of all watchers to add
   * @internal
   */
  function updateWatcherShape(watcher_id: WatcherID, shape: PublicAPI.Shape): Promise<void> {
    const { promise, request } = listen<ResponsePayloads.WatchersUpdated>(LampixEvents.WatcherUpdated, {
      watcher_id,
      shape
    });

    return waitForAPI()
      .then(() => {
        window._lampix_internal.update_watcher_shape(JSON.stringify(request));
        return promise;
      })
      .then(() => undefined);
  }

  return updateWatcherShape;
}

export {
  updateWatcherShapeInitializer
};
