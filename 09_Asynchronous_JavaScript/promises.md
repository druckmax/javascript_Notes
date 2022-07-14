# Promises

Promises are a an ES6 feature; the following definitions descend in formality:

1. A promise is an object which is used as a placeholder for the future result of an asynchronous operation.

2. It can also be seen as a container for an asynchronously delivered value.

3. Or even less formal: A promise is a container for a future value.

An example for a future value could be the response coming from an AJAX call. When starting the AJAX call we do not have any value, but we know that we certainly get some value.

The two major benefits that promises bring are:
1. We no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results.
2. Instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations and therefore **avoid callback hell** 🎉

Since promises work with asynchronous operations, they are time sensitive, meaning they change over time and can change their state. This is also called the **lifecycle** of a promise.

1. In the very beginning the promises is pending, meaning the state before the future value is available.
2. When the asynchronous task is finally finished, we say that the promise is settled. We distinguish further between two types of the settled state, which are fulfilled and rejected promises. A promises is said to be fulfilled if the future value arrived as expected. A promise is classified as rejected if error occured during the aynchronous task and we did not get the value we wanted.

The states of a promise are very important, since we are able to handle these states in order to react to a success or failure of an asynchronous task.

It is important to note that a promise only settles once. Once settled the promises keeps that state forever and it is impossible to change that state.

The mentioned states are relevant for the case of **consuming a promise**, which means that we use an already existing promises in order to get a result. For example, we use an already existing promise in the case of the returned Fetch API.
But in order for a promise to exist in the first place, it must be built. With the Fetch API, it is the fetch function that builds the promise and returns it to us to consume, so we do not have to build the promise ourselves in this case.

## Consuming promises

## Chaining promises