const publicPrefix = 'lx';
const publicEvent = (name: string) => `${publicPrefix}/${name}`;

const CLASSIFICATION_EVENT = publicEvent('objects-classified');
const LOCATION_EVENT = publicEvent('objects-located');

const WATCHER_REMOVED = publicEvent('watcher-removed');
const WATCHER_ADDED = publicEvent('watcher-added');
const WATCHER_PAUSED = publicEvent('watcher-paused');
const WATCHER_RESUMED = publicEvent('watcher-resumed');
const WATCHER_UPDATED = publicEvent('watcher-updated');

export {
  CLASSIFICATION_EVENT,
  WATCHER_REMOVED,
  WATCHER_ADDED,
  WATCHER_PAUSED,
  WATCHER_RESUMED,
  WATCHER_UPDATED,
  LOCATION_EVENT
};
