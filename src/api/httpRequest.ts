import {
    ResponsePayloads
  } from '../types';

import { waitForAPI } from './waitForAPI';
import { LampixEvents } from '../events';
import { listen } from './managers/communication/settler';

  /**
   * Business logic for doing external http requests
   *
   * @internal
   */
const httpRequest = () => (requestOptions: object): Promise<object> =>
    waitForAPI()
      .then(() => {

        const { promise, request } = listen<ResponsePayloads.XHRPayload>(LampixEvents.HttpRequest, requestOptions);
        window._lampix_internal.http_request(JSON.stringify(request));
        return promise;
      })
      .then((response: object) => response);

export { httpRequest };
