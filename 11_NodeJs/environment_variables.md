# Environment Variables

NodeJS apps can run in different environments. The most important ones being the development and production environment. Depending on the environment we might use different databases or we activate or deactivate login or debugging.

By default Node sets the environment to development. Since the environment variables are outside of the scope of express, we usually define them in server.js and not app.js, which is should be scoped to the express application.

We can use environment variables like configuration settings for our applications. Whenever our app needs some configuration for things that might change based on the environment, we use environment variables. Hence we can create a config.env file. The name is a common convention and VsCode automatically recognizes this file as a config file. Another convention is that environment variables only consist of uppercase letters.

Environment variables or the config.js file need to be read only once. After that they are available in every file of the running application without the need to specifically import them. This is because the variables are saved in the process and inside the application we are always in the same process.

In order to read this config.env and save it into NodeJs' environment we can use a package called dotenv. Make sure that requiring the package and reading from the config.env happens before the requiring of the app.js in the server.js file.

```js
const dotenv = require("dotenv");
dotenv.cofig({ path: "./config.env" });
```

Based on the environment we can now configure our code to run the morgan logger only when the environment is set to development for example.

```js
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
```

Another example is that we define our port based on the environment variable PORT. If this variable is not available we set the port manually.

```js
const port = process.env.PORT || 5000;
```

We can switch environments easily by defining a separata script in the package.json file.

```json
"scripts": {
  "start:dev": "nodemon server.js",
  "start:prod": "NODE_ENV=production nodemon server.js"
}
```
