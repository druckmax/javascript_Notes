# Filter method

The filter method is used to filter for elements, which satisfy a certain condition.

```javascript
const movements = [-200, 100, 200, -300, 400];

//Filtering out negative values
const deposits = movements.filter( mov => mov > 0);

console.log(deposits)   //output [100, 200, 400];
```
