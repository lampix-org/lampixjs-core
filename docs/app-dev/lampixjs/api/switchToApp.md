# `.switchToApp(appName, [queryParameters])`

Change from one application to another.

#### Arguments

1. `appName` (_string_): Application name equivalent to the value specified in the application's `package.json` file.
2. `queryParameters` (_Object, Optional_): Plain object with keys used query parameters with their respective values. **Note that keys will be converted from camelCase to kebab-case**.

#### Returns

(`Promise<void>`): A promise that fulfills without arguments.

#### Example

```js
import lampix from '@lampix/core';

lampix.switchToApp('trivia');

// or

lampix.switchToApp('trivia', {
  switchBackTo: 'survey',
  specialInformation: 42
});

// Query parameters can be easily accessed as follows:
// (also note the camelCase to kebab-case transformation)
// const queryParams = new URLSearchParams(window.location.search);
// queryParams.get('switch-back-to'); // survey
// queryParams.get('special-information') // '42'
```

#### Notes

`switchBackTo` is a special query parameter used in the [`exit()`](./exit.md) method to determine whether to switch to the default app (currently `app-switcher`) or the app specified as the value for this parameter.
