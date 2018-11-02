import {
  AppInfo
} from '../types';

import { waitForAPI } from './waitForAPI';
import { LampixEvents } from '../events';
import { listen } from './managers/communication/settler';

/**
 * Business logic for retrieving available apps
 *
 * @internal
 */
const getApps = () => (): Promise<AppInfo[]> =>
  waitForAPI()
    .then(() => {
      const promise = listen(LampixEvents.GetApps);
      window._lampix_internal.get_apps();
      return promise;
    })
    .then(({ apps }: { apps: AppInfo[] }) => apps);

export { getApps };
