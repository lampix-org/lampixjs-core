import { simpleId } from './utils/simpleId';

const internalPrefix = 'lx-internal';
const publicPrefix = 'lx';
const internalEvent = (name: string) => `${internalPrefix}/${name}-${simpleId}`;
const publicEvent = (name: string) => `${publicPrefix}/${name}`;

const INTERNAL_CLASSIFIER_EVENT = internalEvent('object-classified');
const INTERNAL_SEGMENTER_EVENT = internalEvent('objects-detected');

const WATCHER_REMOVED = publicEvent('watcher-removed');
const WATCHER_ADDED = publicEvent('watcher-added');

export {
  INTERNAL_CLASSIFIER_EVENT,
  INTERNAL_SEGMENTER_EVENT,
  WATCHER_REMOVED,
  WATCHER_ADDED
};
