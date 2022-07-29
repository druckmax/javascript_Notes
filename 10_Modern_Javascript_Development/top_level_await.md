# Top-Level await (ES2022)

Since ES2022 we can now use await outside of async functions inside of modules (not regular scripts). This is called top-level await.

### Consuming promises

Top-level await is commonly used in cases where developers needed to use an IIFE or use the then-method in order to consume a promise.

```js
const getLastPost = async function() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = res.json();

    return {title: data.at(-1).title, text: data.at(-1).body}
};

/*
// Simpy doing this will not work, will return pending promise
// Promise must be consumed

const lastPost = getLastPost();

// This works but is not very clean

lastPost.then(last => console.log(last)); */

// With top-level await
const lastPost2 = await getLastPost();
```

### Importing modules with top-level await

Another use case for top-level await is importing modules. If we import a module that uses top-level await, the importing module hast to wait for the imported module to finish executing. In other words, top-level await is not only blocking the code in the module it is being used, but also in the importing module. While this is a very helpful tool, it is also one that we need to use with great care.