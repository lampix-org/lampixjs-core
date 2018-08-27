import pkg from '../../../package.json';

export const internalError = (message: string): string =>
  `${message}. This is an internal library error. Please, file an issue at ${pkg.repository.url}/issues`;
