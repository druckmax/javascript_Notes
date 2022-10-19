# JSON Web Tokens: JWT

There are many authentication methods out there, but the one we are using is a stateless solution called JSON Web Tokens(JWT). There is no need to store any session state on the server, which is perfect for restful APIs, which should always be stateless. A widely used alternative to JWT is to store the user's log-in state on the server using sessions.

A JWT is like a passport to access protected parts of the application. Assuming we already have registtered user inour database, the user's client starts by making a post request with the username/email and the password. The application then checks if the user exists and the password is correct, then a JWT for only that user is created using a secret string that is stored on the server. A JWT is basically just a string, which is sent back to the client, who will store it either in a cookie or local storage. The server does in fact not know which users are currently logged into our application, leaving no state on the server. Storing the secret key on the server does not make the process stateful, because stateful would mean that the server has to remember information about the previous request, which is not the case.

Each time the client wants to access a protected route, like his user profile, he sends his JWT along with the request to the server. The application running on our server will then verify if the JWT is valid. If so, it will send back the requested data. Otherwise an error message will be sent. As long is the user logged in this is how it is going to work each time that the user request data from a protected route.

It is important to note that all this communication needs to happen over a secured https connection in order to prevent anyone from gaining access to passwords or tokens.

![jwt-overview](../images/jwt-overview.png)

## What JWT Looks Like

![jwt-structure](../images/jwt-structure.png)

A JWT essentialy is an encoding string made up of three parts:

Encoded, but not encrypted:

1. Header: Holds metadata about the token itself
2. Payload: Holds the data that we can encode

Encoded and encrypted:

3. Signature: Created using header, payload and secret from server and holds sensitive data

The first two parts are just plain text that will get envoded but not encrypted. This means that anyone can decode and read them, which is why we cannot store any sensitive data in them.

Storing sensitive data is the job of the signature, which is created using the header, the payload and the secret that is stored on the server. This whole process is called signing the JSON Web Token.

Once the server receives A JWT to grant access to a protected route, it needs to verify it in order to dermine if the user really is who he claims to be. This verification setp will check that no third party altered either the header ot he payload of the JWT. As soon as the JWT is received, the verification will take its header, payload and secret and create a test signature. This test signature can now be compared to the originial signature stored in the incoming JWT.

If the the test signature is the same as the original signature then this means that the payload and the header have not been modified, so we can safely authenticate the user.

Without the secret stored on the server, no one will be able to manipulate the JWT data, because they cannot create a valid signature for the new data. SOmeone could manipulate the data of course, but it will always fail during verification.

![jwt-how-it-works](../images/jwt-how-it-works.png)

## JWT in Practice

```js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

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

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});
```

```json
JWT_SECRET=this-is-a-secret-secret0for0the0secret
JWT_EXPIRES_IN=90d
```

In this example we want to implement the functionality that the user can be immediately logged in as soon as the account is created.

After installing jsonwebtoken from npm, the first method we will use is the sign method, which accepts the payload as the first argument, which is represented as an object. In our case we only want the ID of the user.

The second argument represents the secret, which will be a string. The perfect place for storing those secrets is our .config.env file. Remember that with a HSA 256 encription our secret should be at least 32 characters long, but the longer the better ;).

As a third argument the method accepts a options object. In our case we want to add an expiration date for the token. This is needed for the functionality of logging out a user after a certain period of time, simply as a security measure. Again we can store this information in our environment variable. The option accepts values such as 90d for days, h for hours, m for mins and s for seconds. In our case it is set to 90 days.

Now we can add the token in our response object, in order to acheive that the newly created user can immediately be logged in. In order to do so the client needs to store the taken in a cookie or local storage, of course.

In case you wondered where we put the header: the header will be created automatically.
