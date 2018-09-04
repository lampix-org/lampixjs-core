import { RegisteredWatcher } from '../types';
import { WatcherTypes } from '../constants';

const isClassifier = (w: RegisteredWatcher) => w.source.type === WatcherTypes.Classifier;

export { isClassifier };
