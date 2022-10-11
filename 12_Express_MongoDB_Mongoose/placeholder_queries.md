```js
exports.getAllTours = async (req, res) => {
  try {
    // 1a) FILTERING
    // Added argument for query search, classic mongoDB way
    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy',
    // });
    // Mongoose way to filter the results
    /* 
      const tours = await Tour.find()
      .where('duration')
      .equals(5)
      .where('difficulty')
      .equals('easy');
    */
    // Since the query object we get from req.query looks exactly the same as the one we pass in above we can simply pass in req.query
    // First we need to create a shallow copy of req.query because we want only certain queries to take effect (for example we do not want the pagination query (?page=2) for our filter)
    // We create an array of all the fields we want to exclude from the query object
    // We remove all the fields we do not want from the shallow copy of req.query with a forEach loop

    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1b.) ADVANCED FILTERING
    /* In order to implement avanced filtering, including greater than or less than for example, a standard way of adding that information in the query is to put the mongoDB operators in square brackets:

    /tours?duration[gte]=5

    The returend query object looks almost identical to how we would put the argument in the find method in mongoDB, except for the missing $ sign:

    MongoDB : {duration: {$gte: 5} }
    queryObject : {duration: {gte: 5} }

    In order to add the missing sign for the mongo operator, we can parse the queryObject as a string with JSON.sringify and then use the replace method in combination with a regular expression to append the $ sign to all operators we want to use. The replace method offers a callback function of which the first argument is the matched string. Using a template literal we can now append the $ sign to the match.
    */

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Now we can use the queryObject in the find method to get the tours filtered for the specified queries
    // Find will return a query object which allows to append other methods right to it like sort() or where().
    // But as soon as we are using await in our find method, which returns the query object, the query will execute and come back with the documents that match the query, which makes it impossible for us to later implement sorting or pagination methods by appending them. Instead we need to save the query as an actual query without the await and then await this query in a separate line of code.
    // const query = Tour.find(queryObj);
    // If we want to use advanced filtering we parse the queryString as JSON and pass it to the find method instead of just the query object
    let query = Tour.find(JSON.parse(queryStr));

    // 2.) SORTING
    // First we need to change the initialisation of query from const to let, because we want to chain the sorting functionality to his query. Again, this is possible because Tour.find which is a mongoDB and mongoose method, returns a query, and this query allows us to append other mongoose methods like sort() to it. Then we simply check if the sort property is defined in the URL using the dot method on the request object, and sort the query by passing the value of sort, which is in req.query.sort and can have the value of price for example, to mongoose's sort function.
    // In case we want additional sorting critera, for example if multiple tours have the same price, we can add another criteria in the URL by passing a string. Mongoose's sort function allows multiple sort criteria simply by passing a space between the arguments. Therefore we replace the comma in the URL with split() and join().

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // 3.) LIMIT
    /* It is useful to implement a functionality that allows the user to get back just the data that he needs. We can therefore limit the fields that we send back to the client. We do this by adding a fields query in the URL:

    /tours?fields=name,duration,difficulty,price

    In this case we make use of the select method that accepts a string with the fields separated by a white space:

    query.select('name duration price difficulty')

    This operation of selecting only certain field names is also called projecting.
    The procedure is very similar to the sorting functionality. In this case we also add a default option, which excludes the __v fields, which mongoose uses internally, but is not relevant for the client. We can do this by simply adding a - sign before the name of the field.

    We can also exclude certain fields right in the schema by setting select to false in the options object:

    createdAt: {
    type: Date,
    default: Date.now(),
    // Excludes createdAt to be sent to the client and makes it only available for internal use
    select: false,
  },
    */
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // 4.) PAGINATION
    /* Now we want to implement pagination. The query string will look something like this:
  
  /tours?page=2&limit=10

  This means the user wants to access page 2 and limit the results per page to 10. First we get the page and the limit query values from the URL and converting them to a number by multiplying with 1. We also set a default value with the logical or operator.
  We create the pages by skipping a certain amount of numbers. This can be calculated with (pageValue - 1) * limitValue. For example if we want page 2 and a limit of 10, the value of skip would be 10, which is 2 - 1 * 10, 10 being the value of the limit.
  In order prevent to accidentally skip more documents that we have and are greeted with an empty response object, we use the countDocuments method on the Tour model. It returns a promise with the value of all documents, which we await. In case that the skip value is greater or equal the number of documents, we throw an error, which is immediately catched in the catch block.
  */
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error("This page does not exist");
    }

    // EXECUTE QUERY
    const tours = await query;

    // Sending JSON back and format it according to Jsend specification
    // Additionally adding results key which holds the length of the tours array as an extra
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
```
