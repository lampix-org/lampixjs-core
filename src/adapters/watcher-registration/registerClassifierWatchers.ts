import {
  Manager,
  LampixInternal
} from '../../types';

import { lampixReadableArray } from '../../utils/lampixReadableArray';

/**
 * Sends classifier watchers to Lampix device
 *
 * @remarks
 * Lampix device works with arrays of {@link Watcher}
 *
 * @internal
 */
function registerClassifierWatchers(
  api: LampixInternal,
  state: Manager.Watchers
) {
  api.registerSimpleClassifier(lampixReadableArray(state.classifiers));
}

export { registerClassifierWatchers };
