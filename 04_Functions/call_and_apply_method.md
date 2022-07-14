# The call and apply methods

The **call method** helps us to reuse a function insde of an object for another object. If a this keyword is used it will set it to the object on which it is called.

```javascript
method.call(object, argument01, argument02)
```

The **apply method** fulfills the same purpose as the call method, the only difference is, that instead of taking the individual arguments for the object-method, it takes an array of arguments, after declaring on which object it should be invoked upon.

```javascript
const argumentArr = [argument01, argument02]

method.apply(object, argumentArr)
```

The apply method is not often used anymore in modern Javascript, because we can simply use the spread opeartor to destructure the array in the call method.

```javascript
method.call(object, ...argumentArr)
```
-----

**Example:** In this example we have an airline object, which holds data and a method. We can use the this keyword inside the function to point to the object's data on which the method is called upon. We use the push method to store an object with the values inside of the bookings array.

```javascript
const lufthansa = {
    airline: 'Lufthansa',
    code: 'LH',
    bookings: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.ariline} flight ${this.code}${flightNum}`);
    this.bookings.push({flight:`${this.code}${flightNum}`, name});
    },
};
```

So far so good. But now we want to apply the same method to other airline objects. So we want to make a general function out of the specific object function. For that, we store the book method to a variable on the global scope. Now the problem is that the this keyword does not know which object it belongs to. On the global scope it therefore returns undefined, when using strict mode.

```javascript
const eurowings = {
    name: 'Eurowings',
    code: 'EW',
    bookins: [],
};

const book = lufthansa.book;

//Does not work
book(23, 'Max Sommerfeld')
```

We therefore make use of the call method, which takes the object, which the method should be called upon, as the first argument, following by the arguments for the parameters of the actual method. The flow works like this: We are not calling the book function directly, but the call method, which then calls the book function with the this keyword set to eurowings.

```javascript
book.call(eurowings, 23, 'Max Sommerfeld)
```

