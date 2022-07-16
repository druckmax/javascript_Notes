# Handling Rejected Promises

A promise in which an error occurred is called a rejected promise. It is important to know how to handle those rejected promises, since we can react to those errors and handle them in a certain way.

The only way how the fetch promise can be rejected, is when the user loses the internet connection, so this will be the error we will be handeling in the following example. Side-note: Handeling the error is also called catching the error.

There are two ways of handeling rejections:
1. The first one is to pass in a second callback function into the then-method
2. Adding the catch method at the end of the chain

The second version has the advantage of not needing to add a second callback for every fetch, for the case that the first fetch is successful and the second one failed. Instead we can handle/catch all the errors globally at the end of the chain, no matter where they appear in the chain. This means that error propagate down the chain until they are caught, except when they are not caught, which results in an Uncaught Type Error, displayed in the console.

In this example we can customize the error message in the console with console.error. We also call the renderError function, which shows an error message to the user. The error thrown by the catch method is actually an Javascript object, this is why we can access the message property of the error for the user display.

At a last instance of a promise-chain, we can call the finally method, which will be called no matther the outcome of the settled state (fulfilled or rejected). A practical example for the finally.method is to hide a loading animation object, like a loading spinner. In our case we always need to fade in the countriesContainer, so this is a job for the finally method.

```js
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

 const getCountryData = function (country) {
   // Country 1
   fetch(`https://restcountries.com/v2/name/${country}`)
     .then(response => response.json(), /* error => alert(error) */)
     .then(data => {
       renderCountry(data[0]);
       // Neighbour Country
       const neighbour = data[0].borders?.[0];
       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
     })
     .then(response => response.json(), /* error => alert(error) */)
     .then(data => renderCountry(data, 'neighbour'))
     .catch(error => {
       console.error(`${error} 💥 💥 💥`)
       renderError(`Ups, something went wrong: '${error.message}'. Try again!`)
     })
     .finally(() => countriesContainer.style.opacity = '1')
 };

 btn.addEventListener('click', () => getCountryData('portugal'));
 ```

 ## Throwing Errors Manually

 Sometimes we need to throw errors manually. In our case if we request a country name that cannot be found by the fetch API, we get a 404 error, the page could not be found. But for the fetch function this means that the promise still was fulfilled, since the promise returned from the fetch function will only be rejected if the connection was terminated. To account for this case, we then throw an error manually.

We do this by checking the ok property of the Response object. If this ok property is set to false, which means there has been an error (404 in our case), then we use the throw keyword, which will immediately terminate the current function (just like return or break). Note that any error will cause any promise to immediately be rejected. This is followed by the new keyword and the Error constructor. Here we can define a custom and, in the best case, a precise error message. The effect of creating and throwing an error in the then methods, will immediately cause the promise to be rejected. In our case this rejected promise propagates down to the catch method, which is only called if a promise is rejected.

```js
const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      console.log(response);

      if (!response.ok) throw new Error(`Country not found ${response.status}`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      // Neighbour Country
      const neighbour = data[0].borders?.[0];
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json() /* error => alert(error) */)
    .then(data => renderCountry(data, 'neighbour'))
    .catch(error => {
      console.error(`${error} 💥 💥 💥`);
      renderError(`Ups, something went wrong: '${error.message}'. Try again!`);
    })
    .finally(() => (countriesContainer.style.opacity = '1'));
};

btn.addEventListener('click', () => getCountryData('abcd'));
```

### Refactoring

While it is quite cumbersome to redo these steps for different API's, we can refactor the above code and create generic functions which then can be handled in the then-methods. In this case we create a generic function that returns the promise from the json method, but also accounts for error messages.*/

```js
function getJSON(url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(errorMsg);
    return response.json();
  });
}

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found`)
    .then(data => {
      renderCountry(data[0]);
      // Neighbour Country
      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error('This country has no neighbours');

      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(error => {
      console.error(`${error} 💥 💥 💥`);
      renderError(`Ups, something went wrong: '${error.message}'. Try again!`);
    })
    .finally(() => (countriesContainer.style.opacity = '1'));
};

btn.addEventListener('click', () => getCountryData('australia'));
```