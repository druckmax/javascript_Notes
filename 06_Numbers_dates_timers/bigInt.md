# BigInt

In Javascript numbers are internally represented in 64 bits (64 1's or 0's to represented any number). Of those 64 bits only 53 are used to store the digits itself. The rest is used for storing the position of the decimal point and the sign. If there are only 53 bits availabe to display any number, this means that there is a limit of how big a number can be. This can be calculated or accessed via the Number namespace.

```js
console.log(2 ** 53 - 1) // output 9007199254740991

console.log(Number.MAX_SAFE_INTEGER);
```

It may occur that we need to work with numbers bigger than Javascript can safely process, e.g. database ID's or other 60bit numbers which are used in other languages and could be transferred from an API.

In ES2020 a new primitve type was added, which is called BigInt. With BigInt we can store and display any integer, even beyond the maximum safe integer. We can convert any number into a BigInt by appending an 'n' to the end of the number. We can also create BigInt values with the BigInt function (we can omit the n at the end here).

```js
console.log(4567896543456567890877897654567n)

console.log(BigInt(567890));
```

All the mathematical operators like +, -, * and / work just the same as with numbers. But since BigInt can only display integers, when dividing two values, BigInt will simply truncate or cut off the decimal part.

```js
10n / 3n    // output 3n
11n / 3n    // output 3n
```

We cannot use BigInt and regular number values in combination while doing calculations and we do not have access to the Math object, which belongs to the number namespace.

There are two excpetions for this, which are the comparison operators and the + operator when doing string concatenation.

```js
20n > 15    // output true

456787655678n + 'is really big' // output '456787655678 is really big'
```