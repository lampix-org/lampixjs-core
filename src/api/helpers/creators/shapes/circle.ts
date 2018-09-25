import {
  Watcher,
  PublicAPI
} from '../../../../types';

const circle = (
  cx: number,
  cy: number,
  r: number
): PublicAPI.Circle => ({
  type: Watcher.Shape.Type.Circle,
  data: {
    cx,
    cy,
    r
  }
});

export { circle };
