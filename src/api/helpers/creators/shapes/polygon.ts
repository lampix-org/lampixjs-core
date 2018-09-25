import {
  Watcher,
  PublicAPI,
  Coords2DPair
} from '../../../../types';

const polygon = (outline: Coords2DPair[]): PublicAPI.Polygon => ({
  type: Watcher.Shape.Type.Polygon,
  data: outline
});

export { polygon };
