# Child Referencing and Populating Data

Creating child references is fairly easy. We need to create a field in our schema, in this case it is called 'guides'. We set it to be an array since we expect multiple user objects with the role of 'guide'. As type we define the ObjectId on the mongoose.Schema object. To reference the correct userModel we simply pass the name of the model as a string to the ref field.

In order to show the referenced data in our response, we need to populate this field. Mongooose will then make another query to get the information from the referenced userModel. We have to keep that in mind as it might lower performance when we are populating a lot fields.

In our case we create a convenient query middleware and add the populate method to every method that starts with find and is called on our tourModel. Populate() can simply take the name of the field that needs to be populated, or an options object, in which we can add further options, for example not showing the '\_\_v' or 'passwordChangedAt' fields in our response.

```js
// In the tourSchema
guides: [
  {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
],
  // Query middleware
  tourSchema.pre(/^find/, function (next) {
    this.populate({
      path: "guides",
      select: "-__v -passwordChangedAt",
    });
    next();
  });
```
