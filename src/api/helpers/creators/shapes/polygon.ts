import {
  Watcher,
  PublicAPI,
  Coords2DPair
} from '../../../../types';

const polygon = (outline: Coords2DPair[]): PublicAPI.Polygon => ({
  outline,
  type: Watcher.Shape.Type.Polygon
});

export { polygon };
