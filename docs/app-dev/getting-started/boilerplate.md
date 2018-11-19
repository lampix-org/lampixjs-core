# Boilerplate

Any modern JavaScript boilerplate (aka "template", "starter", "seed") is fine, and one can develop Lampix applications without any boilerplate.  
The following are all equally fine:

* [create-react-app](https://github.com/facebook/create-react-app)
* [angular-cli](https://github.com/angular/angular-cli)
* [vue-cli](https://github.com/vuejs/vue-cli)

Depending on your application's needs, your choice of boilerplate may differ.  
The one thing to keep in mind is what the [production application structure](../application-structure.md) should look like when deploying the application.

We provide a boilerplate of our own that is meant to facilitate development, but does not assume anything other than your application's source code entry points (`index.html` and `index.js`). It is not as mature as the above, but for your consideration, this is why we use it:

* simple to understand and extend
* minimal infrastructure only - no non-vanilla technology is assumed
* HMR
* build step includes archive creation for my.lampix.com, along with versioned build folders (based on package.json version)
* build scripts to automatically increase patch, minor or major versions before building, alongside the "just build" script
* respects the requirements of the [production application structure](../application-structure.md)

The boilerplate can be found on our [GitHub](https://github.com/lampix-org/app-boilerplate).
