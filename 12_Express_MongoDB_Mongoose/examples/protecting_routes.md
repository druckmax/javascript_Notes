# Protecting Routes

In this example we will implement protected routes using the created JSON Web Token in order to give logged in users access to protected content.

We want only grant logged in users the permission to use the getAllTours route. In order to do so we can use a middleware function in the route handler, which checks if the user is logged in before calling the controller function of the route.

The middleware, which we call protect, consists of 4 steps.

1. Check if the token exists
2. Validate the token (Verification)
3. Check if the user still exists
4. Check if user changed password after token was issued

```js
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.protect = catchAsync(async (req, res, next) => {
  //1. Check if token exists
  let token;
  if (
    req.headers.authorization &&
    req.header.authorization.startsWith("bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token)
    return next(
      new AppError("You are not logged in. Please log in to get access", 401)
    );

  //2. Validate the token (Verification)
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3. Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("The user does no longer exist", 401));
  }
  //4. Check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password. Please login again!", 401)
    );
  }
  // Grant access to protected route + save current user to the request object
  req.user = currentUser;
  next();
});
```

## 1: Check if token exists

A common practice is to send a token using the http header with the request. A standard in doing so is naming the header 'authorization' and starting the value with 'bearer' for bearing or possesing the token.

```js
"authorization": "bearer <token comes here>"
```

Now if there is a header called authorization and if that header starts with 'bearer' we extract the token from the value string and assign it to the token variable.

After that we again check if there is a token and if not we send a new AppError to the global error handling middleware.

## 2: Verification

It is time to verify the token and check if someone tried to manipulate the data (changing the token's header or payload) or if the token has already expired. In order to do this we can use the verify function of jwt package. With the aim of not breaking the pattern of using async await, we first need to promsifiy the jwt.verify function, which acts synchronously if no callback is passed to it. So we need it to return a promise. We can use the promisify function from node's built in utils package. The syntax is a little bit weird since promisify wraps around only jwt.verify and the arguments are passed after the closing parantheses of the promisify. The returned promise can be awaited and holds the decoded data, the decoded payload to be more precise, of the JSON Web Token.

If the verification is successful we get back an object holding the user id, amongst other information like the time stamp of the creation date and the expiration date.

```js
const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
```

The alternative way of using the callback would look like this:

```js
const decoded = await jwt.verify(
  token,
  process.env.JWT_SECRET,
  {}, // passing an empty options object to get to callback
  (err, value) => {
    if (err) {
      return next(new AppError("Error", 401));
    }
    return value;
  }
);
```

#### Error Handling:

To account for JsonWebTokenErrors in our error handling behaviour in the production environment, we add a new condition in our global error handler:

```js
const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please login again.", 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if ((process.env.NODE_ENV = "development")) {
    sendErrorDev(err, res);
  } else if ((process.env.NODE_ENV = "production")) {
    // Make shallow copy of the error, because it is considered bad practice to mutate a function's argument
    let newError = { ...err };

    if (newError.name === "CastError") newError = handleCastErrorDB(newError);
    if (newError.code === 11000) newError = handleDuplicateFieldsDB(newError);
    if (newError.name === "ValidationError")
      newError = handleValidationErrorDB(newError);

    if (newError.name === "JsonWebTokenError") newError = handleJWTError();
    if (newError.name === "TokenExpiredError")
      newError = handleJWTExpiredError();

    sendErrorProd(newError, res);
  }
};
```

## 3: Check if user still exists

To account for the scenario that the user has been deleted during the time the token is still valid, we check if the user still exsists in the third step as an extra safety net. We therefore find the user by its id, which we can retrieve from the 'decoded' object.

```js
const currentUser = await User.findById(decoded.id);
if (!currentUser) {
  return next(new AppError("The user does no longer exist", 401));
}
```

## 4: Check if user changed password after token was issued

The same is true for the fourth step where we check whether the user recently changed the password after the token was issued. For that we create another instance method on our schema which will be available on all documents. Also we need to make sure that we have another field on the schema with the name of passwordChangedAt with the type of Date. This field will be created and updated later, whenever the user changes the password.

Inside the instance method we call changedPasswordAfter, we pass in the JWT timestamp as an argument we have access to in our decoded object from validation. Now we check if the passwordChangedAt field exist on the current document. If it exists this means that the user has changed the password before.

Now we can convert the Date object of this field to a timestamp and divide by 1000 to get the unit of seconds, since the timestamp of validation object ('decoded') is in seconds.

Finally we compare if the JWT timestamp is smaller than the changedTimestamp, meaning that if the changedTimestamp is bigger the password has been cahnged after the token was issued.

As a last step outside of our condition we want to return false by default, meaning that the user has never changed the password before.

```js
userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};
```

Now we can call the instance method in the 'protect' middleware and pass in the JWT timestamp which we find in 'decoded.iat'(iat means issued at). If it returns true we want to issue another app error.

```js
if (currentUser.changedPasswordAfter(decoded.iat)) {
  return next(
    new AppError("User recently changed password. Please login again!", 401)
  );
}
```

If the code manages to travel through this series of protection, we can finally call the next() method and forward the request to the controller. Before that it useful to safe the currentUser to the request. We can create a new property for that, which we call user.
