import { getLampixInfo } from './api/getLampixInfo';
import { bindEvents } from './managers/communication/createWindowEvents';
import { watcherManager as wm } from './managers/watchers/manager';

import * as constants from './constants';

import { classifier } from './api/helpers/creators/watchers/classifier';
import { segmenter } from './api/helpers/creators/watchers/segmenter';
import { circle } from './api/helpers/creators/shapes/circle';
import { rectangle } from './api/helpers/creators/shapes/rectangle';
import { polygon } from './api/helpers/creators/shapes/polygon';

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
  constants = constants;
  helpers = {
    classifier,
    segmenter,
    circle,
    rectangle,
    polygon
  };
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

export {
  LampixInfo,
  RegisteredWatcher,
  PublicAPI,
  Watcher
} from './types';
