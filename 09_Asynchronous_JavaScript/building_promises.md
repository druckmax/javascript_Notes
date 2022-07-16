# Building Promises

Promises basically are another special kind of object in Javascript. Like many other objects we can create promises using the new keyword and a constructor called Promise. The constructor function takes one argument, which is the so called executor function. By executing the promise constructor, this constructor will pass in two other arguments to the executor function, which are the resolve and reject functions. The exexcutor function will contain the asynchronous behaviour, which we are trying to handle with the promise. Therefore it eventually will produce a result value, which will be the future value of the promise.

In our example we say that the chance of winning our lottery is 50%. Therefore we create a random number between 0 and 1, and if this number is larger or equal to 0.5, we win the lottery. In our example this means that the promise we set is fulfilled.

In order to set the promise's settled state to fulfilled, we use the resolve function. Into this function we pass in the fulfilled value of the promise, which then later can be consumed with the then method. Whatever value we pass into the resolve function is going to be the result of the promise that will be availabe in the then handler.

The same applies to rejected state of our promise, for which we use the reject function, which will later be handled by the catch-method. Furthermore we can create a real error object with the new keyword and the Error constructor. This marks the rejected result of the promise as a real Error and also shows us where the error is happening.

In order to acheive asynchronous behavior of our Promise, we wrap the if-else block inside of the executor function in a setTimeout function.

```js
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 😊');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 🎉');
    } else {
      reject(new Error('You lost your money 😭'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
```

## Promisifying

Most of the time we only consume promises. A use case for actually building our own promises is to wrap old callback based functions into promises. This process is also called promisifying. So basically promisifying means to convert callback based asynchronous behavior into promise based asynchronous behaviour.

In this example we will promisify the setTimeout function by creating a "wait".´-function. This function takes a number of seconds as an argument and we create and return a new Promise inside of it. This will encapsulate the asynchronous operation. Basically this is also what the fetch function does. In the executor function of the promise we only need the resolve function in this case, because it is impossible for the timer to fail, which is why the promise will never be in a rejected settle state. Inside the executor function we now call the setTimeout function, which takes the resolve function as a callback and calculates the miliseconds from the given argument of the grandparent function.

Now, if we want to chain multiple asynchronous tasks sequentially, we can do so by returning a new promise, coming from the wait function. This can be handled by a then-method afterwards.

The result is a nice sequential chain of asynchronous behavior, all while avoiding callback hell.

```js
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 seconds passed');
  });
```
#### Example of callback hell

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

## Immediately Resolve or Reject a Promise
It is also important to note, that we can resolve a Promise immediately with the resolve method on the Promise object. The same applies to rejected promises.*/

```js
Promise.resolve('abc').then( x => console.log(x))
Promise.reject(new Error('Error!')).catch( x => console.error(x))
```