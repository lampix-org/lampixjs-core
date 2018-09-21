import { getLampixInfo } from './api/getLampixInfo';
import { bindEvents } from './managers/communication/createWindowEvents';
import { watcherManager as wm } from './managers/watchers/manager';

import {
  ILampixBridge,
  LampixInfo,
  PublicAPI
} from './types';

bindEvents();
const internalLampixAPI = window._lampix_internal;

/**
 * @public
 */
class LampixBridge implements ILampixBridge {
  /**
   * Used to retrieve an object describing the Lampix environment
   */
  public getLampixInfo(): Promise<LampixInfo> {
    return new Promise((resolve) => {
      getLampixInfo(internalLampixAPI, resolve);
    });
  }

  /**
   * Watcher manager
   * - facilitates adding watchers
   * - facilitates removing multiple watchers with one call
   *
   * Alternatively, removing is done individually via
   * {@link RegisteredWatcher.remove | watcher's remove() function}
   */
  public watchers: PublicAPI.WatcherRegistrar = {
    add: (...watcherList) => wm.addWatchers(watcherList),
    remove: (...registeredWatchers) => wm.removeWatchers(registeredWatchers)
  };
}

export {
  LampixBridge
};
