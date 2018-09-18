import {
  Watcher,
  ArbitraryProps,
} from '../../../../types';

// Naive
// TODO: Check integrity of options
const watcherHelperCreator = <T, U>(type: U) => (
  name: string,
  shape: Watcher.Shape.AllShapes,
  action: T,
  params?: ArbitraryProps
) => ({
  name,
  type,
  shape,
  action,
  params
});

export { watcherHelperCreator };
