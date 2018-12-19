# `.getAppConfig()`

Retrieve the contents of the `config.json` file.

#### Returns

(`Promise<object>`): A promise that fulfills with a plain object.

#### Example

```js
import lampix from '@lampix/core';

const initialize = (config) => {
  // do something with the data in config.json
};

lampix.getAppConfig()
  .then((config) => {
    initialize(config);
  });
```

#### Notes

See [`config.json`](../../deploying/application-structure.md#config-and-schema) of the [production application structure](../../deploying/application-structure.md) for details on what `config.json` is used for.
