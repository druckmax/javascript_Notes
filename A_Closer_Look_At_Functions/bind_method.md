# The bind method

Just like the call method, the bind method allows us to manually set the this keyword for any function call. The difference is that the bind method does not immediatly invoke the function. Instead it returns a new function were the this keyword is bound to the object, which we specified as the argument in the method. This used for case that we want to reuse a method from another object multiple times for another object. 

```javascript
const bookEW = book.bind(eurowings)
bookEW(23, 'Max Sommerfeld')
```

If we pass in arguments for the parameters of the actual object method, those arguments will also be bound the newly returned function. This can be used for further specification, for example we want a specific function only for the eurowings flight number 23. The process of specifying parts of the arguments of the function beforehand, is a common pattern called **partial application**. In other words, a part of the arguments of the original function are already applied.

```javascript
const bookEW23 = book.bind(eurowings, 23)
bookEW('Max Sommerfeld')
```

## bind() with event listeners

The bind method also is commonly applied when working with event listeners and event handler functions. This is useful since in an event handler function the this keyword always points to the element the handler is attached to.

Example: In this example we want the lufthansa.planes property increased by one, if the button "buy new planes" is pressed. Unfortunately the this keyword from the function, if used in the event handler, points to the HTML property in the DOM, so it is returning the button, and therefore the increment returns NaN. We say the event handler function is attached to the button element.
In order to point the this keyword to the direction we want, we use the bind method, because it returns a new function(instead of call, which just inovkes the function), and pass the respective object as an argument.

```javascript
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    this.planes++;
}

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa))
```

## Partial application

Partial application means pre-setting the argument of a function.

**Example:** In this example we have a simple calculation which adds the tax rate to a passed in value. Now we want to use that function and based on it, return a new one, which works for a fixed tax-rate, like the VAT (Mehrwertsteuer). The first argument of the bind method is always the this keyword, which isn't even in the original function. In order to ignore this parameter we can set the first argument as null, which is a standard for this kind of situations. It could be any other value, since nothing is happening with it.

```javascript
const addTax = (rate,value) => value + value * rate;
console.log(addTax(.1, 200)),

const addVAT = addTax.bind(null, .19)
```

Another way of writing this as a closure/a function returning a function:

```javascript
function addTaxRate = function(rate) {
    return function(value) {
        return value + value * rate,
    };
};

const addVat2 = addTaxRate(.23);
```