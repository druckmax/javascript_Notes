# Sort Method

Like the name says, sort is used for sorting arrays. The default behaviour is a ascending order. If no function is passed in, the sort method automatically converts the items to a string and compares them to the sequence of UTF-16 code values.
This means:
- strings will be sorted alphabetically.
- Converted numbers behave not like you think because they are sorted in the unicode order:

      sortedArr = [1, 10000, 21, 30 , 4];
            
To fine tune our sorting, we can pass in functions to the sort method. The function allows us to pass in two arguments for comparison. In this way you can, for example, reverse the sorting order from ascending to descending. The sort method also mutates the original array and does not return a new one!

The a and b parameter can be seen as two consecutive values in the array. If we return less than 0 in the comparison of these two values, then the value **a** will be sorted **before** value **b**. If the returned value is positive, then **a** will be sorted **after** value **b**.

    if return < 0 ==> a, b  
    if return > 0 ==> b, a

```js
const movements = [200, 450, -400, 3000, -650];

movements.sort((a,b) => {
    //Ascending
    if(a > b) return 1;
    if(a < b) return -1;
});
//Simplified
movements.sort((a,b) => a - b);

console.log(movements); //output [-650,-400, 200, 450, 3000]

movements.sort((a,b) => {
    //Descending
    if(a > b) return -1;
    if(a < b) return 1;
});
//Simplified
movements.sort((a,b) => b - a);

console.log(movements); //output [3000, 450, 200, -400, -650]