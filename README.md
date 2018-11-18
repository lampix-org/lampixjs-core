# LampixJS

LampixJS is the official JavaScript library for creating [Lampix](https://lampix.com/) applications, making use of the internal API Lampix devices expose.

## Application considerations

Any valid web application can run on Lampix. The only thing to keep in mind is that **Lampix will not, by default, make things interactive**.  
To integrate with Lampix, use the [lampixjs](https://www.npmjs.com/package/@lampix/core) library. The library is meant to be used inside the context of a Lampix device or the Lampix simulator. Loaded inside an environment without the expected API will simply make the library search for the API indefinitely, rendering its most relevant methods unusable.

### What web technologies can I use?

You can create your application any way you seem fit, provided the end result respects what is outlined in the [application structure](./docs/app-dev/lampixjs/application-structure.md).  
That said, you can use:
* [React](https://reactjs.org/)
* [Angular](https://angular.io/)
* [Vue](https://vuejs.org/)
* [VanillaJS](http://vanilla-js.com/) - as in no libraries, if you'd prefer not using any
* and any other technology used to develop web applications

### Do I need to worry about browser support?

You only need to worry about Chromium v66. Search this [compatibility table](https://caniuse.com/#compare=chrome+66) for the functionality you need.  
Chromium v66 is quite advanced, and includes features such as the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and [web animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) out of the box (the latter, for instance, is an experimental technology whose `animation.finished` promises show issues, but can easily be mitigated with the properly working `animation.onfinish` callbacks).
