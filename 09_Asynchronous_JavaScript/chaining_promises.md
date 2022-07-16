# Chaining Promises

In this example we will chain two sequential AJAX calls using promises. In order to get the second neighbouring country card, which relies on the data of the first AJAX call, we will make a second AJAX call inside of the second then-handler. First we store the neighbouring country in a variable, which we retreive from the borders property of the data. Again, we use optional chaining to account for countries with no borders-property. Similar to the response.json method, we return the fetch function from the then-handler, and use this newly returned promise as a fulfilled value for the promise, which will be handled in the next then-handler. Now we convert the readable stream of the response to a JSON object, return it, and now can render the neighbouring country card in the next handler.

While the flow of this technique seems to be quite complicated, we can see that,instead of callback hell, we get a flat chain of promises. With structures getting more complex, this flat chain makes the code easier to read and understand.

A common mistake of begginers is to chain the adjacent then-method right INSIDE the the then-handler which holds the fetch function. While in practice this actually works, it is to be avoided, since it opens the gates back to callback hell. Therefore, always be sure to return the fetch function from the then-handler and handle it OUTSIDE by chaining the next then-method ONTO the previous one.

```js
const getCountryData = function (country) {

  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);

      // Neighbour Country
      const neighbour = data[0].borders?.[0];
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data, "neighbour"));
};

getCountryData("portugal");
```
