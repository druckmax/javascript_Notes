# Immediately Invoked Function Expressions (IIFE)

Sometimes we need a function that is only executed once and then never again, basically a function that disappears after execution. This will be helpful later for example using async and await.

To do this we simply write the function expression, without assigning it to a variable or writing it as a statement, and then wrap it into parentheses. After the parantheses we can invoke the function with () and the code will be executed.

```javascript
(function() {
    console.log('This will only run once!')
})();

//As an arrow function
(() => console.log('This will only run once!'))();
```

The need for IIFE's arises due to something called data privacy or data encapsulation. We know that functions create scopes, hence variables cannot be accessed from outer scopes. When we encapsulate a variable inside a function we hide it from the outer scope and protect it from being accidentally overwritten by other parts of the program, by external scripts or libraries. Hiding and protecting are important concepts in programming and IIFE's are good solution to do so.

Sine ES6 and the introduction of let and const, we know that these two are block scoped. This opens another opportunity for data privacy in Javascript. If we simply want to protect data from outer scopes, we can just put them into a block.

```javascript
{
    const isPrivate = 23;
    var isNotPrivate = 46;
}
console.log(isPrivate) ==> //not accessible
console.log(isNotPrivate) ==> 46;
```