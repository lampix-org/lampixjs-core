import { waitForAPI } from './waitForAPI';
import { APP_SWITCHER_NAME } from '../constants';

// TODO: App async lifecycle (such as exiting etc.)
// Should receive a resolve param for the promise to make sense

/**
 * Business logic for exiting to default app or app specific via query param
 *
 * @internal
 */
const exit = () => (): Promise<void> =>
  waitForAPI().then(() => {
    const urlQueryParams = new URLSearchParams(window.location.search);
    const appToExitTo = urlQueryParams.get('switch-back-to') || APP_SWITCHER_NAME;

    window._lampix_internal.switch_to_app(appToExitTo);
    return Promise.resolve();
  });

export { exit };
