import { waitForAPI } from './waitForAPI';
import { LampixEvents } from '../events';
import { listen } from './managers/communication/settler';
import { ResponsePayloads } from '../types';

/**
 * Business logic for the retrieval of the Lampix description object
 *
 * @internal
 */
const writeJsonToFile = () => (filename: string, data: object): Promise<void> =>
  waitForAPI()
    .then(() => {
      const { promise, request } = listen<ResponsePayloads.FileWrittenPayload>(LampixEvents.FileWritten, {
        filename,
        data
      });

      window._lampix_internal.write_file(JSON.stringify(request));
      return promise;
    })
    .then(() => undefined);

export { writeJsonToFile };
