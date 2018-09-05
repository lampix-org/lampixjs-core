import {
  Manager,
  LampixInternal
} from '../../types';

import { debounceRegisterCall } from './debounceRegisterCall';
import { lampixReadableArray } from '../../utils/lampixReadableArray';

const register = (api, state) => api.registerPositionClassifier(lampixReadableArray(state.segmenters));
const debouncedRegister = debounceRegisterCall(register);

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
  debouncedRegister(api, state);
}

export { registerSegmenterWatchers };
