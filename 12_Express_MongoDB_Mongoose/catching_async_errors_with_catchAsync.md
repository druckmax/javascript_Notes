# Catching Errors in Async Functions with Wrapper Function

Instead of needing to wrap every one of our controller functions in a try-catch block, we can wrap the function itself in anotther function, which only takes care of the error handling in async functions. This helps to drastically reduce bloat in our code and let's us follow the DRY principle.

After we wrapper our controller function in the catchAsync function, which receives the controller function as an argument, catchAsync will return another anonymous function, which will be assigned to the controller handler and gets access to req,res and next. This is also needed, because without the returned anonymous function, we would immediately call the controller function with catchAsync, which is not what we want.

So it is the returned anonymous function that is called when a new tour, for example, is created. Therefore it also gets access to req, res and next. Inside this function we then call our actual controller function (fn). Since this controller function is asynchronous, it will return a Promise, which is why we can simply add a catch handler to it.

Note: <code>.catch(err => next(err))</code> is the same as <code>.catch(next)</coe>

```js
// Function name is catchAsync
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
```
