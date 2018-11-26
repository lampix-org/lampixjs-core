let apiReady = false;
let pool: Function[] = [];
const interval = setInterval(
  () => {
    console.log('Checking periodically for JS bindings...');

    apiReady = !!window._lampix_internal;

    if (apiReady) {
      console.log('Bindings received');

      pool.forEach((fn) => fn());
      pool = null;
      clearInterval(interval);
    }
  },
  25
);

const waitForAPI = () => new Promise((resolve) => {
  if (apiReady) {
    resolve();
    return;
  }

  pool.push(resolve);
});

export { waitForAPI };
