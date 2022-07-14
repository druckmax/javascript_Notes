# flat and flatMap method

### flat()
The flat method is used to concatenate nested arrays inside of an array. By default the flat method resolves nested array one level deep. It takes one parameter which defines how deep a nested array structure should be flattened. The flat method returns a new array. The flat method also removes empty slots in arrays.

```js
const arr1 = [0, 1, 2, [3, 4]];

arr.flat()  // output [0, 1, 2, 3, 4]

const arr2 = [0, 1, 2, [[[3, 4]]]];

arr.flat(2) // [0, 1, 2, [3, 4]]
```

### flatMap()
Because the flat method is often used in combination with the map method, the flatMap method was introduced, which is a combination of flat and map. Using flatMap in opposition to map and flat results in performance benefits. **The flatMap method only goes one level deep and cannot be changed!**

In this example we want to retrieve an overall balance of all the accounts movements. The accounts are held in an array. Each account consists of an object, which also holds the movements array from the respective object. We iterate through the array with map and retrieve all the arrays from the account objects, which leaces us with a 1-level deep nested array structur, which we resolve with flat. Then we can add all the movements together with reduce.

```js
// map and flat
const overallBalance = accounts.
    .map(acc => acc.movements)
    .flat()
    .reduce((acc,mov) => acc + mov, 0);

// with flatMap
const overallBalanceBetter = accounts.
    .flatMap(acc => acc.movements)
    .reduce((acc,mov) => acc + mov, 0);
```