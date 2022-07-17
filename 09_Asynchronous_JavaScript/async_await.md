# Async Await

Since ES2017 there is a new way of consuming promises, called async await. This approach uses the same logic of consuming promises, but offers syntactic sugar over the syntax of Promises. Async await gives us the feeling as if we would write synchrnous code while actually writing asynchronous code. To make a function asnychrnous, we now can simply add the async keyword before the function keyword. This function now automatically returns a promise when it finished executing.
Inside an async function we can have one or more await statements. After the await keyword a promise is expected. We can say that the await keyword awaits the result of the the following promise. It basically stops the code execution at this point and waits for the promise to be fulfilled. While this seems to be blocking behaviour, it is actually non-blocking, since the statement runs in an asynchronous function and there is not blocking the main thread of the Javascript engine.

After the promise is resolved, the value of the whole await expression is goint to be the resolved value of the promise. Therefore we can simply store it in a variable, which was impossible using regular promises. Now we can simply skip consuming of the promise with the then-methods.

In the next step we want to convert the readable stream of the Response object to a Javascript object with the json method. We know that the json method returns a new promise, so we have to prepend the await keyword, before calling the method. Now we can store it in a variable, which will then hold the data.

```js
const whereAmI = async function (country) {
  const res = await fetch(`https://restcountries.com/v2/name/${country}`);
  const data = await res.json();
  renderCountry(data[0]);
};
whereAmI("portugal");
```

## Error Handling with try...catch

With async await we cannot use the catch method anymore, because we cannot attach it anywhere. But instead, we can use a try...catch statement, which has been a part of the Javascript language for a long time. Try...catch has not been created created specifically for async await, but nevertheless we can use it to catch errors in async functions.

We therefore wrap our code in a try block, where we cause an error by trying to reassign a constant variable. We append a catch block to the try block. This block now has access to any error, which occured in the try block. We can handle the error and display the error.message in an alert window for example. Now, since we handled the error, it will not show up in the console anymore, and therefore will not cause our script to crash.

```js
try {
  let y = 1;
  const x = 2;
  x = 3;
} catch (err) {
  alert(err.message);
}
```

In the next example we are going to refactor the completed whereAmI function with geolocation and geocoding, using async await. In order to handle the erros, we have to wrap the entire code of the inner function in a try block. This is followed by a catch block afterwards, where all the errors are handled. To account for errors of the fetch API (403 for example for too many requests per seconds) we can manually throw errors in the try block, which will also be handled by the catch block, just like with catch-methods when the promise syntax.

```js
const whereAmI = async function () {
  try {
    // Get user coordinates
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geocoding
    const resGeo = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    // Handling errors fetching reverse geocoding
    if (!resGeo.ok) throw new Error("Provlem getting location data");
    const dataGeo = await resGeo.json();

    // Get Country
    const resCountry = await fetch(
      `https://restcountries.com/v3.1/name/${obj.address.country}`
    );
    // Handling errors fetching restcountries
    if (!resCountry.ok) throw new Error("Problem getting country");
    const dataCountry = await resCountry.json();

    // Render Card
    renderCountryNew(dataCountry[0]);
  } catch (error) {
    console.error(`Ups: ${error.message}`);
  }
};

whereAmI();
```

#### For Compariosn: Promises Syntax

```js
const whereAmI = function () {
  // Get user coordinates
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;

      // Reverse Geocoding
      return fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
    })
    .then((response) => {
      if (!response.ok) throw new Error(`Problem with ${response.status}`);
      return response.json();
    })
    .then((obj) => {
      console.log(`You are in ${obj.address.postcode}, ${obj.address.country}`);
      // Get the Country from geocding
      return fetch(
        `https://restcountries.com/v3.1/name/${obj.address.country}`
      );
    })
    .then((response) => {
      if (!response.ok) throw new Error(`Problem with ${response.status}`);
      return response.json();
    })
    .then((value) => {
      renderCountryNew(value[0]);
    })
    .catch((err) => console.error(`Something went wrong: ${err}`));
};

whereAmI();
```

## Returning Values from Async Functions

If we want to return a value (lets say a string) from an asynchrnous function, we cannot simply access it and store it in a variable. The following example will not work:

```js
console.log("1: Will get location");
const city = whereAmI();
console.log(city);
console.log("3: Finished getting location");
```

This is because an asynchronous function will always return a promise. The console log of city in the example above will return a Promise in a pending state, because the log is executed, while the asynchronous function is not finished executing. In order to fix this we can handle the promise like so:

```js
console.log("1: Will get location");
whereAmI().
  then(city => console.log(`2: ${city}`)).
  catch(err => console.log(`2: ${err.messsage}`))
  .finally(() => console.log("3: Finished getting location"))
```
In the above example, we have to remember to throw an error again in the catch-block of the whereAmI function, in order for the catch-method to be able to handle the error. Also we can fix the order of the logs,so that the third log will be executed after the asynchronous function, by using the finally method.

But also this example is not a good practice, since we are mixing async await and the older promise syntax, which beats the purpose of async await in the first place.

#### Best practice: Using IIFE's

Concluding, we can use IIFE's instead, since we cannot simply use await outside of an async function, yet. This use case is one of the last remaining cases where IIFE's are still used.

```js
(async function() {
  try{
    const city = await whereAmI();
    console.log(`2: ${city}`)
  } catch(err) {
    console.log(`2: ${err.messsage}`)
  }
  console.log("3: Finished getting location")
})();
```