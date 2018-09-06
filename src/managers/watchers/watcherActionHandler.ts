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
 * @param internalEvent - Specifies internal event to listen to and trigger watchers.actionHandler for
 *
 * @internal
 */
function watcherActionHandlerInitializer(
  watchers: Managers.Watchers.Manager,
  internalEvent: string
) {
  function watcherActionHandler(index: number, ...data: any[]) {
    const watcher: RegisteredWatcher = watchers.list[index];

    if (watcher) {
      const action = watcher.source.action;
      action.apply(action, data);
    }
  }

  publisher.subscribe(internalEvent, watcherActionHandler);
}

export { watcherActionHandlerInitializer };
