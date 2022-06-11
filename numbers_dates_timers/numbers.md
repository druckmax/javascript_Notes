# Numbers in General

In Javascript all numbers are represented internally as floating point numbers, no matter if we write them as integers or decimal numbers. This is the reason why there is only one data type for all numbers.

```js
console.log(23 === 23.0)  // output true
```

Furthermore, all numbers are represented internally in a 64 base 2 format, which means that all numbers are stored in a binary format. This is why it is hard to represent some fractions, which are easy to represent in a base 10 format, which we are using most of the time( numbers 0 to 9). This compares to the fraction 10/3, which cannot be represented in base but with period 3 after the decimal point.

```js
console.log(0.1 + 0.2)  //output 0.30000000000000004
console.log(0.1 + 0.2 === 0.3)  // output false
```

## Conversion

Like we already learned there are different ways to convert string to a number. Mainly we've been using the Number() function. Another way to do this, is by simply the + operator in front of the string. Javascript will then type coerce the string into a number.

```js
console.log(Number('23')) // 23
console.log(+'23')      // 23
```

## Parsing

We can parse string into a number with the Number.parseInt method, which converts a string into a number, but also removes all the unnecessary symbols, that cannot be converted. Though, this only works if the string begins with a number.

The pareseInt method accepts a second argument, which is the radix. A radix is the base of a system of numeration. Binary has a base of 2, while decimal has a base of 10, from 0 to 9.

Additionally Javascript also offers a parseFloat method, which is similar to parseInt, but works with decimal numbers instead of integers.

ParseFloat and parseInt are so called global functions. This means that they also work if we are not calling them on the Number object, but simply stand on their own. Although, it is recommended to always use the said method in combination with the Number object, because the Number object provides a so called namespace for the method.

```js
console.log(Number.parseInt('30px'));   // output 30
console.log(Number.parseInt('e23'));   // output NaN

console.log(Number.parseInt('2.5rem'));   // output 2
console.log(Number.parseFloat('2.5rem'));   // output 2.5
```

## Check for number type

Theoretically we can check if a value is a number with the isNaN function. This funcion will check if a value can be coerced into a number and will only return true if this coercion fails, meaning it will return NaN. However, this is used best only for checking if a value or expression is NaN.

While this is confusing and practically unconfomrtable we can also check if a value is a finite number with the Number.isFinite() function. This function can also identify if a calculation will result in an infinite value, which is not the case for the isNaN function.

```js
Number.isNaN(20)        // false
Number.isNaN('20')      // false
Number.isNaN(+'20X')    // true
Number.isNaN(23 / 0)    // false

Number.isFinite(20)     // true
Number.isFinite('20')   // false
Number.isFinite(+'20X') // false
Number.isFinite(23 / 0) // false
```