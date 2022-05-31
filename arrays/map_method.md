# Map method

The map method is another way to loop over arrays. In contrast to the forEach method, map returns a new array. It does not mutate the original array. The map method can take up to three parameters, which are the value, the index and the array the method is called upon.

```javascript 
const movements = [100, 200, 300, 400];

const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * eurToUsd);
```
