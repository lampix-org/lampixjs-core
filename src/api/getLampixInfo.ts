import { listeners } from '../adapters/communication/listeners';

import {
  LampixInfo,
  LampixInternal
} from '../types';

export function getLampixInfo(internalLampixAPI: LampixInternal): Promise<LampixInfo> {
  return new Promise((resolve) => {
    listeners.lampixInfoCb = resolve;
    internalLampixAPI.getLampixInfo();
  });
}
