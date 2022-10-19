# Login

In order to implement the functionality of users logging in, we need to export a login function, which will be passed as a controller in the post method of the '/login' route.

This function can be separated into 3 steps:

1. Checking if the email and password exist
2. Check if the user exists and if the password is correct
3. Send the token back to the client

```js
const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  // 2. Check if the user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  // 3. If everything is ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
```

In the first step we check if we the value for email and password coming from the request body is not existant and then send a new AppError to the global error handling middleware.

In the second step we retrieve the user based on the email. We also need the password to check if it is correct. Since we manually set select: false in the password field in the schema, so it does not get sent back in our responses, we have to select it again. We can do this by manually selecting the field again with the select method and by putting a + sign before in the string, which is the name of the field. The + sign is needed for fields that are by default not selected.

In order to compare the password coming from the client with the hashed password that is stored in the database, we can use bcrypt to hash the incoming password again. We therefore create something called an intance method on the userSchema. This method will be available on all documents of collection related to its schema/model. We pass in the candidatePassword, which is the password in the request body, which will then be compared to the password of the current document (this.password). In order to do so we can conveniently use the compare of method of the bcryprt package. We only get access to this.password because we previously selected it again with .select('+password').

```js
userSchema.methods.correctPassword = async function (candidatePW) {
  return await bcrypt.compare(candidatePW, this.password);
};
```

In case if you are wondering why we can simply create the same hash from a password and compare it to with the encrpyted one, if it is uniquely salted: The salt is appended to the ahsed password, so if we call compare() on it, bcrypt will extract the salt and use it to hash the incoming password of req.body.

Now we can call the correctPassword method on the user and we do this inside of our if else statement which checks if the user does not exist first. The reason for that is, that if we put it outside of the if statement after the user like this,

```js
  const user = await User.findOne({ email }).select('+password');
  const correct = await user.correctPassword(password))M
```

we get an error if the user cannot be found and returns undefined. So we can simply put it in the condition of the if statement and return an error if the user OR the password is undefined / incorrect. So only if the user exists the right hand side of the logical or operator will be executed.

In the last step we create a token with signToken, which uses the jwt.sign() method, and simply send it back to the client.

```js
const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
```

\*/
