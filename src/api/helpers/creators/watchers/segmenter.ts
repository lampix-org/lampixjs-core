import {
  Watcher
} from '../../../../types';

import { watcherHelperCreator } from './watcherHelperCreator';

const segmenter =
  watcherHelperCreator<Watcher.Actions.SegmenterAction, Watcher.Types.Segmenter>(Watcher.Types.Segmenter);

export { segmenter };
