import { listeners } from '../managers/communication/listeners';

import {
  GetAppsCallback,
  AppInfo
} from '../types';

import { waitForAPI } from './waitForAPI';

/**
 * Business logic for retrieving available apps
 *
 * @internal
 */
const getApps = () => (): Promise<AppInfo[]> =>
  waitForAPI().then(() => new Promise((resolve: GetAppsCallback) => {
    listeners.getAppsCb = resolve;
    window._lampix_internal.get_apps();
  }));

export { getApps };
