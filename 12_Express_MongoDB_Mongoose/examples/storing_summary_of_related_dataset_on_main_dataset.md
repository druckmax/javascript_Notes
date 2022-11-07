# Storing summary of related data set on main data set

Storing a summary of a related data set on the main data set is a very popular technique in data modeling. This technique can bevery helpful preventing constant queries to related data sets. In our example we will store the average review rating and number of ratings on each tour, so that we do not have to query the reviews and calculate the average each time we query for all tours. This could come in handy in our frontend, where we do not want to display all the reviews, but still want to show a summary of these reviews in form of their number and their average rating.

The concept is to calculate the average rating and the number of ratings of a tour each time a new review is added to that tour and also when a review is updated or deleted.

First we want to write a static method on our schema. As instance methods can be called on every individual document, static methods can be called directly on the model. We name our method calcAverageRatings, which will take the tourID as an argument. In order to do the calculation we will use the aggregation pipeline inside our static method. We can call the aggregate method on the model, so inside the static method we can use the this keyword as 'this' will always point to the model in a static method. This is the reason why we use static methods for this purpose in the first place.

In the first step of the aggregate method we want to select all the reviews that belong to the current tour, whose id we pass in as an argument in the calcAverageRatings function in the beginning. This means that the first stage of aggregate is a match stage, in which we pass in our filter object.

In the next stage we calculate the statistics themselves and for that we can use the group stage. The first field that we need to specify is the ID with '_id'. Here we define the common field of all the reviews we want to group by, which is the tour field in the review model. In other words, we group all the reviews together by the tour they belong to.

To calculate the number of rating we add 1 with the $sum operator for each review that we have for a matching tour. Or in other words, 1 will be added for every tour that is matched in a review document.

In order to calculate the average rating we use the average operator ($avg) and pass in the rating field of the review schema.

The aggregate method will always return a promise, which is why we need to await it, store it in a variable and also not forget to mark our parent function as an async function.

As a last step we wan to persist that data to the database, which is why we call the findByIdAndUpdate function on the Tour model, which we need to require first, if not already done. Because aggregate returns an array, we target the first position in that array (stats[0]) and set the respective fields on the tour model to our new data.

```js
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  // this points to review schema
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  await Tour.findByIdAndUpdate(tourId, {
    ratingsQuantity: stats[0].nRating,
    ratingsAverage: stats[0].avgRating,
  });
};
```

We want to call this function everytime a review is created or saved, which is a perfect case for mongoose's document middleware. We create a post hook, which will be triggered by the save event and pass in our calc method inside to which we will pass the tour id found in the current review document via this.tour. Remember that this needs to be a post hook, because we can only calculate the statistics if the document is already saved to the database. As the name suggests a pre hook would be triggered before the document is saved.
Now we need to call this function on the current model, which is not possible by simply calling it on Review, since it is not yet defined. But we can come up with a neat workaround by calling the function on the constructor of the current document. The constructor basically is the model which created the document,

```
reviewSchema.post('save', function (next) {
  //this points to current review
  this.constructor.calcAverageRatings(this.tour);
  next();
});
```
*/
/* In order to run our calcAverageRatings functions also on update and delete, we need to use query middleware, because we do not have handy document middleware which runs on update and delete. In the post hook of query middleware we do  have access to the current document, which can be passed as the first argument. Just like previously, the problem arises that our static method needs to be called on the model, which we cannot simply do by typing 'Review', because Review is not yet defined. Again we need to call it on the constructor of the document, which now can be found at doc.constructor.

```js
reviewSchema.post(/^findOneAnd/, async function() {
  await this.r.constructor.calcAverageRatings(this.r.tour)
})
```