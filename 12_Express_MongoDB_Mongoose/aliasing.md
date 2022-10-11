# Aliasing

Here we create our own custom middleware, which will be used for the /top-5-tours route. This way we can make a custom route, which handels some search results that are often requested or we'd like to offer the client.

By using the middleware, we can prefill the query object with some properties, which then will be handled in the getAllTours controller function. So we can call the getAllTours function from our new route, but by putting a the alias middleware before it, we configure the query object to filter our results, even if the user does not pass in any queries by him-/herself.

```js
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

router.route("/top-5-tours").get(aliasTopTours, getAllTours);
```
