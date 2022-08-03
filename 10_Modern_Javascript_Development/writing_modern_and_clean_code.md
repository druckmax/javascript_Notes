# Writing clean and modern Javascript

This is an overview of some of the guidelines that can help developers write readable, modern and maintainable Javascript code. Remember that rules are made to be broken in some cases, but it can be benefitial to orientate yourself on these guidelines.

### Readable Code

- Write code so that others can understand it
- Write code so that **you** can understand it in 1 year
- Avoid too 'clever' and overcomplicated solutions
- Use descriptive variable names: **what they contain**
- Use descriptive function names: **what they do**

### General

- Use DRY principle (refactor your code)
- Do not pollute global namespace, encapsulate instead
- Do not use **var**
- Use strong type checks (=== and !==)

### Functions

- Generally speaking, functions should **only do one thing**
  Write small functions that that do one thing very well
- Do not use more than 3 function parameters
- Use default parameters whenever possible
- Generally, return same data type as received: A function that receives two numbers should also return a number
- Use arrow functions when they make code more readable, for example in callback functions
  This is a matter of personal opinion, but generally it is good to find a middle ground and use regular functions as well as arrow function wherever they fit best

### OOP

- Use ES6 classes
- Encapsulate data and **do not mutate** it from outside of the class
  Implement a public API instead in order to interact with the data inside the classes
- Implement method chaining
- Do **not** use arrow functions as methods (in regular object), because arrow functions do not get their own this keyword

### Avoid Nested Code

- Use early return (guard clauses) in case some condition is not met
- Use ternary or logical operators instead of if, to avoid building another code block
- Use multiple if instead of if/else-if
- Avoid for loops, use array methods instead
- Avoid callback-based asynchronous APIs

### Asynchronous Code

- Consume promises with async/await for best readability
- Whenevery possible, run pomises in parallel (Promise.all)
- Handle errors and promise rejections