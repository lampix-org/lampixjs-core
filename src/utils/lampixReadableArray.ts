import {
  RegisteredWatcher
} from '../types';

const watcherSource = (w: RegisteredWatcher) => w.source;
const lampixReadableArray = (watchers: RegisteredWatcher[]) => JSON.stringify(watchers.map(watcherSource));

export { lampixReadableArray };
