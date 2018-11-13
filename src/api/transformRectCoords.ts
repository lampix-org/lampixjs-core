import {
  ResponsePayloads,
  RectCoords
} from '../types';

import { waitForAPI } from './waitForAPI';
import { LampixEvents } from '../events';
import { listen } from './managers/communication/settler';

/**
 * Business logic for transforming coordinates between camera and projector values
 *
 * @internal
 */
const transformRectCoords = () => (...rectangles: RectCoords[]): Promise<RectCoords[]> =>
  waitForAPI()
    .then(() => {
      const { promise, request } = listen<ResponsePayloads.RectCoordsTransformed>(LampixEvents.TransformCoordinates, {
        rectangles
      });

      window._lampix_internal.transform_coordinates(JSON.stringify(request));
      return promise;
    })
    .then(({ rectangles }) => rectangles);

export { transformRectCoords };
