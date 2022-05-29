# Reduce method

The reduce method helps us to reduce an array to a single value. The first parameter of the reduce method is called the accumulator. The accumulator can be seen as a snowball that keeps accumulating the value that we ultimately want to return. In this case the accumulator is value we keep adding to. The reduce method accepts an initial value, which sets the accumulator for the first iteration. In this case we want to add to 0.

```javascript
const movements = [-200, 100, 200, -300, 400];
 
const balance = movements.reduce((acc, cur, i, arr) => acc + curr, 0)

console.log(balance)    // output: 200;

// Getting the maximum value
const maximum = movements.reduce((acc, curr) => acc < curr ? acc = curr : acc)

console.log(maximum)    // output: 400;
```