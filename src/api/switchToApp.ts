import { QueryParamsObject } from '../types';
import { waitForAPI } from './waitForAPI';
import { camelCaseToKebabCase } from '../utils/camelCaseToKebabCase';

// TODO: App async lifecycle (such as exiting etc.)
// Should receive a resolve param for the promise to make sense

/**
 * Business logic for switching to another application
 *
 * @internal
 */
const switchToApp = () => (name: string, queryParams: QueryParamsObject): Promise<void> =>
  waitForAPI().then(() => {
    const params: QueryParamsObject = {};
    Object.keys(queryParams).forEach((param: string) => {
      params[camelCaseToKebabCase(param)] = queryParams[param];
    });

    window._lampix_internal.switch_to_app(name, JSON.stringify(params));
    return Promise.resolve();
  });

export { switchToApp };
