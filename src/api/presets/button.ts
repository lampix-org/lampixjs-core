import { rectangle } from '../helpers/creators/shapes/rectangle';
import noop from 'lodash/noop';

import {
  Watcher,
  StandardNeuralNetworks
} from '../../types';

const button = ({
  x,
  y,
  width = 50,
  height = 50,
  onClassification = noop
}: {
  x: number,
  y: number,
  width: number,
  height: number,
  onClassification: Function
}) => ({
  onClassification,
  shape: rectangle(x, y, width, height),
  name: Watcher.Names.NNClassifier,
  params: {
    neural_network_name: StandardNeuralNetworks.Fingers
  }
});

export { button };
