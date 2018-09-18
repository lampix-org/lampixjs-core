import { listeners } from '../managers/communication/listeners';

import {
  LampixInternal,
  LampixInfoCallback
} from '../types';

/**
 * Business logic for the retrieval of the Lampix description object
 *
 * @param internalLampixAPI API provided by CEF (simulator or device)
 * @param resolve Promise resolving function assigned to window.onGetLampixInfo to be
 * called by CEF with relevant data
 * @internal
 */
const getLampixInfo = (internalLampixAPI: LampixInternal, resolve: LampixInfoCallback): void => {
  listeners.lampixInfoCb = resolve;
  internalLampixAPI.getLampixInfo();
};

export { getLampixInfo };
