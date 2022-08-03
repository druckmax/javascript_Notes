# Configuring Babel and Polyfilling

Even many years after the intoduction of the new ES6 standard, it is still a necessity to make your code compatible with older machines and browsers. This is where Babel and Polyfilling come into play, which convert modern ES6 code back to ES5 compatible code. Parcel, for example, automatically uses Babel to transpile our code, but of course there are a lot of options for individual configurations, which makes Babel a diverse but also very complex tool.

### Babel: A Broad Overview

Babel works with Plugins and Presets, that can be configured. A plugin represents a specific Javascript ES6 feature. This feature can then be transpiled to ES5. For example, we could choose to only convert arrow functions back to ES5, but leave everything else in ES6. Usually this does not make a lot of sense, since we want to transpile everything at once. So instead of using single plugins, Babel uses presets, which bundles several plugins together. Parcel uses a preset called "preset-env". This preset will automatically select which Javascript features should be transpiled based on browser support. Babel will convert all features of ES6, which are final feature and already a part of the language, meaning passing the four stages of the AGMA process, back to ES5, except for those browsers, which hold a marekt share of less than 0.25% and basically are not used anymore.

But Babel has some limitations, since it can only transpile ES6 syntax, like arrow functions, classes or the spread operator, because there is an equivalent way of writing them in ES5. When it comes to new ES6 features like the find method or promises, there is no equivalent way of writing them in ES5, which is why they cannot be transpiled by Babel. This leads us to polyfilling.

### Polyfilling

For the features that cannot simply be transpiled by transcompilers like Babel, we can use polyfilling. We also say that we need to polyfill these new features. A polyfill is a piece of code used to provide modern functionality on older browsers that do not natively support it.

Babel used to do polyfilling out of the box, but recently started to recommend another library, which needs to be installed and imported manually. This library is called **'core-js'**. Usually we only want to import a part of that library, which is '/stable'.

```js
import 'core-js/stable';
```

When using this library for polyfilling, it is important to note that it will polyfill everything and not only the code that is used in the project. For example, all the new array methods, that cannot be transpiled by Babel, will be polyfilled, no matter if we use it or not. This leads to a lot of additonal code. There is a way to cherry pick only the features that are being used in our code, but, of course, this involves a lot of work, but on the other hand can decrease the bundle size dramatically.

#### Polyfilling async functions

Core-js has its limitations regarding async functions, which is why we need to install and import another package called **'regenerator-runtime'**. Regenerator-runtime is the runtime support for compiled/transpiled async functions. It may well have other uses, but this is the predominant one.

```js
import 'regenerator-runtime/runtime'
```