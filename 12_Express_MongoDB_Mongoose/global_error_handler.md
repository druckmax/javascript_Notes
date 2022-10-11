# Global Error Handler

In order to initialize a global error handling middleware, we simply need to give the middleware four arguments in the following order: error, request, response and the next function. We retrieve the error's statusCode and status from the error object, but also set a default value wit the logical or operator. A convention for the default values is to set statusCode to 500 (internal server error) and the status to 'error'.

In order to create an error we can simply create a new Error object with the new keyword. The text we put into the parantheses of Error will be the error.message property.
Afterwards we set manually set the status and statusCode, so that the error handling middleware can use it. In order to pass the error to the error handler, we use the next function and pass the error object into it. Whenever we pass something into next, Express will assume that it is an error and it will skip all the other middleware functions in the stack sent the rror right to our global error handling middleware, which then will be executed.

```js
// CREATING AN ERROR
const err = new Error("Cannot find route");
err.status = "fail";
err.statusCode = 404;
next(err);
```

```js
// GLOBAL ERROR HANDLER
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

//---------------------------------------------

app.use(globalErrorHandler);
```
