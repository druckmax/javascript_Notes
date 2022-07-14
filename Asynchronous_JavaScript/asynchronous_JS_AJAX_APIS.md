# Asynchronous Javascript, AJAX and API's

### Synchronous vs Asynchronous

Most code is **synchronous**, which means that the code is executed in the exact same order in which it was written. In doing so, each line of code waits for the previous line of code to be finished.
This can become a problem, e.g. if a line of code takes a very long time to run. A good example is an alert window, which will block the code execution and waits for the user to close the window before continuing.

![synchronous_code](/images/asynchronous_example_blocking_code.png)

**Asynchronous** code on the other hand is executed *after* a task that runs in the background has finished. This means that code is not being blocked by a certain task, waiting for it to finish. A good example is the setTimeout function, which will run asynchronously. Only after the specified time the code inside the timer function is executed, while the code, which comes after the function can be executed regularly. It may be important to note, that callback functions alone do not make code asynchrnous. Only a certain callbacks do, which is why it is important to get to know them.
Summarizing we can say, that asynchronous programming is a program's coordination of behaviour over a period of time.

![synchronous_code](/images/asynchronous_example_non-blocking_code.png)

Another good example is the asynchronous loading of an image. In this code example we set the src attribute of an image element and attach an eventListener on the image, listening for the load event, which is fired as soon as the image has been fully loaded. Inside the eventHandler we add a class to the image in order make it visible. While the image is still loading, the styling of the p element in the last line can be executed normally.
Setting the src attribute of any image is an asynchronous operation, because it is being executed in the background. This makes sense, since we do not want the rest of our code to be blocked while the image is still loading. This example shows how we can make use of asynchronous operations in combination with callback functions, executing them after a certain amount of time. Again, it is important to note, that eventListeners do **NOT** make code asynchronous by default. What makes the eventListener in this case work asynchronously is the fact, that the image is loading asynchronously, and not that we are waiting for the load event to happen.

![synchronous_code](/images/asynchronous_example_non-blocking_code_02.png)

### AJAX Calls

AJAX stands for Asynchronous Javascript and XML and allows us to communicate withe remote web servers in a asynchronous way. With AJAX we can request data from web servers dynamically.
The name AJAX can be misleading, because it is more common to transport data as plain text in the JSON format, which is the most popular API format, than using the XML format.
For example we want to request data from a web server containing information about countries. We send this request and get a response, holding the information we asked for. All this is being executed asynchronously in the background.
When we request data from a server, this server usually contains a Web API, which holds the data we are asking for.

![synchronous_code](/images/asynchronous_AJAX.png)

### API

API stands for Application Programming Interface and is a piece of software that can be used by another piece of software, in order to allow applications to communicate. In web development we are facing a broad variety of different Web APIs, e.g. the DOM API or the Geolocation API. We can also create our own APIs, e.g. in a class, where we make certain methods available as a public interface. They all share the fact, that they are self-contained, encapsulated pieces of software, that other pieces of software can interact with.
When using AJAX we are interested in a certain type of API, which can be called an "Online" API, Web APIs or simply APIs. This API is basically an application running on a server, which receives requests for data and sends data back as a response.