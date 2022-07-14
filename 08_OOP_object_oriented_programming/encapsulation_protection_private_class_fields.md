# Encapsulation

## Protected Properties and Methods

We built a class for a bank account, which holds sensitive data, such as the PIN, and we implemented several methods as an API. We now want to stop anyone from interacting with the individual properties itself. Also some methods, e.g. which provide a validation for another method should not be accessible from the outside, e.g the approveLoan method.

This also helps us to avoid bugs, since protected properties cannot be overwritten by accident. Another advantage is, that when we only provide a small amount of public methods for interaction, we can be more confident making internal changes, because we know, that external code does not rely on those private methods.

Unfortunately, Javascript classes do not yet support real data privacy and encapsulation. Therefore, we will try to fake encapsulation at first, by using a convention. This convention consists of putting an underscore before the property or method that should be protected, e.g. the movements array. Of course, we could still access this propety/method from the outside by writing the underscore as well, but at least this shows that it is not meant to be accessed. In this case, if we want the movements to be accessed from the outside for example, we can create a getter or a getMovements method, which only purpose is to return the protected movements array.


```js
class Account {
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this._pin = pin;
        this._movements = [];
        this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${owner}!`);
    }
    // Public Interface

    //Securly grant read-only access to the movements
    getMovements() {
      return this._movements;
    }

    deposit(value) {
        this._movements.push(value);
    }
    withdraw(value) {
        // we can call other methods with the this keyword
        // in this case the method is the same but with a different sign
        this.deposit(-value);
    }
    _approveLoan(value) {
        return true;
    }
    requestLoan(value) {
        if(this._approveLoan(value)) {
            this.deposit(value);
            console.log('Loan approved!');
        }
    }
}

const acc1 = new Account('Max', 'EUR', 1111);

acc1.deposit(250);
acc1.withdraw(140);
```

## Private Class Fields and Methods

Private class fields and methods are at the time of writing not yet fully supported, but are very likely to be implemented into the Javascript language in the near future.

The name fields comes from traditional OOP languages, like Java and C++, properties are usually called fields. With this proposal to the language Javascript moves away from the idea that classes are just "synthatic sugar" over constructor functions, because they implement new functionalities, which cannot be achieved with constructor functions.

Fields need to be outside of any method or constructor function.

#### Public fields

A field is like a property, which will be on all instances, hence we can also call it a public instance field. **The field will NOT be on the prototype.**

A class field looks like a reassignment of a variable, but without an actual declaration. It also requires a semicolon at the end of it.

```js
class Account {
    // Public fields (on instances)
    locale = navigator.locale;
    _movements = [];

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this._pin = pin;
        // this._movements = [];
        // this.locale = navigator.language;
    }
}
```

#### Private fields

Private fields finally make the need for faking encapsulation redundant. With private fields properties truly cannot be accessed from the outside of the object. To make a field private we simply prepend the field with a hash. When referencing the field the hash must always be included. If we now try to access the property from outside of the object, we will be greeted with a syntax error.

In order to set a private field with the constructor, simply set the property name, prepended by a hash, but do not initialize it. Then we can initialize the property in the constructor as usual.

```js
class Account {
    // Public fields (on instances)
    locale = navigator.locale;

    //Private fields (on instances)
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
        // this._movements = [];
        // this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${owner}!`);
    }
    // Public Interface

    //Securly grant read-only access to the movements
    getMovements() {
      return this.#movements;
    }

    deposit(value) {
        this.#movements.push(value);
    }
    withdraw(value) {
        // we can call other methods with the this keyword
        // in this case the method is the same but with a different sign
        this.deposit(-value);
    }
    _approveLoan(value) {
        return true;
    }
    requestLoan(value) {
        if(this._approveLoan(value)) {
            this.deposit(value);
            console.log('Loan approved!');
        }
    }
}
const acc1 = new Account('Max', 'EUR', 1111);

console.log(acc1.#movements)    // output: SyntaxError: Private field '#movements' must be declared in an enclosing class
```

#### Public methods

All the methods we've been using so far inside of an object, have been public methods.

#### Private methods

Private methods are very useful to hide the implementation details from the outside. In order to create a public method we can reuse the same syntax we were using for the creation of public fields. At the time of writing, unfortunately no browser offers support for this. When adding a hash before a method, Javascript at this point thinks that we want to create a private field, therefore it puts the method on the instance and not the prototype.

