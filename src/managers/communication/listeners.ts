import noop from 'lodash/noop';

import { Callbacks } from '../../types';

const listeners: Callbacks = {
  objectsDetectedCb: noop,
  objectsLocatedCb: noop,
  objectClassifiedCb: noop,
  lampixInfoCb: noop,
  getAppsCb: noop,
  transformCoordinatesCb: noop
};

export { listeners };
