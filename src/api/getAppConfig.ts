import { waitForAPI } from './waitForAPI';
import { LampixEvents } from '../events';
import { listen } from './managers/communication/settler';

/**
 * Business logic for retrieving data held in config.json (if available)
 *
 * @internal
 */
const getAppConfig = () => (): Promise<object> =>
  waitForAPI()
    .then(() => {
      const promise = listen(LampixEvents.AppConfig);
      window._lampix_internal.get_config_data();
      return promise;
    })
    .then(({ config }) => config);

export { getAppConfig };
