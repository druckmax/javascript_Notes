# Aggregation Pipeline

MongoDB's aggregation pipeline is a powerful tool for data aggregation, which means combining data from multiple sources, processeing the data for new insights and presenting them. Through data aggregation statistics such as average, minimum, maximum, sum and count can be provided. The idea is that we define a pipeline that all documents from a certain collection gothrough and where they a processe step by step in order to transform them into aggregated results.

In order to implement such a pipeline, we create an async function and await the aggregate object coming from the aggregate method, invoked on the 'Tour' model, in order to access our tour collection.

Inside the aggregation method we pass in an array of so-called stages. Every array element will be one of the stages. The documents of the collection then pass thtrough these stages one by one, step by step in the defined sequence of the array. We define a stage by passing object to the array, containing a field prepended by a $-sign. A stage looks and behaves very smiliar to a regular query.

Some very popular stages are \$match, which is like a filter in order to select documents, and \$group, which helps us grouping documents together using accumulators. We can calculate average values with group, for example. The first thing we need to pass in to the \$group stage is an \_id, in which we specify what we want to group by. For example, if we pass in the difficulty, $group will group the documents based on their difficulty value. If we want to calculate a value for all the documents and not seperated by groups, we can simply pass null to the \_id.

In order to calculate the averageRatings, we define a new field and give a meaningful name. Then inside the field we pass in another object and use the \$avg operator, which is a mathematical operator of mongoDB. When using these mathematical operators the values that we take for the operations must be in quotation marks and be prepended by a \$-sign.

```js
$avg: "$ratingsAverage";
```

To calculate the sum of all the documents, we use the $sum operator and simply pass in one, so one for every documents that goes through the aggregation pipeline.

If we want to sort our grouped calculations, we can add $sort stage. It is important to note that now we must use one of the fields defined in the group method, since the old fields do not exist in our stats object anymore.

We can also repeat stages. This means we could add another \$match stage after $sort, for example if we wanted to exclude all the documents that have the difficulty of easy:

```js
{
  $match: {
    _id: {
      $ne: "easy";
    }
  }
}
```

In order to access these statistics, we simply create a new route in the tourRoutes and send JSON object from the controller to the client.

```js
exports.getTourStats = async (req, res, next) => {
  try {
    const stats = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: "$difficulty",
          numTours: { $sum: 1 },
          numRatings: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      { $sort: { avgPrice: 1 } },
      // Excluding all tours with difficulty easy
      // { $match: { _id: { $ne: 'easy' } } },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
```

## BUSINESS EXAMPLE

In this example we assume that the company we build the website for wants a tool in order to calculate the busiest month of a given year, in order to prepare accordingly for these tours. This is why we implement a function to calculate how many tours start in each month in the given year. In our data we have the starting dates defined in an array. So what we need to do is to create one document for each of these starting dates.

In order to do this we use the unwind stage. This stage is basically deconstructing an array field and thenoutput one document for each element of the array.

In the next stage we use match so that we can select all the documents with the given year, which we pass in as a param to the route. This is why we define the range with $gte and $lt, passing in a new Date object with the first and the last day of the year.

Now we want to group the tours by the month of startingDates. In order to do this we can make use of the \$month aggregation line operator. This operator will comfortably extract the month from a Date object or a Date ISO string. Now we can count the documents with \$sum and passing in 1, which adds 1 for every document to the sum. If we also want to display the names of the thours of the given months, we can use the $push operator, which creates an array and pushes the name of each tour into it.

If we want to create a new field with a more meaningful name, we can make use of the \$addFields stage and set the \_id to new field called month. To get rid of the id, we can use the \$project stage and set \_id to 0.

Finall we can sort by the number of tour starts in the \$sort stage.

```js
exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      { $unwind: "$startDates" },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          numTourStarts: { $sum: 1 },
          tours: { $push: "$name" },
        },
      },
      {
        $addFields: { month: "$_id" },
      },
      { $project: { _id: 0 } },
      { $sort: { numTourStarts: -1 } },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
```
