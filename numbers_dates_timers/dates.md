# Creating Dates

We can create dates in multiple ways with the new keyword and the Date object.
Note that the months in Javascript are zero based.

```js
const now = new Date()   //output current date and time

// Create a specified date
const date = new Date('Aug 02 2020 18:05)

// Note that the month is zero based in Javascript
console.log(new Date(2037, 10, 19, 15, 23, 5)) //output: Thu Nov 19 2037 15:23:05 GMT+0000

// Javascript autocorrects non existing dates
console.log(new Date(2037, 10, 33)) // output: Thu Dec 03 2037 ...

// We can pass in the amount of milliseconds passed since the beginning of the unix time, which is January 1st 1970
console.log(new Date(0))    // output: Thu Jan 01 1970 01:00:00

// Calculating the three days after beginning of unix time, the result is called a timestamp
// days * hours * minutes * seconds * miliseconds
console.log(new Date(3 * 24 * 60 * 60 * 1000))
```
The Date object comes with its own methods, just like arrays or strings. We can use these methods to get or set components of a date.

#### Get methods
```js
const future = new Date(2037, 10, 19, 15, 23); // output: Thu Nov 19 2037 15:23:00 GMT+0000

future.getFullYear() // output: 2037
future.getMonth()       // output: 10
future.getDate()     // output: 19  >> date refers to the day of the month
future.getDay()      // output: 4 >> refers to the day of the week (4 === Thu)
future.getHours()    // output: 15
future.getMinutes()  // output: 23
future.getSeconds()  // output: 0

//ISO follows an international standard
future.toISOString() // output: "2037-11-19T15:23:00.000Z"

// Get the timestamp (milliseconds passed since January 1st 1970);
future.getTime()
// The output can be turned into a new Date object.

Date.now()          // gets the timestamp of the current time
```

#### Set methods

```js
future.setFullYear()    // output: Thu Nov 19 2040 15:23:00 GMT+0000
future.setMonth()
future.setDate()
future.setDay()
...
```

## Operations with dates

In Javascript we can do calculations with dates, e.g. subtract one date from another to calculate how much time has passed between the two dates. This is possible, because Javacript converts every date to its timestamp, whenever we try to convert a date to number, e.g. for calculations.

```js
const calcDaysPassed = (date1, dat2) => Math.abs(date2 - date1) / (1000 * 60 * 60 *24);

const days1 = calcDaysPassed(new Date(2037, 3 , 14), new Date(2037, 3, 24));

// Before adding division calculation add the end of arrow function
console.log(days1) // output: 864000000

// After conversion to days
console.log(days1) // output: 10;
```

## Internationalizing Dates (Intl)

Javascript has a new internationalization API, which is used to conveniently format numbers and strings according to different languages. This allows our application to support different languages for users around the world. This is important, because, for example, the display of currencies and dates varies broadly depending on the country.

Firstly we put the new keyword, followed by the namespace for the internationalization API (Intl). Then we add the DateTimeFormat function for dates, which takes a so called localeString as an argument. This locale usually consists of the abbrevations for the language and then the country, seperated by a dash. The whole chain will create something called a formatter for the specified language and respective country. This allows us to add the format method at the end of the chain, which takes the actual date as an argument.

Just one line of code allows us to format our date for every user around the world and his or her country's convention for displaying dates.

```js
const now = new Date();
console.log(new Intl.DateTimeFormat('en-US').format(now));
```

Right now only the date will be shown, without any information about the hours. We can further customize our formatter by adding an options object. This object can be added as a second argument to the DateTimeFormat function.

Additionally, we can get the language from the user's browsers instead of hardcoding it. This can be done with navigator.language and passing its value as the first argument of our DateTimeFormatter.

```js
const options = {
    hour: 'numeric',
    minute: 'numeric'
    day: 'numeric',
    month: '2-digit', // alternatively 'long' for written out month
                      // or 'numeric' for single value from 1 to 9
    year: 'numeric',
    weekday: 'short'  // or 'long' or 'narrow'
};
const locale = navigator.language;

console.log(new Intl.DateTimeFormat(locale, options).format(now));
```