# Geospatial Queries

In this example we want to make use of geospatial queries in order to implement a search functionality witin a certain distance of a specified point.

As a first step we create new route called /tours-within, which expands using multiple parameters. This is an alternate way for writing query strings and has become kind of a standard right now. So instead of the following query string:

```
tours-within?distance=123&center-40,45&unit=mi
```

We get something like this, which results in a cleaner look.

```
tours-within/123/center/-40,45/unit/mi
```

As for the parameters we need the distance or the radius, a center parameter which defines the location of the user and the unit, which will be either miles or kilometres. So our finished route looks like this:

```js
router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(getToursWithin);
```

In the next step we create the controller function for this route. At first we destructure the different parameters from the req.params object into distance, latlng and unit. Then we destructure the latlng property into the individual latitude and longitude properties. We simply do this by splitting the value by the comma sign.

After a provisional guard clause for a wrong format of the latlng value, we want to find all the tours filtered by the startLocation of the tour. That is because the start location field is what holds the geospatial point where each tour starts.

In order to specify the value we are searching for we make use of mongoose's geospatial operator called geoWithin. geoWithin basically finds documents within a certain geometry, which we need to define. We want to find the tours within a sphere that starts the point we specified and which has a radius of the distance, which we specified. We start by defining a center sphere inside geoWithin, which takes an array of the coordinates and of the radius. The coordinates must be in another array and we start with the longitude and then pass in the latitude, which is counterintuitive and can be confusing.

In order to define the radius, we cannot simply put in the distance, because mongoose expects a radius in a special unit called radians. In order to convert our distance value, which basically is the radius we need, we need to divide it by the radius of the earth. And we need to do it once for our unit of miles and kilometres.

```js
// '/tours-within/:distance/center/:latlng/unit/:unit'
exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  // Dividiung the distance by the radius of the earth, needed for radiants unit mongoose uses in the $centerSphere method
  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitude and longitude in the format "lat,lng"',
        400
      )
    );
  }

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      data: tours,
    },
  });
});
```

Now it is a good idea to add an index to the field where the geospatial data is stored. In our case we add an extra index to the startLocation. The startLocation field inside the index needs to be set to the value of '2dsphere'. This 2dsphere index needs to be set if the data describes real points on the earht-like sphere. The indexing is not necessarily needed anymore in order for the geospatial operators to work, but it comes with a great increase in performace when querying geospatial data.

```js
tourSchema.index({ startLocation: "2dsphere" });
```

Note: A nice feature of mongoDB Compass is that geospatial data is represented on a map when analyzing the schema of a collection.
