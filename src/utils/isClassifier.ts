import { RegisteredWatcher, WatcherTypes } from '../types';

const isClassifier = (w: RegisteredWatcher) => w.source.type === WatcherTypes.Classifier;

export { isClassifier };
