import noop from 'lodash/noop';

import { Callbacks } from '../../../types';

const listeners: Callbacks = {
  objectsClassifiedCb: noop,
  objectsLocatedCb: noop,
  lampixInfoCb: noop,
  getAppsCb: noop,
  getAppConfigCb: noop,
  transformCoordinatesCb: noop
};

export { listeners };
