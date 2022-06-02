# Object.create()

In addititon to the constructor function and the ES6 classes, Javascript provides a third way for implementing prototypal inheritance, namely the Object.create method. This method's syntax works very differently compared to constructor functions and classes.

Object.create allows us to omit the new keyword. Also there are no prototypes and no constructor functions involved. Instead we can manually set an object to be the prototype of any other object. Of course, behind the scenes instances created with the Object.create method work just the same as instances built in the other two ways.

```js
const PersonProto = {
    calcAge() {
        return 2037 - this.birthYear;
    },
}

const max = Object.create(PersonProto)

console.log(max.__proto__) // output: {calcAge: f}

console.log(max.__proto__ === PersonProto)  //output: true
```

While being the easiest and most straightforward way of implementing prototypal inheritance, it is somehow the least used way in doing so.

![Object.create](/images/object_create_diagram.png)

Mimicing the constructor function in the PersonProto Object, we can simply set a init function, which will be used to create the properties on the newly created instance. But note, that this has nothing to do with the constructor function itself, we simply create a method in a object and set the this keyword to the newly created instance.

```js
const PersonProto = {
    calcAge() {
        return 2037 - this.birthYear;
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

const ania = Object.create(PersonProto);
ania.init('Ania', 1981);
ania.calcAge(); // output: 56;
```