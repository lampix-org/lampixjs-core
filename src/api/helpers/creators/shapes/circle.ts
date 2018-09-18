import {
  Watcher,
  PublicAPI
} from '../../../../types';

const circle = (
  cx: number,
  cy: number,
  r: number
): PublicAPI.Circle => ({
  cx,
  cy,
  r,
  type: Watcher.Shape.Type.Circle
});

export { circle };
