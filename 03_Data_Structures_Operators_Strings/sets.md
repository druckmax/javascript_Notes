# Sets

A set is a collection of unique values and cannot have any duplicates of an item. It can hold mixed data types. The main use case of a set is to remove duplicate values from arrays. The returned set is similar to an array as it holds only single values and also belong to the group of iterables. Though, a big difference to an array is that the order of a set is irrelevant and we cannot retrieve single values from a set with [i].

We can get the length of a set with the .size property instead of .length.

    const ordersSet = new Set([1, 2, 5, 1, 2 ,5])   ==> output: Set(3) {1,2,5}
    ordersSet.size ==> output: 3

    const ordersSet02 = new Set('maximilian')    ==> output: Set(6) {'m','a','x','i','l','n'}
    
Similar to the includes method in arrays, sets come with the has method:

    console.log(ordersSet.has(1))   ==> output: true

We can add items to a set with the add method. Of course repeated adding of the same item will be ignored.

    ordersSet.add( 9 );
    ordersSet.add( 9 );
    console.log(ordersSet) ==> output: Set(3) {1,2,5,9}

To delete an item we can simply use the delete method:

    ordersSet.delete( 9 );

To clear all the elements from a set, we can use the clear method:

    orderSet.clear();

**In sets are no indexes and there is no way to get a value out of a set.**
But because they are iterables, we can iterate through them with for...of and we can also use the spread opeartor.

**Example:** We have an array with the staff's positions in a restaurant. We now want to check how many and which positions there are in total and store the result in another array.

    const staff = ['Waiter', 'Chef', 'Bartender', 'Waiter', 'Chef'];

    const staffTotal = [...new Set(staff)];
    console.log(staffTotal)     ==> output: ['Waiter', 'Chef', 'Bartender'];