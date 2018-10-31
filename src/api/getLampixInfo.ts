import { listeners } from '../api/managers/communication/listeners';

import {
  LampixInfo,
  LampixInfoCallback
} from '../types';

import { waitForAPI } from './waitForAPI';

/**
 * Business logic for the retrieval of the Lampix description object
 *
 * @internal
 */
const getLampixInfo = () => (): Promise<LampixInfo> =>
  waitForAPI().then(() => new Promise((resolve: LampixInfoCallback) => {
    listeners.lampixInfoCb = resolve;
    window._lampix_internal.get_lampix_info();
  }));

export { getLampixInfo };
