import { waitForAPI } from './waitForAPI';

// TODO: App async lifecycle (such as exiting etc.)
// Should receive a resolve param for the promise to make sense

/**
 * Business logic for switching to another application
 *
 * @internal
 */
const switchToApp = () => (name: string): Promise<void> =>
  waitForAPI().then(() => {
    window._lampix_internal.switch_to_app(name);
    return Promise.resolve();
  });

export { switchToApp };
