import {
  Watcher,
  PublicAPI
} from '../../../../types';

const polygon = (outline: number[]): PublicAPI.Polygon => ({
  outline,
  type: Watcher.Shape.Type.Polygon
});

export { polygon };
