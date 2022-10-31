# Nested Routes Using mergeParams

## Create new review on tour route

In this example we want to be able to write a review while being on the tour route, so that a logged in user can write a review, without passing his user credentials as well as the ID of the tour. The userID comes from the req.user property we define in the protect route and the tourID will be stored inside the URL.

```
{{URL}}api/v1/tours/:tourId/reviews
```

We also want to avoid calling the createReview controller from the tourRouter, because this results in the loss of our nice separation of logic and creates duplicate code. So instead of creating a separate route in the tourRouter like this, ...

```js
router
  .route("/:tourId/reviews")
  .post(protect, restrictTo("user"), createReview);
```

... we mount the reviewRouter inside of the tourRouter and create the desired route:

```js
const reviewRouter = require("./reviewRoutes");

router.use("/:tourId/reviews", reviewRouter);
```

In order to get access to the :tourId inside our reviewRouter we pass an option to the express.Router() function, which is called mergeParams and and set it to true.

```js
const router = express.Router({ mergeParams: true });
```

Lastly we need to configure our reviewController to account for the case that we want to write a review from our new nested route.

```js
exports.createReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  // req.user comes from protect middleware
  if (!req.body.user) req.body.user = req.user.id;

  const review = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});
```

## Get all reviews on tour route

In order to get all the reviews belonging to a ceratin tour, which is specified in the URL, we just need to adjust our getAllReview controller. First we initialize an empty filter object. Then we check if we get any data from the req.params.tourId object. If so we pass in this information to the filter object. Lastly we pass the filterObject to our find method on the Review model. An empty object will always retrieve all the reviews, which is the case if we are calling the getAllReviews controller regularly. The filter object will cause to retrieve only the reviews for the specific tour, which is defined in the req.params.

```js
exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: { reviews },
  });
});
```
