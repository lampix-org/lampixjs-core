import debounce from 'lodash/debounce';
import partialRight from 'lodash/partialRight';
import ary from 'lodash/ary';

// TODO: Perhaps make these configurable
const timeToWaitInBetweenCalls = 100;
const options = {
  maxWait: 1000
};

// lodash/ary is used here to specify the number of arguments still needed
// to complete the debounce call
// With partialRight only, TypeScript would return type Function0
// which corresponds to arity 0 and TypeScript would signal
// the function got 1 argument instead of 0
const debounceRegisterCall = ary(
  partialRight(
    debounce,
    timeToWaitInBetweenCalls,
    options
  ),
  1
);

export { debounceRegisterCall };
