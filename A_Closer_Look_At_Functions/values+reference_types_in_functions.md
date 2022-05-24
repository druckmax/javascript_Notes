# How passing arguments works: Value vs Reference

When passing in reference values to a function, we must be careful to remember that a mutation of a reference type also changes the original object, in contrast to primitive values.

This is because of the difference of how Javascript stores primitive and reference values in the call stack. While primitive values are duplicated and given a new reference directly in the call stack, reference values are mutated in the heap and the call stack simply refers to that object.

Passing primitives to a function is like a copy or duplicate and does not mutate the original value.

If a object is passed to a function, no duplicate is being produced and changes on the "copy" will affect the original object.

```javascript
const flight = 'LH234';
const jonas = {
name: 'Jonas Schmedtmann',
passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
flightNum = 'LH999';
passenger.name = 'Mr. ' + passenger.name;

if (passenger.passport === 24739479284) {
    alert('Checked in');
} else {
    alert('Wrong passport!');
}
};

checkIn(flight, jonas);
console.log(flight);    
console.log(jonas); //Gets mutated by the processing in the function
```

## Call-by-value vs. call-by-reference vs. call-by-share

In Javascript function arguments are passed either by-value or by-sharing, but never by reference, even though you might think that passing an object, which holds a reference to the original object, might do so.

#### The call-by-value evaluation:

Call-by-value applies to primitvie types and infers following practical consequences:

**Reassignments** inside a function scope are not visible in the surrounding scope.

#### The call-by-sharing evaluation

The difference between by-reference and by-sharing is, that in Javascript a variable, which holds a reference to an object, actually holds merely a copy of this reference. If Javascript would pursue a call-by-reference evaluation, the variable would hold the original reference.

Call-by-sharing applies to reference types and infers following practical consequences:

**Mutating** means to modify certain properties of an existing Object. The reference copy that a variable is bound to and that refers to this object remains the same. Mutations are thus visible in the caller's scope.

**Reassigning** means to replace the reference copy bound to a variable. Since it is only a copy, other variables holding a copy of the same reference remain unaffected. Reassignments are thus not visible in the caller's scope like they would be with a call-by-reference evaluation strategy.

