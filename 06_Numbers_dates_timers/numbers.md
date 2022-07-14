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

## Numeric Seperators

When writing large numbers we usally seperate the number with a , or . sign for every thousands digit like 10.000.000.000.
To make our code more readable we can use the underscore in Javascript to seperate big numbers. The underscore will be ignored by the Javascript engine, so this is a great tool to improve the readability of our code.

```js
const diameter = 281_460_000_000;   // output 281460000000

const priceCents = 345_99   // output 34599;
```

Of course a numeric seperator cannot be placed inside of a string if we want it to be converted into a number.

## Internationalizing Numbers (Intl)

We can use Javascript's internationalization API to adjust the display of numbers according to the user's country. In this example our specified formatter (Intl.NumberFormat('lang-country')) generates a different display of larger numbers. In the US a thousands digit is seperated with a comma and the decimal with a comme, while in Germany it is the other way around.

We can also get the language specifications from the user's browser, by passing in navigator.language to our NumberFormat function.

We can further specify the formatter with a options object, which we pass in as a second argument. This object contains information about the style(unit || currency etc.), the unit ('miles per hour, celsius), currency (EUR || USD), useGrouping(set or remove the thousand digits seperates for example) and many more.

```js
const num = 3884764.23;

console.log(new Intl.NumberFormat('en-US')).format(num);    // output: 3,884,764.23
console.log(new Intl.NumberFormat('de-DE')).format(num);    // output: 3.884.764,23

console.log(new Intl.NumberFormat(navigator.language).format(num))
```