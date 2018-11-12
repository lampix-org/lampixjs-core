import { waitForAPI } from './waitForAPI';
import { LampixEvents } from '../events';
import { listen } from './managers/communication/settler';
import { ResponsePayloads } from '../types';

/**
 * Business logic for the retrieval of the Lampix description object
 *
 * @internal
 */
const readJsonFromFile = () => (filename: string): Promise<object> =>
  waitForAPI()
    .then(() => {
      const { promise, request } = listen<ResponsePayloads.FileReadPayload>(LampixEvents.FileRead, {
        filename
      });

      window._lampix_internal.read_file(JSON.stringify(request));
      return promise;
    })
    .then(({ data }: { data: object }) => data);

export { readJsonFromFile };
