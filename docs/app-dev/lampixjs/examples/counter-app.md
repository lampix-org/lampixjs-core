# Counter App

The code below is available in the [minimal sample](https://github.com/lampix-org/minimal-sample) on our GitHub, that is based on our [boilerplate](../boilerplate.md).

```js
import lampix from '@lampix/core';
import lampixDOM from '@lampix/dom';

import './styles.css';

let counter = 0;

const counterElement = document.getElementsByClassName('counter')[0];
counterElement.textContent = 'Loading...';

const increaseCount = () => {
  counter++;
};

const updateCounterElement = () => {
  counterElement.textContent = counter;
};

const initialize = async () => {
  const counterButtonOptions = {
    label: 'Increase count',
    labelPosition: 'top',
    scaleFactor: 1.2,
    animationDuration: 250
  };

  const closeButtonOptions = {
    label: 'Close App',
    labelPosition: 'top',
    scaleFactor: 1.2,
    animationDuration: 500
  };

  const callback = () => {
    increaseCount();
    updateCounterElement();
  };

  const counterButtonPromise = lampixDOM.buttons.generate(
    window.innerWidth / 2,
    window.innerHeight - 120,
    callback,
    counterButtonOptions
  );

  const closeAppButtonPromise = lampixDOM.buttons.generate(
    100,
    100,
    lampix.exit,
    closeButtonOptions
  );

  await counterButtonPromise;
  await closeAppButtonPromise;

  updateCounterElement();
};

initialize();
```
