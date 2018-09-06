import { simpleId } from './utils/simpleId';

const prefix = 'lx-internal-event';
const internalEvent = (name: string) => `${prefix}/${name}-${simpleId}`;

const INTERNAL_CLASSIFIER_EVENT = internalEvent('classifier');
const INTERNAL_SEGMENTER_EVENT = internalEvent('segmenter');

export {
  INTERNAL_CLASSIFIER_EVENT,
  INTERNAL_SEGMENTER_EVENT
};
