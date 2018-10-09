import { listeners } from '../managers/communication/listeners';

import {
  LampixInternal,
  GetAppsCallback,
  AppInfo
} from '../types';

/**
 * Business logic for retrieving available apps
 *
 * @param internalLampixAPI API provided by CEF (simulator or device)
 * @internal
 */
const getApps = (api: LampixInternal) => (): Promise<AppInfo[]> => {
  return new Promise((resolve: GetAppsCallback) => {
    listeners.getAppsCb = resolve;
    api.get_apps();
  });
};

export { getApps };
