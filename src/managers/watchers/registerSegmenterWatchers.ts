import {
  Managers,
  LampixInternal
} from '../../types';

import { debounceRegisterCall } from './debounceRegisterCall';
import { lampixReadableArray } from '../../utils/lampixReadableArray';

const register = (
  api: LampixInternal,
  state: Managers.Watchers.Collection
) => api.registerPositionClassifier(lampixReadableArray(state.segmenters.list));
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
  state: Managers.Watchers.Collection
) {
  debouncedRegister(api, state);
}

export { registerSegmenterWatchers };
