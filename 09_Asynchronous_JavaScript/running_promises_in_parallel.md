# Running Promises in Parallel

If we want to run several AJAX calls in parallel at the same time, given the condition that they do not depend on each other, it does not make sense to call them one after the other. This way the next call will wait for the previous to finish, which costs us precious loading time.

Instead we can make use of the Promise.all combinator function, which is a static helper function of the Promise constructor. This function takes in an array of promises and will return a new promise, which will run all the promises in the array at the same time. We can handle this new promise in the usual manner by storing it in a variable, 'data' in this case, and using the await keyword.

Now, when logging the data variable to the console we will get an array of arrays, which in turn hold the data inside of an object.

**Important**: If one of the promises inside the all combinator function is rejected, the newly composed promise will be rejected as well. We can say that Promise.all short-circuits if one promise is rejected.

```js
// Abstracting the fetch and conversion to JSON object
function getJSON(url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(errorMsg);
    return response.json();
  });
}

const get3Countires = async function (c1, c2, c3) {
  try {
    const data = await Promise.all(
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`)
    );
    // Returns array of arrays, holding an object
    console.log(data);
    // Return single values
    console.log(data.map((d) => d[0].capital));
  } catch (error) {
    console.log(error);
  }
};

get3Countries('portugal', 'canada', 'tanzania');
```
