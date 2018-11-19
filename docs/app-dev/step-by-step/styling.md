# Styling

Copy and paste this in a `src/styles.css` file right next to `src/index.html` and `src/index.js`.

```css
body {
  color: white;
  font-family: sans-serif;
}

.area {
  border: 1px solid #FFFFFF;
  border-radius: 10px;

  transition: border-color 200ms ease;
}

.area-title {
  position: absolute;
  top: -2em;
  text-align: center;
  width: 100%;
}

.nnc {
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);

  width: 200px;
  height: 200px;
}

.nnc-recognized-class {
  position: absolute;
  bottom: -2em;
  text-align: center;
  width: 100%;
}

.mbs {
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);

  width: 600px;
  height: 600px;
}

.mbs-object {
  position: absolute;

  border: 3px solid;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 50px;
  height: 50px;

  animation: grow 1s ease forwards;
}

@keyframes grow {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
```

Then import the file in `index.js` to let Webpack know about it and apply the styles. It will take care of linking it in `index.html` on its own when the time comes.

```js
// index.js
import lampix from '@lampix/core';

import './styles.css';
```

