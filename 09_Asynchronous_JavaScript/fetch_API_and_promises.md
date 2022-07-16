# Using fetch API and Promises

Instead of our XMLHttpRequest and the need for the open and send method and listening for the load event to happen, we can use promises from the fetch API with the fetch function.

For now let's assume that the returned promises will eventually be fulfilled. On the returned promise we can call the then method, which takes a callback function as an argument, which is executed when the promise is fulfilled (as soon as the result or future value is available). This callback function again takes one argument, which is the resulting value of the fulfilled promise. We call it response in this case, since the resulting value is the response of an AJAX call.

When logging the response to the console inside the handler, we get access to an object that is actually called Response, which holds valueable data like headers, status etc. The property we are interested in is the body, which holds the data we requested with our AJAX call. The body of the Response object shows that it is an readable stream, which means that we have to call json method on that property to convert the data into a readable format. The json method is available on all response objects holding resolved values (fulfilled promise) coming from the fetch function.

The problem with the json-method is that it is also an asynchronous function, which means that it will return a new promise as well. Therefore we have to return this promise from the then method and chain another then-method to it. In this second then-method, which again takes the resolved promise as an argument, we can finally access the data from the AJAX response and render our country-card.

Actually, the then method always returns a new promise, no matter if we return anything or not. But if we do return a value, then that value will become the fulfillment value of the returned promise. For example, if we simply return the number '23' from the then-handler, when console logging the argument of the next then-method, in our case 'data', we would simply get '23'. So the argument ('data') that we receive in the second then-handler as an input to the function, is the fulfilled value of the promise that we are handling.

```js
 const getCountryData = function (country) {
   fetch(`https://restcountries.com/v2/name/${country}`)
     .then(response => response.json())
     .then(data => renderCountry(data[0]));
 };

 getCountryData('portugal');
 ```