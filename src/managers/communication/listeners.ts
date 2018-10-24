import noop from 'lodash/noop';

import { Callbacks } from '../../types';

const listeners: Callbacks = {
  objectsClassifiedCb: noop,
  objectsLocatedCb: noop,
  lampixInfoCb: noop,
  getAppsCb: noop,
  transformCoordinatesCb: noop
};

export { listeners };
