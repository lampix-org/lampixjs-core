import { listeners } from '../managers/communication/listeners';

import {
  LampixInfo,
  LampixInternal,
  LampixInfoCallback
} from '../types';

import { waitForAPI } from './waitForAPI';

/**
 * Business logic for the retrieval of the Lampix description object
 *
 * @param api API provided by CEF (simulator or device)
 * @param resolve Promise resolving function assigned to window.onGetLampixInfo to be
 * called by CEF with relevant data
 * @internal
 */
const getLampixInfo = (api: LampixInternal) => (): Promise<LampixInfo> =>
  waitForAPI().then(() => new Promise((resolve: LampixInfoCallback) => {
    listeners.lampixInfoCb = resolve;
    api.get_lampix_info();
  }));

export { getLampixInfo };
