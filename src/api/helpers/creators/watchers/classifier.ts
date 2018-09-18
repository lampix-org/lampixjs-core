import {
  Watcher
} from '../../../../types';

import { watcherHelperCreator } from './watcherHelperCreator';

const classifier =
  watcherHelperCreator<Watcher.Actions.ClassifierAction, Watcher.Types.Classifier>(Watcher.Types.Classifier);

export { classifier };
