import {
  WatcherID,
  LampixInternal,
  Managers,
  Watcher
} from '../../types';

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
  function updateWatcherShape(watcherId: WatcherID, shape: Watcher.Shape.AllShapes): Promise<void> {
    api.update_watchers_shape(watcherId, JSON.stringify(shape));

    return createPromise(watcherId);
  }

  return updateWatcherShape;
}

export {
  updateWatcherShapeInitializer
};
