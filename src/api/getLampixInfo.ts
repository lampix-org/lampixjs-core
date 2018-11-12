import {
  LampixInfo,
  ResponsePayloads
} from '../types';

import { waitForAPI } from './waitForAPI';
import { LampixEvents } from '../events';
import { listen } from './managers/communication/settler';

/**
 * Business logic for the retrieval of the Lampix description object
 *
 * @internal
 */
const getLampixInfo = () => (): Promise<LampixInfo> =>
  waitForAPI()
    .then(() => {
      const { promise, request } = listen<ResponsePayloads.LampixInfoPayload>(LampixEvents.LampixInfo);
      window._lampix_internal.get_lampix_info(JSON.stringify(request));
      return promise;
    })
    .then(({ info }) => info);

export { getLampixInfo };
