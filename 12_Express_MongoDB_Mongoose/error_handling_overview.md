# Error Handling: Overview

To get a general overview of error handling in Express, we start by distinguishing between two types of errors that can occur: **operational** and **programming** errors.

1. **Operational Errors** are errors that we can assume will happen at some time in the future. This is why we can handle them in advance. Operational errros have nothing to do with bugs in our code, but they depend on the user, the system or the network.
   Some examples are:

   - Invalid path accessed
   - Invalid user input (mongoose validator error)
   - Failed to connect to the server
   - Failed to connect to the database
   - Request timeout
     <br>

2. **Programming Errors** are bugs that are accidentally introduced by the devlopers. It is difficult to perpare for these kinds of error, because they are seldomly predictable and hard to find. Some examples are:

   - Reading properties of undefined
   - Passing a number where an object is expected
   - Using await without async in a function
   - Using req.query instead of req.body

When we talk about error handling in Express we mainly mean handling of operational errors.
Express comes with error handling functionalites out of the box. All we need to do is to write a global express error handling middleware, which can catch errors coming from all over the application. The big advantage is that all errors end up in a central place. This allows a nice separation of concerns, so we do not have to worry about error handling in the business logic or in our controllers, for example.

Handling can mean that we simply send a response back to the client, letting it know what happened. But in other cases it can also mean that we try to repeat the operation, willingly crash the server or just ignore the error.
