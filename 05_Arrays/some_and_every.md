# Some and every

The some and every methods check for if some elements or every element of an array satisfies a specified condition, and returns a boolean value. It is similar to the includes method with the difference that includes only checks for equality, while some/every can check for any condition.

```js
const movments = [200, 450, -400, 3000, -650];

movemets.includes(-400) // returns true
movements.some(mov => mov === -400) // returns true

const anyDeposits = movements.some(mov => mov > 0); //returns true
const anyDeposits = movements.some(mov => mov > 5000); //returns false
```