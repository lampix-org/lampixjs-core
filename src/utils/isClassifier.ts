import { RegisteredWatcher, Watcher } from '../types';

const isClassifier = (w: RegisteredWatcher) => w.source.type === Watcher.Types.Classifier;

export { isClassifier };
