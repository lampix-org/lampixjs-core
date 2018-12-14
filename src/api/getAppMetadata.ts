/**
 * Business logic for retrieving metadadata held in package.json (if available)
 * No point in involving the simulator or the device in this
 *
 * @internal
 */
const getAppMetadata = () => (): Promise<object> =>
  fetch('./package.json')
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

export { getAppMetadata };
