# Geospatial Queries and Aggregation

## Geospatial Queries

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

## Geospatial Aggregation

In this example we want to create geospatial aggregation to calculate the distances to the start location of all tours from a certain point.

```js
router.route("/distances/:latlng/unit/:unit").get(getDistances);
```

The tour route will contain the latlng and unit parameter. We do not need to define a certain radius, because in this example we want to calculate the distance to all the tours we have, since there are so few.

```js
exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  const multiplier = unit === "mi" ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitude and longitude in the format "lat,lng"',
        400
      )
    );
  }
  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: "distance",
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      data: distances,
    },
  });
});
```

The structure of our controller function resembles the previous geospatial query function. In order to do calculations we always need the aggregation pipeline first, which is called on the model itself. We await this aggregation and save it into a variable called distances. The aggregation pipeline takes an array of all the stages we want to define.

For geospatial aggregation there is only one single stage which is called $geoNear and in order for it to work it needs to be the first one in the pipeline. So make sure that you don't have any other aggregation pipelines active: In our example we simply comment out our aggregation middleware for filtering out the secret tours.

Another requirement of $geoNear is that it needs at least one of our fields to have a geospatial index. Unlike with geospatial queries using $geoWithin it is not just a performance benefit to have a geospatial index. So make sure you have the '2dsphere" index set on the startLocation field of the tour model. If there is only one field with a geospatial index, the $geoNear stage will automatically use this index in order to perform the calculation. If you have multiple fields with geospatial indexes the keys-parameter is required to define the field you want to use for this calculation.

The first property we pass in to $geoNear is 'near', which defines the point from which the distances are being calculated. We set the type to 'Point' to define this point to GeoJSON and pass in our coordinates, again with the longitude coming first followed by the latitude. In order to convert the coordinates into numbers, we mulitply each property by 1.

The second property of $geoNear is the distanceField property, which defines the name fo the field that will be created and where the calculated distances will be stored.

With these two properties set, the distance calculation already works, but the result will be in meters, which is why we need to convert it to kilometres and miles. We can do this in the third property, which is called distance multiplier. To account for the different units we create a new variable that converts the resulting metres into kilometres or miles.

```js
const multiplier = unit === "mi" ? 0.000621371 : 0.001;
```

As a second stage we call $project in order to filter out all necessary fields. We are just interested in the distance and name fields, which is why set them to one in the $project stage.
