import { getLampixInfo } from './api/getLampixInfo';
import { switchToApp } from './api/switchToApp';
import { getApps } from './api/getApps';
import { bindEvents } from './managers/communication/createWindowEvents';
import { watcherManager as wm } from './managers/watchers/manager';

import * as constants from './constants';

// Helpers
import { rectangle } from './api/helpers/creators/shapes/rectangle';
import { polygon } from './api/helpers/creators/shapes/polygon';

// Presets
import { button } from './api/presets/button';

import {
  ILampixBridge,
  LampixInfo,
  PublicAPI,
  AppInfo
} from './types';

bindEvents();

/**
 * @public
 */
class LampixBridge implements ILampixBridge {
  constants = constants;
  helpers = {
    rectangle,
    polygon
  };
  presets = {
    button
  };
  /**
   * Used to retrieve an object describing the Lampix environment
   */
  public getLampixInfo: () => Promise<LampixInfo> = getLampixInfo();
  /**
   * Allows changing from one app to the specified app
   */
  public switchToApp: (name: string) => Promise<void> = switchToApp();
  /**
   * Retrieve a list of available apps to switch to
   */
  public getApps: () => Promise<AppInfo[]> = getApps();

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
    remove: (...registeredWatchers) => wm.removeWatchers(registeredWatchers),
    pauseAll: () => wm.pauseAllWatchers(),
    resumeAll: () => wm.resumeAllWatchers()
  };
}

export {
  LampixBridge
};

export {
  LampixInfo,
  RegisteredWatcher,
  PublicAPI,
  Watcher,
  AppInfo
} from './types';
