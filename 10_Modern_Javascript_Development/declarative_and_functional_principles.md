# Declarative and Functional Javascript Principles

There are two fundamentally different ways of writing code in programming, which are also called paradigms. These two paradigms are called **imperative** and **declarative**.

### Imperative:

When writing imperative code, the developer has to explain the program how to do things specifically. He needs to explain the computer every single step it has to follow in order to achieve its goal. As an example, this can be compared to a step-by-step receipe of baking a cake

```js
const arr = [2, 4, 6, 8];
const doubled = [];
for(let i = 0; i < arr.length; i++) {
  doubled[i] = arr[i] * 2;
}
```

### Declarative:

In contrast to imperative code, a declarative way of writing code allows the developer to simply explain the program what to do. We simply describe the way the computer should achive the result, without the need to go through everything step-by-step. These step-by-step instructions get abstracted away from us. To come back to the cake example, a declarative way would be to simple describe the cake to the one who is baking it instead of giving him the receipe.

```js
const arr = [2, 4, 6, 8];
const doubled = arr.map( n => n * 2);
```

## Functional Programming

The declarative paradigm is a very popular programming paradigm, which has given the rise to a sub-paradigm, called functional programming. Functional programming and writing declarative code basically have become the modern way of writing code in the Javascript world. Functional programming is based on the idea of writing software by simply combining multiple so-called *pure functions*, while avoiding side effects and mutating data.

- **Side effects:** A side effect is a modification/mutation of any data **outside** of the function. For example, mutating external variables, logging to console or writing to the DOM, etc.

- **Pure Functions:** A pure functions is a function withoud side effects. It does not depend on external variables eiter. As a rule of thumb we can say that if whe give the same inputs to a pure function, it will always return the same output. This is because it does not depend on external factors, neither does it manipulate them.

- **Immutability:** Functional programming is about avoiding mutating data. This can be achieved with immutability. State, which also means data, is never modified. Instead this state or data is copied and the copy is mutated and returned. A big advantage of immutability is that it makes it easier to keep track of how the data flows through the application.

It is possible for us to mix functional programming or declarative and imperative paradigms in our own code. It is not necessary to go 100% one way. But we can implement some of the benefits of writing declarative code in our own code base, knowing that it will not always be possible to follow the following techniques.

### Functional Programming Techniques:

- Try to avoid data mutations
- Use built-in methods that do not produce side effects
- Do data transformations with methods such as .map(), .filter() and .reduce()
- Try to avoid side effects in functions whenever possible

### Declarative Syntax

- Use array and object destructuring
- Use the spread operator (...)
- Use the ternary operatory
- Use template literals