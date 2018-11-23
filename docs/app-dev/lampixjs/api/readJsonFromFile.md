# `.readJsonFromFile(filename)`

Read JSON data from a file written with [`writeJsonFromFile`](./writeJsonFromFile.md).

#### Returns

(`Promise<object>`): A promise that fulfills with either `null` (in case the file does not contain valid JSON, or if the file does not exist) or an object with the contents of the file.

#### Example

```js
import lampix from '@lampix/core';

lampix.readJsonFromFile('answers.json')
  .then(console.log); // { answerToLife: 42 }
```

#### Notes

[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API is also enabled. You can use it instead of this method.
`localStorage`, by design, is a blocking I/O operation (synchronous). Use [`writeJsonToFile`](./writeJsonToFile.md) and `readJsonFromFile` if you want to use non-blocking (asynchronous) I/O operations.

`readJsonFromFile` (like `localStorage`), is application specific. This means one application cannot retrieve the saved data of another application.
