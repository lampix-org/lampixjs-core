import { getLampixInfo } from './api/getLampixInfo';
import { createRegisteredWatcher } from './managers/watchers/createRegisteredWatcher';

import * as WatcherManager from './managers/watchers/manager';

import {
  ILampixBridge,
  LampixInfo,
  PublicAPI,
  Watcher
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
    add(...watcherList) {
      const watchers = watcherList.map(createRegisteredWatcher);
      WatcherManager.addWatchers(...watchers);

      // Impose async to allow the development of proper communication between
      // device API and JS SDK without prompting a major semver bump in the near future
      // TODO: Onwards towards proper communication!
      return Promise.resolve(watchers);
    },
    remove(...registeredWatchers) {
      WatcherManager.removeWatchers(...registeredWatchers);

      // Impose async to allow the development of proper communication between
      // device API and JS SDK without prompting a major semver bump in the near future
      // TODO: Onwards towards proper communication!
      return Promise.resolve();
    }
  };
}

export { LampixBridge };
