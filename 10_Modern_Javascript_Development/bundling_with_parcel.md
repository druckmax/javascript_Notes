# Bundling with Parcel

Parcel is a popular built-tool that works out of the box and needs no manual configuration, in contrast to webpack for example. When installing parcel from npm we need to install it as a dev-dependency, which are packages only needed for development, since parcel is bundling the code for production and is not needed anymore after bundling.

We run Parcel with npx + parcel + the entry point, which is the location wehre we include our script. Usually this is the index.html file. When running parcel, it will bundle the code, but also run a development server like live-server. It is important to remember that we have to delete the type attribute from the script tag of the HTML file in order for parcel to successfully start the building process.

Alternatively we can write a npm script to start parcel.

```json
"scripts": {
    "start": "parcel index.html"
}
```

Another advantage of using Parcel is that we do not have to specify the exact path the the module, for example lodash. Instead we can simply write:

```js
import cloneDeep from 'lodash';
```

During building Parcel will create a new folder named dist, which holds all the newly built files.

If we want a a dist foler ready for production, we can also write a npm script for the build process, which compresses, minifies and eliminates dead code.

```json
"scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html"
}
```

### Hot Module Reloading

Hot Module Reloading is a feature of Parcel that allows us to reload or update modules in the browser at runtime without needing to refresh the whole page. This dramatically improves the development experience. CSS changes are automatically applied via HMR with no page reload necessary. This is also true when using a framework with HMR support built in, like React (via Fast Refresh), and Vue.

If we are not using a framework we can tell Parcel to use the module.hot API, which will prevent the page from being reloaded and instead applies the in-place update.

```js
if(module.hot) {
    module.hot.accept();
}

```