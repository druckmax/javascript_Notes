# Simple array methods

Arrays belong to the reference data type and are simply objects. Arrays have methods we can call on them, which are simply functions that are attached to any array we create in JS. So every array has access to these pre-built kind of functions.

1. slice() method: Similar to the String.slice method, we can extract a part of an array and return a new array, without mutating the original one. The first parameter defines the starting index, the second one the end. We can also insert negative values. We can create a shallow copy of an array, if we pass no arguments to the function.

```javascript
let arr = ['a', 'b', 'c', 'd', 'e']

arr.slice(2)        // output ['c', 'd', 'e'];
arr.slice(2, 3)     // output ['c'];
arr.slice(-2)       // output ['d', 'e'];

// slice(-1) always gets the last element of an array
arr.slice(-1)       // output ['e'];
// Slices the first and then two elements counting from the end of the array
arr.slice(1, -2)       // output ['b', 'c'];
// Shallow copy
arr.slice();
```

2. splice() metod: Splice is similiar to the slice method, but splice mutates the original array instead of returning a new one. So the extracted elements are deleted from the original array. The first parameter defines the starting index, but the secon paramter defines the delete count instead of end index like in the slice method.
```javascript
arr.splice(-1)       // output ['e'];
console.log(arr)    // output ['a', 'b', 'c', 'd'];

arr.splice(1, 2)    // output ['b', 'c']
console.log(arr)    // output ['a', 'd'];
```

3. reverse() method: This method simply reverses the order of an array. This method mutates the original array.

```javascript
const arr2 = ['j', 'i', 'h', 'g', 'f'];

arr2.reverse()      // output ['f', 'g', 'h', 'i', 'j']
console.log(arr2)   // output ['f', 'g', 'h', 'i', 'j']
```

4. concat() method: This method is used to concatenate two arrays. The array which should be concatenated with the array the method is called on, is passed as a parameter to the method. The concat method returns a new array and does not mutate any of the involved arrays.

```javascript
arr = ['a', 'b', 'c', 'd', 'e']

const letters = arr.concat(arr2)    // output ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// We can do the same with the spread operator
const lettersSpread = [...arr, ...arr2];
```

5. join() method: The join method creates and returns a new string by concatenating all the elements of an array seperated by commas (default) or a specified seperator string, passed like an argument.

```javascript
letters.join(' - ');    // output ['a - b - c - ... ']
```

6. at() method: The at method is similar to getting the index with the bracket notation. It is useful and less syntax in the following scenario, trying to access the last element of an array.
Note: The add method also works on strings.

```javascript
arr = ['a', 'b', 'c', 'd', 'e'];

arr[arr.length-1];      //output 'e'
arr.slice(-1)           //output ['e']
arr.slice(-1)[0]        //output 'e'
arr.at(-1)              //output 'e'
```