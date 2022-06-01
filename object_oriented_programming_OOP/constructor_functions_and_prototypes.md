# Constructor functions and Prototypes

## Constructor functions and the new keyword

Constructor functions have been used since the early days of Javascript to simulate the behaviour of classes in "tradtitional" OOP. Since the behaviour is kind of similar, in the following example we can still say that "max" is an instance of the Person constructor.
Constructor functions always get called with the new operator. It is a rule that when naming a constructor functions the first letter should always be capitalized.

```js
const Person = function(firstName, birthYear) {
    console.log(this)   // output: Person {}

    this.firstName = firstName;     // setting firstName of this object to the argument firstName
    this.birthYear = birthYear;
}

const max = new Person('Max', 1991);
console.log(max)    // output: Person{firstName:'Max', birthYear: 1991}
```

 When calling a constructor function there are 4 steps happening:
 1. A new empty Object {} is created
 2. The function is called and the this keyword is set to the newly created object
 3. The new object is linked to a prototype
 4. The function automatically returns the object

We can check wether an object is an instance of a "class" or a constructor function.

```js
console.log(max instanceof Person)  // output: true
```

The properties inside the constructor function are also called instance properties. Just like we added properties we can also create methods, which  is actually a bad practice. This is because adding this.function() inside a constructor functions means, that every newly created instance of that constructor carries that method respectively. A 1000 created instances of a constructor would mean that we created 1000 copies of that function in every object.

```js
const Person = function(firstName, birthYear) {
    // Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    // NEVER DO THIS
    this.calcAge = function() {
        console.log(2037 - this.birthYear);
    }
}
```

Instead we make use of the prototypal inheritance and set the function to the prototype property of the constructor function. This is how instances of the constructor will be able to delegate behaviour to this prototype, or inherit the methods of a prototype. Concluding, this way we do not have to copy a method to every instance, but give instances the opportunity to use the method which is defined once in the prototype.

```js
Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear)
}
```

## Prototypes

Each and every function in Javascript automatically has a property called prototype. This of course includes constructor functions. Every object which is created by a constructor function will get access to (inherit) all the methods and properties which we define on the constructor's prototype property.

```js
Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear)
}
```

Now every object that is created via the Person constructor function will get access to this method defined in the prototype of the constructor. So there is no need for the method to be on the object itself, because we can use the method which is defined once in the prototype.

```js
max.calcAge()   // output: 46 (2037 - birthYear);
```

We can check for the the prototype in the following ways.

```js
//Checking on the constructor
console.log(Person.prototype)

//Checking on an instance
console.log(max.__proto__)

//The prototype of the max objects is essentially the prototype property of the constructor function.
console.log(max.__proto__ === Person.prototype)     // TRUE

console.log(Person.prototype.isPrototypeOf(max))    // TRUE
//BUT
console.log(Person.prototype.isPrototypeOf(Person)) // FALSE
```
To make it clear, the prototype property of Person is not the prototype of Person, but instead it is what is going to be used as a prototype for the instances. We can think of the Person.prototype property more like a ".prototypeOfLinkedObjects".

An instance is able to to receive a prototype, because the "new" operator gives the instance a prototype (.\_\_proto_\_) and links it to the prototype property of the constructor function.

We can not only set methods, but also properties via the prototype. So every object created from the constructor function will inherit this property. It will not show directly in the objects properties when console.logging, but can be found in the prototypes. This is because the property will not get copied to the object, it is not its own, but the object simply has access to the property in the prototype.

```js
Person.prototype.species = 'Homo sapiens';

console.log(max.species)    //output: 'Homo sapiens'
```

We can check if a property belongs to the object or a prototype with:

```js
max.hasOwnProperty('firstName')     // output: true
max.hasOwnProperty('species')     // output: false
```

### Visual representation:

![prototypal inheritance](/images/oop_prototypal_inheritance.png)

## Prototype Chain

When we call a method which is defined in the object's prototype, the object will first look in the object's own properties. If it cannot find it there, it will look in the prototype, which is defined by the constructor's prototype property. This will create a prototype chain. But the chain will not end there, because the Person.prototype is also an object. It therefore has access to all the methods which are defined in the Object.prototype property, which are the "built-in" methods for objects in Javascript.
The Object.prototype is the end of the prototype chain, so the prototype of Object (Object.\_\_proto_\_) will return null.
The prototype chain is similar to the scope chain, but it is only for prototypes. Whenever Javascript cannot find a certain variable in a scope, it will look for it in the parent scope, the next step in the scope chain. This logic also applies to the prototype chain.

![prototype chain](/images/oop_prototype_chain.png)
