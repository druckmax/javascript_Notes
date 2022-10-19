# Signup with JSON Web Tokens

Signup with JWTs is relatively straight forward. First we need to import the jsonwebtoken package from npm in order to create tokens. We create function called signToken, which takes an id as an argument. Inside this function we call the sign method on the jwt module.

The first argument takes the payload, which is basically an object for all the data we want to store inside of the token. In our case it is only the id of the user.

The second argument consists of the secret. A good place to store this is in an environment variable. In our case the secret looks like this:

```
JWT_SECRET=this-is-a-secret-secret0for0the0secret
```

As a third argument the function takes an options object. In our case we set an expiration date in the environment variable. After the specified time the token will be no longer valid. In our case we set it to 90 days:

```
JWT_EXPIRES_IN=90d
```

Note: When we do not pass an callback to the sign() function, it will run synchronously, otherwise it will become an asynchronous function.

Now we can create a signup function, which creates a user document from the User schema. Hence we create this document with the data coming from the request body.

#### IMPORTANT:

It is a security hazard to create documents with just .create(req.body), since this allows anybody to log into our database. It is best practice to create a document with just the data we really need. Instead of passing in the whole request body, we pass an object and create just the keys that are essential and pass the according data from the request body. Note that this prevents anybody from registering as an admin. But we can use MongoCompass for example to manually give a newly created user admin permissions.

After creating the user document, we create the token by calling our signToken function and passing in the user.\_id.

Finally we can send back a response which holds the token, which then can be used in order to login immediately.

```js
const jwt = require("jsonwebtoken");

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  // SECURITY HAZARD: Anyone could basically log into our database as an admin
  // const user = await User.create(req.body);
  // FIX: With this code we make sure to only allow the data that we actually need
  // This prevents from register as an admin. To do so we create a new user, but need to edit the role in MongoDB Compass for example.
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(user._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});
```
