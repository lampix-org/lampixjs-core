import { listeners } from '../api/managers/communication/listeners';

import {
  AppConfigCallback
} from '../types';

import { waitForAPI } from './waitForAPI';

/**
 * Business logic for retrieving data held in config.json (if available)
 *
 * @internal
 */
const getAppConfig = () => (): Promise<object> =>
  waitForAPI().then(() => new Promise((resolve: AppConfigCallback) => {
    listeners.getAppConfigCb = resolve;
    window._lampix_internal.get_config_data();
  }));

export { getAppConfig };
