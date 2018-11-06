/**
 * Business logic for retrieving data held in config.json (if available)
 * No point in involving the simulator or the device in this
 *
 * @internal
 */
const getAppConfig = () => (): Promise<object> =>
  fetch('./config.json')
    .then((r) => {
      if (!r.ok) {
        return null;
      }

      return r.text();
    })
    .then((body) => {
      if (!body) return null;

      try {
        return JSON.parse(body);
      } catch (e) {
        return null;
      }
    });

export { getAppConfig };
