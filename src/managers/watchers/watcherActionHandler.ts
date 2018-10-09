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
 * @param internalEvents - Specifies internal event to handle action delegation
 *
 * @internal
 */
function watcherActionHandler(
  action: 'onClassification' | 'onLocation',
  wm: Managers.Watchers.Manager,
  ...internalEvents: string[]
) {
  function handler(watcherId: string, ...data: any[]) {
    const rw: RegisteredWatcher = wm.watchers[watcherId];

    if (!rw) {
      // TODO: Handle case where watcher doesn't exist
      // Use specific error
      throw new Error(`RegisteredWatcher ${watcherId} does not exist.`);
    }

    rw[action].apply(rw[action], data);
  }

  internalEvents.forEach((event) => {
    publisher.subscribe(event, handler);
  });
}

export { watcherActionHandler };
