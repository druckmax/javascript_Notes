# ES6 classes

Classes in Javascript are used to condense the syntax of the constructor function, making it less code to write, organizing the code in a nice code block and making it easier for people to understand, who are coming from different prorgramming languages. Behind the scenes classes still implement prototypal inheritance and still are a special kind of function.

Inside the class we then define a constructor, which is similar to the constructor function, but in this case is a method of the Class, so it needs to be called constructor. We pass our arguments, we want the object to have, into the constructor method.

When creating a new instance from a class, the procedure is the same as calling a constructor function, since in this case we are just calling the constructor method inside of the calss. Hence, we use the new keyword and the name of the class to create a new instance.

A big improvement in contrast to constructor functions is, that we now simply add prototypes by defining a method inside the class, but outside of the constructor.

```js
// Class expression
const Person = class {};

// Class declaration
class Person {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYeah = birthYear;
    }

    calcAge() {
        console.log(2037 - birthYear);
    }
}

const max = new Person('Max', 1991);
max.calcAge();
```

### Important characteristics of Classes

1. Classes or NOT hoisted: This is true even for class declarations, in contrast to function declarations, which are hoisted. This means we cannot use clases before they are declared in the code.

2. Classes are first-class citizens: This means we can pass classes into functions and even return classes from functions.

3. Classes are executed in strict mode: The body of a class is always exectued in strict mode, even if we do not use strict mode in our script.