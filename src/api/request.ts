import { generateId } from '../utils/generateId';

const request = (
  callback: string,
  data: object
) => ({
  callback,
  data,
  requestId: generateId(),
});

export { request };
