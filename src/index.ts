import { LampixBridge } from './LampixBridge';

export {
  LampixInfo,
  PublicAPI
} from './types';
export { LampixBridge };

export * from './constants';
export const lampix = new LampixBridge();
