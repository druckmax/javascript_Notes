# The forEach method

The forEach method applies a callback function, passed in as the argument of the method, once for every element in an array. ForEach neither mutates the original array (but the callback might do so) nor does it create a new one. It always returns the value undefined is not chainable.

```javascript
const names = ['Max', 'Jonas', 'Thomas'];

names.forEach(function(element) {
    console.log(`Hello ${element}`)
})
// output: prints one console log for every element in the array
```

ForEach() takes in three arguments:
    1. the current value
    2. the current index
    3. the entire array the method is called upin

The difference of forEach compared to an regular for loop is, that you cannot breakt out of a forEach loop. Continue and break statements do not work with forEach. It will always loop over the entire array.

## forEach with maps

```javascript
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound Sterling']
])

currencies.forEach(function(value, key, map) {
    console.log(`${key}: ${value}`);
})
// output:  'USD: United States dollar'
//          'EUR: Euro'
//          'GBR: Pound sterling'
```

## forEach with sets

The forEach method for sets is the same as for maps, but the second parameter can be simply omitted, since sets do neither have keys nor indexes.

```javascript
const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'USD', 'EUR']),

currenciesUnique.forEach(function(value, key, map) {
     console.log(`${key}: ${value}`);
})
// output:  'USD: USD'
//          'EUR: EUR'
//          'GBR: GBR'
```
