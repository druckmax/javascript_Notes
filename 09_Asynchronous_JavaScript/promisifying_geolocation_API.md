# Promisifying Geolocation API

The geolocation API is a callback based API, meaning it takes to callback function as arguments, one for success and one for the case of an error. This is a great opportunity to showcase how to promisify this callback based API.

```js
navigator.geolocation.getCurrentPosition(success => console.log(success), error => console.log(error))
```

First we create a function, which returns a new Promise. In the promise's executor function, which takes a callback function for the resolved and rejected state, we pass in the getCurrentPosition method, attached to the geolocation API on the the navigator object. Inside this method we can now pass in the resolve function as a right hand operator for the success callback, and the reject callback inside the error callback. Since the getCurrentPosition method automatically calls the position and error callbacks and passes in the position, we can simplify the code as followed:

Instead of:

```js
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error)
    );
  });
};
```
We can do:

```js
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
 ``ì
 ```

Now we can retrieve the position from our geolocation promise with a then-handler.

```js
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));
```

## Example:
#### Combination with reverse geocoding and restCountries API
A great use case is the combination of the geolocation with the whereAmI function from one of the coding challenges. Here we can determine the current location of the user with the Geolocation API, do reverse geocoding and then and use this information in order to fetch the corresponding data from the restCountries API. We then can automatically display the correct country card according to the user's location.

```js
// Render Country function
const renderCountryNew = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.subregion}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.entries(data.currencies)[0][0]
      }</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = '1';
};

// Get user location coordinates and fetch data from restcountries API, then render the card
const whereAmI = function () {
  // Get user coordinates
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      // Reverse Geocoding
      return fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
    })
    .then(response => {
      if (!response.ok) throw new Error(`Problem with ${response.status}`);
      return response.json();
    })
    .then(obj => {
      console.log(`You are in ${obj.address.postcode}, ${obj.address.country}`);
      // Get the Country from geocding
      return fetch(
        `https://restcountries.com/v3.1/name/${obj.address.country}`
      );
    })
    .then(response => {
      if (!response.ok) throw new Error(`Problem with ${response.status}`);
      return response.json();
    })
    .then(value => {
      renderCountryNew(value[0]);
    })
    .catch(err => console.error(`Something went wrong: ${err}`));
};

whereAmI();
```