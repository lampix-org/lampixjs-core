import { RegisteredWatcher, Watcher } from '../types';

const isSegmenter = (w: RegisteredWatcher) => w.source.type === Watcher.Types.Segmenter;

export { isSegmenter };
