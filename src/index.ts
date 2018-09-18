import { LampixBridge } from './LampixBridge';

export {
  LampixInfo,
  RegisteredWatcher,
  PublicAPI,
  Watcher
} from './types';
export { LampixBridge };

export * from './constants';
export * from './api/helpers';

export const lampix = new LampixBridge();
