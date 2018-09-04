import { RegisteredWatcher } from '../types';
import { WatcherTypes } from '../constants';

const isSegmenter = (w: RegisteredWatcher) => w.source.type === WatcherTypes.Segmenter;

export { isSegmenter };
