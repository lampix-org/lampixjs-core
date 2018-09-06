import {
  Managers,
  LampixInternal
} from '../../types';

import { debounceRegisterCall } from './debounceRegisterCall';
import { lampixReadableArray } from '../../utils/lampixReadableArray';

const register = (
  api: LampixInternal,
  state: Managers.Watchers.Collection
) => api.registerSimpleClassifier(lampixReadableArray(state.classifiers.list));
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
  state: Managers.Watchers.Collection
) {
  debouncedRegister(api, state);
}

export { registerClassifierWatchers };
