# Custom Validators

Sometimes the built in validators like required, min, max or enum are not enough. But we can build our own custom validators. A validator is actually just a simple function which either returns true or false. In this example we want to check if the priceDiscount is lower than the price itself, and when it is then an error should be omitted.

First we make use of the validate property which takes a normal function(again because of the this keyword). This function has access to the value that was put in(val). Now we check of the value of the priceDiscount is lower than the price itself. In order to add custom message we create another object, insert the message property and put the function in a property called validator. Inside the message we can make use of mongoose functionality, which is accessing the value with a weird syntax, putting it in curly braces and uppercase {VALUE}.

It is important to note that the this keyword inside the validator will only point to the current document when we are creating a new document. It will not work on update. There are workarounds for that, but they are very complicated and not worth pursuing. If we want to have such a functionality it is worth looking at some third-party libraries on npm, the most popular one being 'validator'.

```js
const tourSchema = mongoose.Schema({
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },

  priceDiscount: {
    type: Number,
    validate: {
      message: "Discount price ({VALUE}) should be below the regular price",
      validator: function (val) {
        return val < this.price;
      },
    },
  },
});
```
