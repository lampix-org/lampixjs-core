import { waitForAPI } from './waitForAPI';
import { LampixEvents } from '../events';
import { listen } from './managers/communication/settler';

/**
 * Business logic for the retrieval of the Lampix description object
 *
 * @internal
 */
const readJsonFromFile = () => (filename: string): Promise<object> =>
  waitForAPI()
    .then(() => {
      const promise = listen(LampixEvents.FileRead);
      window._lampix_internal.read_file(filename);
      return promise;
    })
    .then(({ data }: { data: object }) => data);

export { readJsonFromFile };
