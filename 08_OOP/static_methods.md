# Static methods

Static methods are methods which are attached to the constructor itself and not to the prototype property of the constructor. This means that instances do not inherit this kind of method, meaning we cannot access static methods on an instance of a constructor, because it is not on their prototype.

In the following example, we can also say that the from method is in the Array's name space.

```js
Array.from(document.querySelectorAll('h1')) // will return an array from a node list

[1,2,3].from()  // TypeError: is not a function
```

We can easily create static methods ourselves. In the following example we attach a method to the Person constructor, which will then only be availabe there, and not be inherited by its instances.

#### Static method in constructor function
```js
Person.hey = function() {
    console.log('Hey there *wave*');
};
Person.hey()    // output: 'Hey there *wave*'
max.hey()       // TypeError: max.hey is not a function
```

#### Static method in classes

Attaching static methods in classes is even easier. We simply have to add the static keyword to a function. All the other function which omit the static keyword are also called instance methods.

```js
class Person {

    static hey() {
        console.log('Hey there *wave*');
    }
}
```