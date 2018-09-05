import noop from 'lodash/noop';

import { Callbacks } from '../../types';

const listeners: Callbacks = {
  drawingDetectorCb: noop,
  lampixInfoCb: noop,
  movementCb: noop,
  positionClassifierCb: noop,
  prePositionClassifierCb: noop,
  simpleClassifierCb: noop,
  getAppsCb: noop,
  transformCoordinatesCb: noop
};

export { listeners };
