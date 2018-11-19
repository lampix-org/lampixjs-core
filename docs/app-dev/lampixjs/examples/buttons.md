# Generating a button

## The easiest way

`npm install @lampix/core@next @lampix/dom@next`

```js
import lampixDOM from '@lampix/dom';

// Behind the scenes, this will draw a button with a scaling animation
const x = window.innerWidth / 2;
const y = window.innerHeight / 2;
const callback = () => {
  console.log('Button activated!');
};

// Minimum necessary
lampixDOM.buttons.generate(x - 100, y, callback)
  .then((firstButton) => console.log('Button ready to be used'));

// A little configuration goes a long way
const options = {
  label: 'Generic button',
  labelPosition: 'top',
  scaleFactor: 1.2, // base animation is a simple scale animation to provide action feedback
  animationDuration: 350 // enables a circle-filling style loader and syncs the scaling animation to this value as well
};

lampixDOM.buttons.generate(x + 100, y, callback, options)
  .then((secondButton) => console.log('Another button ready to be used'));
```

## Hooking up your own button using the button preset

`npm install @lampix/core@next`

```js
import lampix from '@lampix/core';

// Assuming there is an element with an ID of 'superb-btn`
const btn = document.getElementById('superb-btn');
const btnBounds = btn.getBoundingClientRect();
const x = btnBounds.left;
const y = btnBounds.top;
const callback = () => {
  console.log('Button activated!');
};

// Use the button preset  
// This automatically takes care of creating the proper watcher data structure for you  
// It also specifies the correct watcher to load and the correct neural network to use with it
const buttonWatcher = lampix.presets.button(x, y, callback);

// Remember: .watchers.add always returns an array of registered watchers
// of the same length as the number of arguments passed to it
lampix.watchers.add(buttonWatcher)
  .then((listOfButtons) => {
    console.log('Button ready to be used');
    console.log(listOfButtons[0]);
  });
```

## Hooking up your own button creating the watcher data structure yourself

```js
import lampix from '@lampix/core';

// Assuming there is an element with an ID of 'superb-btn`
const btn = document.getElementById('superb-btn');
const btnBounds = btn.getBoundingClientRect();
const x = btnBounds.left;
const y = btnBounds.top;
const callback = () => {
  console.log('Button activated!');
};

const buttonWatcher = {
  name: 'NeuralNetworkClassifier',
  shape: {
    posX: x,
    posY: y,
    width: 50,
    height: 50
  },
  onClassification: callback,
  params: {
    neural_network_name: 'fingers'
  }
};

// Remember: .watchers.add always returns an array of registered watchers
// of the same length as the number of arguments passed to it
lampix.watchers.add(buttonWatcher)
  .then((listOfButtons) => {
    console.log('Button ready to be used');
    console.log(listOfButtons[0]);
  });
```
