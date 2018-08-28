import { _getLampixInfo } from './api/getLampixInfo';

import {
  ILampixBridge,
  LampixInfo
} from './types';

const internalLampixAPI = window._lampix_internal;

/**
 * @public
 */
class LampixBridge implements ILampixBridge {
  /**
   * Used to retrieve an object describing the Lampix environment
   */
  public getLampixInfo(): Promise<LampixInfo> {
    return new Promise((resolve) => {
      _getLampixInfo(internalLampixAPI, resolve);
    });
  }
}

export { LampixBridge };
