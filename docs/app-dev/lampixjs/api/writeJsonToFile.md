# `.writeJsonToFile(filename, data)`

Write JSON data to a file to retrieve later via [`readJsonFromFile`](./readJsonFromFile.md).

#### Returns

(`Promise<void>`): A promise that fulfills without arguments when writing has finished.

#### Example

```js
import lampix from '@lampix/core';

const data = {
  answerToLife: 42
};

lampix.writeToFile('answers.json', data)
  .then(() => console.log('Successfully saved all answers.'));
```

#### Notes

[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API is also enabled. You can use it instead of this method.
`localStorage`, by design, is a blocking I/O operation (synchronous). Use `writeJsonToFile` and [readJsonFromFile](./readJsonFromFile.md) if you want to use non-blocking (asynchronous) I/O operations.

`writeJsonToFile` (like `localStorage`), is application specific. This means one application cannot retrieve the saved data of another application.
