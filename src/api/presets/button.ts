import { rectangle } from '../helpers/creators/shapes/rectangle';
import noop from 'lodash/noop';

import {
  Watcher,
  StandardNeuralNetworks
} from '../../types';

const button = (x: number, y: number, onClassification: Function = noop) => ({
  onClassification,
  shape: rectangle(x, y, 50, 50),
  type: Watcher.Types.Classifier,
  name: Watcher.Names.NNClassifier,
  params: {
    neural_network_name: `cls_loc_${StandardNeuralNetworks.Fingers}`
  }
});

export { button };
