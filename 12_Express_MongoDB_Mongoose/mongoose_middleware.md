# Mongoose Middleware

Just like Express, Mongoose also inherits the concept of middleware. There are four types of middleware: document, query, aggregate and model middleware. Just like with Express, we can use Mongoose middleware to execute code between two events. For example, each time a new document is saved to the database, we can run a function after the save command is issued but before the actual sacing of the document, as well as after the actual saving. This is the reason why Mongoose's middleware is also called pre and post hooks. A pre hook is exectued before a certain event and post afterwards.

## Document Middleware

Document Middleware can act on the currently processed document. Just like virtual properties, we define middleware in the schema.

The document middleware can run on validate, save, remove, updateOne, deleteOne, init and create, as create fires save() hooks. It does not run on insertMany, which is done via the model middleware. The most commmon event trigger is 'save'.

In this example we use a pre hook in order to run a function before a document is actually saved to the database. This allows us to act on the data before it is passed on. Here, we use it to create slug for the current document with slugify. Quick reminder: A slug is a part of an URL which consists out of a single or multiple words, often separated by hyphens, which are easy to understand for users and search engines. A slug is basically just a string that we can put in the URL, usually based on something like the name of a document.

We pass in the event-trigger 'save' to the hook, followed by a callback function, which needs to be regular function in order for the this keyword to be set to the current document.
We create a new property called slug on the current document via this.slug, call the slugify method, in which we pass the value we want to create a slug out of. We make use of slugify's options and convert everything to lower case by setting lower to true. Remember that in order for the slug property to show up, we also need to define it in our schema.

Just like Express middleware, Mongoose middleware makes use of the next() function, which is essential to call in order to call the next middleware in the stack.

```js
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
```

The post hook additionally has access to the document object, which in case of 'save' is the document we just saved to our database. Like the name implies, post middleware functions are executed after all the pre middlewre functions finished executing. In the post hook we no longer have the this keyword, but the final document in the doc object.

```js
tourSchema.post("save", function (doc, next) {
  console.log(doc);
  next();
});
```

## Query Middleware

Query middleware allows us to run functions before or after a certain query is executed.

While post and pre hooks look identical in terms of syntax, the difference of the query middleware and the document middleware lies in the this keyword. When we define the 'find' trigger in the pre hook, the this keyword will now point to the current query object.

In this example we create a pre-find hook, which runs before any find query is executed. A use case for this could be if we wanted to have secret tours, that are only offered internally or are only accessible for a certain group of people. We therefore create a secretTour field in our schema. Now we use the find method in the pre hook and select all the tours where the secretTour field is not equal to true. This way we also select all the documents that do not have the secretTour property. By doing this we basically filter out all the secret tours from the output.
NOTE: Mongoose actually creates the secretTour field for all the existing documents and sets it to its default, so {secetTour: false} would also work.

A problem that occurs that the 'find' trigger does not work for findOne (also not findById which actually uses findOne). We could simply create another pre hook with findOne, but it is a better practice to use a regular expression in this case. We do this with /^find/, which means it should select all the strings that start with 'find'.

```js
// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});
```

In the post hook of the query middleware we get access to all the documents that are returned from the query, since this middleware runs after the query has finished its execution.

```js
tourSchema.post(/^find/, function (docs, next) {
  console.log(docs);
  next();
});
```

## Aggregation Middleware

In the query middleware we hid the secret tour, but in the aggregation pipeline, this secret tour is still used. In order to prevent this we want to exclude the secret tour from the aggregation. We could do this by exclude all the tours with secretTour field set to true in the \$match stage of the aggregation. But if we have multiple aggregations, we would have to exclude it from every one in the respective $match stages. Hence, it is a good idea to exclude the secret tour on the model level like in this example.

In aggreagtion middleware, the this keyword is set to the aggregation object. In this object we have access to the pipeline function, which return the array of stages we passed to the aggregation function. Now, we can simply add a $match stage to the beginning of this pipeline function and filter out all the secret tours.

```js
tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

// Convention to put model variable with capital letter
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
```
