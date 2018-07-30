// Types
import {
  Rect
} from '../types';

function roundRectValues(array: Rect[]): Rect[] {
  return array.map(({
    posX,
    posY,
    width,
    height,
    ...rest
  }) => ({
    posX: Math.round(posX),
    posY: Math.round(posY),
    width: Math.round(width),
    height: Math.round(height),
    ...rest
  }));
}

export default roundRectValues;
