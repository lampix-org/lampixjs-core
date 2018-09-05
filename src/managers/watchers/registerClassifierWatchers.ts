import {
  Manager,
  LampixInternal
} from '../../types';

import { debounceRegisterCall } from './debounceRegisterCall';
import { lampixReadableArray } from '../../utils/lampixReadableArray';

const register = (
  api: LampixInternal,
  state: Manager.Watchers
) => api.registerSimpleClassifier(lampixReadableArray(state.classifiers));
const debouncedRegister = debounceRegisterCall(register);

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
  debouncedRegister(api, state);
}

export { registerClassifierWatchers };
