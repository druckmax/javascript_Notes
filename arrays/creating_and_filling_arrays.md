# Creating and filling arrays

Instead of hardcoding arrays we can set and fill arrays programmatically.

## Array constructor and fill method

An easy way of creating an array is the Array constructor. If a single value is passed in as an argument, the constructor will create an empty array but with n empty slots while n being defined by the argument.
We cannot use any array methods with this special empty array except for the fill method. The fill method will mutate the underyling array and fill the array with the value being defined in the argument.
Similar to the slice method we can also define from which index we want the method to fill the array and where we want it to stop filling it.
Do array does not have to be empty for the fill method to work, we can use it on any array.

```js
const x = new Array(7);
console.log(x); //output Array(7)[empty x7];

x.fill(1); // output [1, 1, 1, 1, 1, 1, 1]

x.fill(1, 3); // output [, , , 1, 1, 1, 1]

x.fill(1, 3, 5); // output [empty x3, 1, 1, empty x2]

const arr = [1, 2, 3, 4, 5];

arr.fill(23, 2, 5); // output [1, 2, 23, 23, 5]
```

## Array.from

We can call the from method on the array constructor function in order to create an array. The from Arry.from method was introduced in order to be able to create arrays from other iterables, hence the name.

In this case the from method takes an object with the keyword length and the value defining the length of an array as the first argument. When then create a callback function which fills the array with its values. The callback function works in the same way as the map method. This way we can programatically create the values for the array. Since we do not need the first parameter in the callback function, but need to define a first parameter anyways, we can use a throw-away variable, which is often labeled as an underscore.

```js
const y = Array.from({ length: 7 }, () => 1);

console.log(y); // output [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);

console.log(z); // output [1, 2, 3, 4, 5, 6, 7]
```

**Practical use case:**
In this examples we want to turn a node list, received from the querySelectorAll method, and turn it into an array, so that we can use array methods on each of the elements. For the conversion from a node list to an array the Array.from method is the perfect fit.
Let's pretend the movements from a banking app are only stored in the UI, but in order to use them for calculation and modification we need them stored in an array in our code.

```js
// Retrieving all nodes and sotring them in an array
const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
// Using the map method to retrieve only the value and delete the euro sign
movementsUI.map(el => Number(el.textContent.replace('€', '')));
// Since Array.from accepts a callback as a second argument we can combine the two steps above
const movementsUI = Array.from(document.querySelectorAll('.movements__value'),
                                el => Number(el.textContent.replace('€', ''));
```

Note: We could also simply spread the node list into an array, but would have to map the elements seperately afterwards.

```js
const movementsUI2 = [...document.querySelectorAll('.movements__value')];
```