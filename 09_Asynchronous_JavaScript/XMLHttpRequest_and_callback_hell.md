# XMLHttpRequests and Callback Hell

## Oldschool Way of AJAX Calls

First we create a request object with the new keyword followed by the XMLHTPRequest constructor. We then call the open method on the object, which takes the type of request, in our case GET because we want to get information from the API, followed by a string which holds the URL of the API. When using APIs, the URL is often times called an API Endpoint.

After opening the request we now need to send it via the send method. This method fetches the data in the background, which is the asynchronous component in our code. We then need to attach an eventListener to the object and wait for the load event to be fired. This happens when the request object is done fetching the data, which we invoked with the send method. After load, we can now access the responseText property on the object inside the eventHandler, which holds the data we requested in a JSON format. We now convert the data to an Javascript object with the JSON.parse method, which will return an array holding the object, which is why we can destructure the array right away when storing it in a variable.

Now we can dynamically set the HTML for the language card using a template literal.

Finally we will add the HTML to the countries container and set the opacity to 1.

In order to reuse this written code, we can wrap it in a function, which takes the country's name as an argument. When calling the getCountry function for different countries, we can observe that the countries might appear in a different order each time we load the page, because we have two AJAX calls happening at the same time. This really shows the non-blocking and asynchronous behaviour of the AJAX call. The request that finished fetching data first, will also be displayed first.

```js
const getCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
     <article class="country">
       <img class="country__img" src="${data.flag}" />
       <div class="country__data">
         <h3 class="country__name">${data.name}</h3>
         <h4 class="country__region">${data.region}</h4>
         <p class="country__row"><span>👫</span>${(
           +data.population / 1000000
         ).toFixed(1)} people</p>
         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
       </div>
     </article>`;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = "1";
  });
};
getCountry("portugal");
getCountry("usa");
```

## Callback Hell

### Example of callback hell

```js
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
      }, 1000)
    }, 1000)
  }, 1000)
}, 1000)
```

If we want to control to order in which the cards will be displayed, we need to create a sequence of AJAX call, where one AJAX call depends on the other. Previously, we let the AJAX calls run in parallel, now we need to run them in serial.

In this example we want to create a country card and based on this card the countries which are bordering this country. We get the information which countries border our country card from the border property of the request object. We use optional chaining to account for countries that do not have a border property. We can now make another AJAX call, but to another resource, since the neighbour variable now holds a country code (like 'ESP' or 'GER'). After that we attach an eventListener to get the data of ther bordering country and finally render the card.

This way guarantees that the spain card is rendered AFTER the protugal card, since we request the data for spain inside the eventHandler of Portugal and which data we will receive depends on the data of the first AJAX call.

Since our structure is based on nested callbacks (another eventHandler callback inside of a eventHandler callback), this way of making AJAX call in series gets out of hand quite quickly. Just imagine wanting to displaying 5 more neighbouring countries, and it gets worse the more calls you have to make. This horror scenario is also called "callback hell". Briefly put, callback hell is having a lot of nested callbacks in order to execute asynchronous tasks in sequence. It does not restrict itself to AJAX calls, but any asynchronous task that depends on callbacks, for example a setTimeout function inside anohter one.

Callback hell should be avoided since code that suffers from it is hard to understand and to maintain and therefore is vulnerable to bugs. ES6 introduced a new feature called promises, that helps to avoid callback hell.

```js
const renderCountry = function (data, className = "") {
  const html = `

  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = "1";
};
```
```js
const getCountryAndNeighbour = function (country) {
// AJAX Call Country 1
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v2/name/${country}`);
request.send();

request.addEventListener('load', function () {
console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country 2
    const neighbour = data.borders?.[0];

    // AJAX Call Country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });

});
};
// getCountryAndNeighbour('portugal');
getCountryAndNeighbour('usa'); \*/
```