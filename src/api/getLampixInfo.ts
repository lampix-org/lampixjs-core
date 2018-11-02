import {
  LampixInfo
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
      const promise = listen(LampixEvents.LampixInfo);
      window._lampix_internal.get_lampix_info();
      return promise;
    })
    .then(({ lampixInfo }: { lampixInfo: LampixInfo }) => lampixInfo);

export { getLampixInfo };
