import {
  LampixInternal
} from '../types';
import { waitForAPI } from './waitForAPI';

// TODO: App async lifecycle (such as exiting etc.)
// Should receive a resolve param for the promise to make sense

/**
 * Business logic for switching to another application
 *
 * @param internalLampixAPI API provided by CEF (simulator or device)
 * @internal
 */
const switchToApp = (api: LampixInternal) => (name: string): Promise<void> =>
  waitForAPI().then(() => {
    api.switch_to_app(name);
    return Promise.resolve();
  });

export { switchToApp };
