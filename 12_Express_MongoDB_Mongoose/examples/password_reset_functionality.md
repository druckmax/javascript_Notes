# Password Reset Functionality

A password reset functionality is a standard for most web applications. The process consists of the following steps:

1. The user sends a post request to a forgot-password route only with his/her email address. This will create a reset token. We do not need a special JWT token for this, a plain randomly generated token is enough for this use case.
2. Sending the token to the user via nodemailer
3. Resetting the password: The user sends that token from his/her email along with a new password in order to update the password.

## 1. Get user email, create and save token.

```js
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('No user found', 404));

  // Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  ...
  ...
  ...
});
```

First we get the user's email which we get from the clients post request. We define a special route for that called /forgotPassword. Via <code>User.findOne</code> we retrive the user who matches the email and we make a check whether the user exists. Now we need to create a password reset token which is preferrably done on the schema since it has to do with the user data itself. This way we can again separate logic according to the MVC-architecture.

Hence, we create an instance method on the schema named createPasswordResetToken. The password reset token basically should be a random string, but does not need to be as cryptographically strong as the password hash we created before during authorisation. Therefore we can use the randomBytes function from the built-in crypto module. Don't forget to convert it to a hexadecimal string in the end. This token is the one that is sent to the user via email and acts like a temporary password.

Of course we need to be able to compare the password when the user's password should be changed, so we need to store it somewhere in our database. Now just with passwords we should never store a plain reset token in our database as a security measure. We need to encrypt it. Again, this does not need such a strong encryption like the JWT, so we can agaian use the built in crypto module. First we create a hash with the sha256 algorithm, we save it via the update function which points to the token we want to encrypt, and then finally we convert it to hexadecimal again. In order to store the reset token, make sure that you have created the corresponding field on the user model.

Additionally we create another field called passwordResetExpires, which is a Date object and sets an expiration date for the reset token as an additional security measure. In our case we set it to 10 mins.

```js
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
```

Now back again to our authController: We call the createPasswordResetToken function and generate a new token on the user instance. Remember all instance methods are available on all documents afterwards.

What we did in the createPasswordResetToken function in relation to the database(<code>this.passwordResetToken</code> and <code>this.passwordResetexpires</code>) is actually just modifying the data. We did not save anything yet to the database. So in order to update our data we await user.save().

Now just by doing that we get an because we do not sepcifiy all of the mandatory data in order to save a document to the database, so the fields that we marked as required. Therefore we need to pass a special option object to the save method, which is validateBeforeSave and is set to false and will deactiave all the validators which we deined in our schema.

## 2. Sending the token to the user via nodemailer

In order to send our generated token to the user we use a popular solution called nodemailer. First we create a new file in our utils folder called email. We require the nodemailer package and set up a function which consists of three steps.

#### 1. Create a transporter

First we need to set up a transporter, which defines which email service. It is not a good idea to use a private email provider like gmail for a production application, because we can only send 500 emails a day and could be quickly be marked as a spammer. More suited services are SendGrid and Mailgun. But for now we just use a special development service called mailtrap, which fakes sending emails to real addresses. These emails will be trapped in a development inbox so that we can take a look at how they will look later in production.

#### 2. Define the email options

Now we define the mail options, where we set where the email is coming from and where it is sent to and what the subject and text fields are. The data regarding to, subject and text we get from the options argument, we later pass into the function. Additionally we can convert the text to html, but this is optinla.

#### 3. Send the email with nodemailer

Finally we call the sendMail method on the transporter and pass in the mail options. This function works asynchronously, so we have to await it and mark the parent function as async.

```js
const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: "Max Sommerfeld <hello@max.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html: convert your text to html here, optional
  };

  // 3. Send the email with nodemailer
  await transporter.sendMail(mailOptions);
};
```

Back in our controller we define a custom resetURL which holds the reset token. In this example we also set the protocol and the host dynamically for a later flexibility when switching development and production environments.

In the next step we define a message that will be sent in the email.

Now we actually want to call our sendEmail function and pass in the user email, the subject and the message we just created as an options object. We wrap the function in a try catch block since it is an asynchronous function, but especially because this time we want to add further steps if an error appears and not just solely forward to the global error handler. In case of an error we want to reset both the passwordResetToken and the passwordResetExpires fields, hence we can set them to undefined. Again just modifying the data is not enough, we need to save it to the database, so again we can await user.save and pass in the option to ignore the validation for this save.

In the next step we can create a new AppError and forward it to the global error handler.

If everything worked correctly, we can now send a response of 200, just holding the success status and sending a message.

```js
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('No user found', 404));

  // Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you did't forget your password, please ignore this eamil! `;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 mins)',
      message,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passworResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending the email!', 500));
  }

  res.status(200).json({
    status: 'success',
    message: 'Token sent to email!',
  });
```

## 3. Resetting the password

In the last step we want to finally reset the password and update it with the new password provided. But first we create a new route called <code>/resetPassword/:token</code> and set it up for a PATCH request referring to the resetPasswort controller.

The rest of the implementation consists of 4 steps:

1. Get the user based on the token && check if the token has not yet expired
2. Set the new password
3. Update changedPasswortAt property for the current user
4. Log in the user with a new JWT

```js
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on token and check of the token has not yet expired
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passworResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // 3. Update changedPasswordAt property for the user as a middlware on schema
  // 4. Log the user in, send JWT
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
```

#### 1. Get user based on token && check if token has not yet expired

We need to compare the token we get in <code>req.params.token</code> with the one we store in our database. But the incoming token is not encrypted while the one in our database is. To solve this issue we can simply hash the incoming token again with the same methods we used for the one in our database.

This allows us to find the user based on that token. Inside the <code>User.findOne()</code> method we can simultaneously check that the token hast not yet expired, by verifying that the passwordResetExpires property is not greater than the timestamp of the current time.

#### 2. Set the new password

Next we make a quick check whether there is actually user, and if so, we can set the new password coming from the request body. We also set the fields concerning the reset token and its expiration date to undefined and await <code>user.save()</code>. Not that in this case we actually want to run all the validators again and make sure the password and passwordConfirm keys are the same, so we do not pass in the option to disable the validators.

#### 3. Update changedPasswortAt property for the current user

In order to change the changedPasswordAt property of the document, we create another middleware function in our schema.
It is important to note that we do not want a passwordChangedAt property for newly created documents, which is why we set <code>this.isNew</code> as another condition in the if statement. So only if the password field has been modified and the document is not newly created, we want to run our middleware.

When setting a new timestamp we need to account for the fact that sometimes the token is created a bit before the changed password timestamp has been created and might result in the user not being able to log in with the new token. In our application this is the case, because we use the timestamp to compare with the JWT timestamp to see if the user changed the password after the token was issued.

This can easily be solved with subtracting 1000ms from the current timestamp, so setting it just a bit in the past to account for any creation time differences of the token and the timestamp.

```js
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
```

#### 4. Log in the user with a new JWT

Lastly we can log in the user again by creating a new JSON Web token and sending it in the respone.
