## filter method

The filter method is used to filter for elements, which satisfy a certain condition. It will return a new array, which contains the elements, that satisfies the condition.

```javascript
const movements = [-200, 100, 200, -300, 400];

//Filtering out negative values
const deposits = movements.filter( mov => mov > 0);

console.log(deposits)   //output [100, 200, 400];
```

## find method

The find method accepts a boolean condititon, similar to the filter method. But instead of returning a new array, it returns the first value, that matches the condition.

```js
const firstWithdrawal = movements.find(mov => mov < 0)  // returns -200;
```

## findIndex methd

The find method accepts a boolean condition and returns the index of the first element that matches this condition.

```js
const fistWithdrawalIndex = movements.findIndex(mob => mov < 0) // returns 0;
```
