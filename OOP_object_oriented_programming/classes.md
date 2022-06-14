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

### Chaining methods

Just like chaining array methods, we can implement the same functionality in the methods of our class. All we have to do is to return the object itself in the method, which we want to be chainable.

```js
const Account = {
    constructor (owner, pin) {
        this.owner = owner;
        this.pin = pin;
        this.movements = [];
    }
    depositi(val) {
        this.movements.push(val);
        return this;
    }
    withdrawal(val) {
        this.deposition(-val);
        return this;
    }
}
const acc1 = new Account();

acc1.deposit(400).withdrawal(100).deposit(1000);
```

## Practical use case example

In this example we create a class for a newly create bank account. We set the owner, currency and the pin in the constructor, which is then called with the new keyword when creating the account.

We also want to initialize an empty movements array and get the locale from the user. Instead of putting these two properties inside of the constructur function's argument, which would result in the need of passing an empty array and the locale in every newly created account, we can set the empty array inside of the constructor function, prepended by the this keyword. In fact, we can use any code in the constructor functions body, for example a console.log with a greeting message, when a new account is created.

Regarding the movements we could simply target the movements array directly and push new movements to it, positive ones for deposits and negative ones for withdrawals. However, this is considered a bad practice. It is advised to create methods, which handle those interactions. This has the advantage of abstraction, in this case abstracting the fact that a withdrawal is a negative movement, avoiding bugs and dealing with safety issues later on.
These methods we built are the interface to our object, through which other code or applications can interact with it, hence we can say that we built an API, an Application Programming Interface.

```js
class Account {
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.pin = pin;
        this.movements = [];
        this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${owner}!`);
    }
    // Public Interface
    deposit(value) {
        this.movements.push(value);
    }
    withdraw(value) {
        // we can call other methods with the this keyword
        // in this case the method is the same but with a different sign
        this.deposit(-value);
    }
    approveLoan(value) {
        return true;
    }
    requestLoan(value) {
        if(this.approveLoan(value)) {
            this.deposit(value);
            console.log('Loan approved!');
        }
    }
}

const acc1 = new Account('Max', 'EUR', 1111);

acc1.deposit(250);
acc1.withdraw(140);
```

Of course this does not stop someone to interact with the individual properties itself, yet. Also other methods which provide a validation for another method should not be accessible from the outside, e.g the approveLoan method. This should not be possible in a real world application. This shows the necessity