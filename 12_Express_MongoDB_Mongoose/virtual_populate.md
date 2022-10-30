# Virtual Populate

In cases we need to reference another document without actually persisting the data to the database, we can use something called virtual populate. For example, we have the Review model, which uses parent-referencing to access the tours. Now there is no way for the parent (tours) to know anything about the reviews, but we still to have this data when we query for a single tour. The option of child-referencing the reviews in the tour model is out of question, because we do not want to allow arrays to grow indefinitely since we cannot estimate the amount of reviews that would need to be stored. We also want to avoid the potential risk of our document exceeding the 16megabyte limit for BSON documents.

First we create a virtual property with calling the virtual method on the tourSchema. As the first argument we pass in a name for the virtual field. As the second argument we pass an options object, which holds a ref property pointing to the review model. In foreignField we pass in the name of the field in the review model, which holds the ID of the tour. In localField we pass in the name of the field where we can find the corresponding value of the foreignField. For example, inside the reviewSchema the tour is referenced in the 'tour' field and we do this by its ObjectId. Inside the tourSchema we can find this exact ObjectId in the '\_id' field.

After we set up the virtual property, all we need to do is to regularly use the populate method in our controllers. In our case we only want the reviews to be populated when we retrieve a single tour.

In order to avoid an inefficient chain of populates, which slows our application down, we also deactivate the population of the tour field inside the review document, since the review is already nested in the retrieved tour. We do not need to populate the tour field in reviews, because reviews already got populated in the tour document.

```js
tourSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "tour",
  localField: "_id",
});
```

```js
reviewSchema.pre(/^find/, function (next) {
  // Can be turned off, because we do not need to populate the tour data since reviews is already in the tour data.
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // });

  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});
```
