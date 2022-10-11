# Outsorcing Query Operations

We create this class in order to outsource the code that handles the query operations.
We pass in mongooses's query object and the queryString, which is what we get from req.query, so basically the URL. The way we create a query object is by creating a query with Tour.find(), but not executing the query right away, so not using await on it. By doing this we end up with a query object onto which we can then chain other methods, such as sort, anothter find etc. In order for chaining to work we must return something from the methods, which is the whole object, therefore we return 'this'.

Keep in mind that inside the class this.query is the query object we created in the beginning. It is like having:

```js
Tour.find().find(JSON.parse(queryStr));
```

Since the has not yet executed, it did not return the actual results yet. We do this in the end, which is the reason why we have to use to:

```js
const tours = await features.query;
```

We bring the query operations into the class, put it in a method, change all the req.query instances to this.queryString, and query to this.query.

This whole procedure makes it very easy for us to implement the functionalities of the methods in this class for any other routes, for example users. Also it makes it modular, so that we can simply omit the features we do not need in other routes.

```js
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    // Return the entire object in order for chaining methods to work
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
```

## Executing The Query

In summary: We are creating a new object out of the APIFeatures class. In there we are passing a queryObject and the queryString that is coming from express. In each of the four methods we chain onto the object, we manipulate the query. By the end we simply await the result, so that it can come back with all the documents that we selected. This query now lives at features, which is the new object we created.

```js
exports.getAllTours = async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await features.query;
  // Sending JSON back and format it according to Jsend specification
  // Additionally adding results key which holds the length of the tours array as an extra
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
};
```
