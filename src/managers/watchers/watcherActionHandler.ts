import {
  RegisteredWatcher,
  Managers
} from '../../types';

import { publisher } from '../../publisher';

/**
 * Initializes watcher action handler for a specific internal event
 *
 * @remarks
 * Used for private classifier and segmenter event handling
 *
 * @param watchers - Contains list and actionHandler for the specific list
 * @param internalEvents - Specifies internal event to handle action delegation for
 *
 * @internal
 */
function watcherActionHandler(
  wm: Managers.Watchers.Manager,
  internalEvents: string[]
) {
  function watcherActionHandler(watcherId: string, ...data: any[]) {
    const watcher: RegisteredWatcher = wm.watchers[watcherId];

    // TODO: Handle case where watcher doesn't exist
    if (watcher) {
      const action = watcher.source.action;
      action.apply(action, data);
    }
  }

  internalEvents.forEach((event) => {
    publisher.subscribe(event, watcherActionHandler);
  });
}

export { watcherActionHandler };
