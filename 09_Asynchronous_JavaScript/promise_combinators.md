# Promise Combinators: race, allSettled and any

## Promise.race

Promise combinators receive an array of promises and return a single new promise.
The promise returned by Promise.race is settled as soon as one of the input promises settles. If a promise settles, a value is available, which happens if a promise is fulfilled OR rejected. Basically the promises in the array race against each other and the first promise to be settled wins. If a promise is fulfilled, the fulfilment value of the parent promise then will be the fulfilment value of this winning promise. Promise.race will return the fulfilment value of the promise, which finished loading the quickest.

But like mentioned above, Promise.race also settles if a promise gets rejected. We therefore can say that this combinator short-circuits whenever one of the promises in the array gets settled, no matter if fulfilled or rejected.

```js
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy}`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt}`),
    getJSON(`https://restcountries.eu/rest/v2/name/germany`),
  ]);
})();
```

Promise.race can be very useful to prevent never ending promises or very long-running promises. For example, if the user has a slow internet connection, then the fetch request might take too long to actually be useful. Hence, we can create a special timeout promise, which will be rejected after a certain time. We let the promises in the race combinator race against the timout and if time is up, it is as if all the promises have been rejected.

```js
const timeout = function(s) {
  return new Promise(function( (_, reject) {
    return setTimeout(function() {
      reject(new Error('Request took too long!'))
    }, sec * 1000)
  }))
}

(async function() {
  try {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/germany`),
    timeout(2)
  ])
  console.log(res);
  } catch(error) {
    console.error(error)
  }
})()
```

## Promise.allSettled (ES2020)

Promise.allSettled takes in an array of promises and returns an array of all the settled promises, again meaning, no matter if they got fulfilled or rejected. In contrast to Promise.all, which short circuits if a promise gets rejected, Promise.allSettled never short-circuits. It will simply return all the result of all the promises.

```js
Promise.allSettle([
  Promise.resolve('Success');
  Promise.resolve('Success');
  Promise.reject('ERROR');
  Promise.resolve('Success');
]).then(res => console.log(res));
```

## Promise.any (ES2021)

Promise.any takes in an array of multiple promises and will return the first fulfilled promise, while ignoring rejected promises. It is basically like the race combinator, with this difference of ignoring rejected states. The result of Promise.any will always be a fulfilled promise, unless of course all of the promises get rejected.