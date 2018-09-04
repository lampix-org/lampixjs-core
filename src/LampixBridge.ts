import { getLampixInfo } from './api/getLampixInfo';
import { createRegisteredWatcher } from './api/createRegisteredWatcher';

import * as WatcherManager from './adapters/watcher-registration/manager';

import {
  ILampixBridge,
  LampixInfo,
  PublicAPI
} from './types';

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
    add(...rectangles) {
      const watchers = rectangles.map(createRegisteredWatcher);
      WatcherManager.addWatchers(watchers);

      // Impose async to allow the development of proper communication between
      // device API and JS SDK without prompting a major semver bump in the near future
      return Promise.resolve(watchers);
    },
    remove(...registeredWatchers) {
      console.log(registeredWatchers);

      return Promise.resolve();
    }
  };
}

export { LampixBridge };
