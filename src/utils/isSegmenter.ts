import { RegisteredWatcher, WatcherTypes } from '../types';

const isSegmenter = (w: RegisteredWatcher) => w.source.type === WatcherTypes.Segmenter;

export { isSegmenter };
