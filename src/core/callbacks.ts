import { Callbacks } from '../types';
import noop from '../utils/noop';

const callbacks: Callbacks = {
  drawingDetectorCallback: noop,
  lampixInfoCallback: noop,
  movementCallback: noop,
  positionClassifierCallback: noop,
  prePositionClassifierCallback: noop,
  simpleClassifierCallback: noop,
  getAppsCallback: noop,
  transformCoordinatesCallback: noop
};

export default callbacks;
