import { getLampixInfo } from './api/getLampixInfo';
import { switchToApp } from './api/switchToApp';
import { exit } from './api/exit';
import { getApps } from './api/getApps';
import { httpRequest } from './api/httpRequest';
import { getAppConfig } from './api/getAppConfig';
import { getAppMetadata } from './api/getAppMetadata';
import { writeJsonToFile } from './api/writeJsonToFile';
import { readJsonFromFile } from './api/readJsonFromFile';
import { transformRectCoords } from './api/transformRectCoords';
import { bindEvents } from './api/managers/communication/createWindowEvents';
import { watcherManager as wm } from './api/managers/watchers/manager';

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
  AppInfo,
  QueryParamsObject,
  RectCoords,
  Watcher,
  RegisteredWatcher
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
  public switchToApp: (name: string, queryParams?: QueryParamsObject) => Promise<void> = switchToApp();
  /**
   * Helper function that uses {@link LampixBridge.switchToApp} internally
   * Does not allow specifying other query parameters
   *
   * Exits to {@link constants.APP_SWITCHER_NAME} by default
   *
   * If the app has been started with a "switch-back-to" query parameter via the {@link LampixBridge.switchToApp}
   * method, then the value of this param will take precedence over the default
   */
  public exit: () => Promise<void> = exit();
  /**
   * Retrieve a list of available apps to switch to
   */
  public getApps: () => Promise<AppInfo[]> = getApps();

  /**
   * send an http request to lampix to perform in order to avoid CORS issues
   * */
  public httpRequest: (requestOptions: object) => Promise<object> = httpRequest();

  /**
   * Retrieve application specific data from config.json if available
   */
  public getAppConfig: () => Promise<object> = getAppConfig();
  public getAppMetadata: () => Promise<object> = getAppMetadata();
  public writeJsonToFile: (filename: string, data: object) => Promise<void> = writeJsonToFile();
  public readJsonFromFile: (filename: string) => Promise<object> = readJsonFromFile();
  public transformRectCoords: (...rectCoords: RectCoords[]) => Promise<RectCoords[]> = transformRectCoords();

  /**
   * Watcher manager
   * - facilitates adding watchers
   * - facilitates removing multiple watchers with one call
   *
   * Alternatively, removing is done individually via
   * {@link RegisteredWatcher.remove | watcher's remove() function}
   */
  public watchers: PublicAPI.WatcherRegistrar = {
    add: (...watcherList) => {
      let watchersToSend: Watcher.Watcher[] = [];

      watcherList.forEach((w) => {
        if (Array.isArray(w)) {
          watchersToSend = [...watchersToSend, ...w];
        } else {
          watchersToSend.push(w);
        }
      });

      return wm.addWatchers(watchersToSend);
    },
    remove: (...registeredWatchers) => {
      let rwListToRemove: RegisteredWatcher[] = [];

      registeredWatchers.forEach((rw) => {
        if (Array.isArray(rw)) {
          rwListToRemove = [...rwListToRemove, ...rw];
        } else {
          rwListToRemove.push(rw);
        }
      });

      return wm.removeWatchers(rwListToRemove);
    },
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
