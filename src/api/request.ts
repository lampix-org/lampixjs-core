import { generateId } from '../utils/generateId';

const request = (
  callback: string,
  data: object
) => ({
  callback,
  data,
  request_id: generateId(),
});

export { request };
