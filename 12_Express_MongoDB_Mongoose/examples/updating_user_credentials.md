# Updating User Credentials

In this example we differntiate between two types of credentials:

1. Sensitive data (passwords)
2. Insensitive data (name, email)

For that we create two different functions as well as two separate routes. Note that all of the following operations assume that the user is already logged in. Before each of the controller function, the protect middleware needs to run. This is also why we have acccess to the req.user property, which we set in the protect middleware.

## Updating sensitive data

For updating sensitive data we create a function in our authController.js file and call it updatePassword. It consists of four steps:

1. Get user from collection
2. Check if incoming password is correct
3. Updating the password
4. Log user in / Sending JWT

```js
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. Get user from collection
  const user = await User.findById(req.user.id).select("+password");
  // 2. Check if POSTed password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent)))
    return next(new AppError("Your current password is invalid.", 401));
  // 3. If password correct, update password

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // 4. Log user in, send JWT
  createSendToken(user, 200, res);
});
```

## Updating insensitive data

For updating other credentials like username or email, we create a route and a controller in the userController.js file. It consists of three steps:

1. Create error if user tries to change the password / req.body contins password information
2. Filter out unwanted field names that are not allowed to be updated
3. Update the user document

Since we have a separate controller and route for password credentials, we first need to check if req.body contains any information about the user's password. If that is the case, we want to return an error.

Next we want to manually determine for which fields this function should work. Therefore we filter out all the fields that are not allowed. We create a separate function called filterObj, which takes an object, in our case req.body, and spreads the rest of the arguments into an array called allowedFields. Now we loop through the keys of the object with forEach and for check for each key if it is present in our allowedFields array. If this is the case we save the valid key-value pairs to a new object, which then will be returned from the function.

We call this function with req.body and specify the valid object keys and save the result to a new variable called filteredBody. Now we can update the user based on the valid key-value pairs via findByIdAndUpdate. We get the user via the id on req.user and pass in the filtered body object. In the options parameter we set new=true to tell the function that it should return the updated object and not the old one. We also want to run the validators again, hence we set runValidators to true.

Lastly we send a response containing the updated user.

```js
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route is not for password updates", 400));
  }
  // 2. Filter out unwanted field names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");
  // 3. Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
```
