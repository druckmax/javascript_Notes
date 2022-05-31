# OOP in Javascript

OOP in Javascript differs from the "traditional OOP" and its concept of classes. While Javascript syntax shares the terminology of instantiation, instances and classes, there are no real classes in Javascript, but instead there are prototypes. Every object is linked to a prototype object, we say each object has a prototype. The prototype object contains methods and properties, that every object which is linked to this prototype can access and use. This behaviour is called **prototypal inheritance**. Basically, objects inherit methods and properties from the prototype.

*This inheritance is different from the inheritance we introduced in the general concepts of OOP, which was a class inheriting from another class. In Javascript an instance is inheriting from a prototype(which resembles a class in a way).*

We can also say that objects delegate behaviour to the linked prototype object. This is way the process of prototypal inheritance is also called **delegation**. While in Javscript object methods are delegated to the prototype, in "classical OOP" the methods are copied from the class to all instances.

Example: Each time we are using the map method in array, we can use this method because of prototypal inheritance. Whenever we create an array it inherits all the array-methods from the Array.prototype. We can say that the array we created inherits the methods from the prototype, OR that the array delegates the behaviour of map to the Array.prototype. What matters is that the map method is not defined on the array itself, but on its prototype.

### 3 ways of implementing prototypal inheritance in JS

1. **Constructor Functions:**
    - Technique to create objects from a function
    - How built-in objects like Arrays, Maps or Sets are actually implemented

2. **ES6 classes:**
    - Modern alterantive to constructor function syntax
    - Behind the scenes, ES6 classes work exactly like constructor functions
    - Classes are just a abstraction layer over constructor functions ==> easier syntax
    - ES6 classes do NOT behave like classes in "classical OOP"

3. **Object.create():**
    - Easiest and most straightforward way of linking an object to a prototype object
    - not as frequently used as the other two methods