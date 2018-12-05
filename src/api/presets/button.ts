import { rectangle } from '../helpers/creators/shapes/rectangle';
import noop from 'lodash/noop';

import {
  Watcher,
  StandardNeuralNetworks,
  ButtonPreset
} from '../../types';

const button: ButtonPreset = (
  x,
  y,
  onClassification = noop,
  { width = 50, height = 50 }
) => {
  return {
    onClassification,
    shape: rectangle(x, y, width, height),
    name: Watcher.Names.NNClassifier,
    params: {
      neural_network_name: StandardNeuralNetworks.Fingers
    }
  };
};

export { button };
