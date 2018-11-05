import { waitForAPI } from './waitForAPI';
import { LampixEvents } from '../events';
import { listen } from './managers/communication/settler';

/**
 * Business logic for the retrieval of the Lampix description object
 *
 * @internal
 */
const writeJsonToFile = () => (filename: string, data: object): Promise<void> =>
  waitForAPI()
    .then(() => {
      const promise = listen(LampixEvents.FileWritten);
      window._lampix_internal.write_file(filename, JSON.stringify(data));
      return promise;
    })
    .then(() => undefined);

export { writeJsonToFile };
