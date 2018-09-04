import {
  Manager,
  LampixInternal
} from '../../types';

import { lampixReadableArray } from '../../utils/lampixReadableArray';

/**
 * Sends segmenter watchers to Lampix device
 *
 * @remarks
 * Lampix device works with arrays of {@link Watcher}
 *
 * @internal
 */
function registerSegmenterWatchers(
  api: LampixInternal,
  state: Manager.Watchers
) {
  api.registerPositionClassifier(lampixReadableArray(state.segmenters));
}

export { registerSegmenterWatchers };
