import once from 'lodash/once';

const logWaitingMessage = once(() => {
  console.log('Blocking renderer while waiting for JS bindings.');
});

const waitForApi = () => {
  while (!window._lampix_internal) {
    logWaitingMessage();
  }

  console.log('JS bindings found');
};

export { waitForApi };
