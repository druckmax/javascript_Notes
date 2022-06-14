# Setters and getters

Every object in Javascript can have setter and getter properties, which are called accessor properties, in contrast to the "normal" properties, which are called data properties. Setter and getter basically are functions that set or get a value, while looking like regular properties.

Setter and getter work for any regular object in Javascript as well as for classes.

```js
const account = {
    owner: 'Max',
    movements: [200, 350, -12, 300],

    // Getting the las element from the movements array
    get latest() {
        return this.movements.slice(-1).pop();
    }
    set latest(mov) {
        return this.movements.push(mov);
    }
};

console.log(account.latest)
//Getter: instead of account.latest();

account.latest = 50;
//Setter: instead of account.latest(50);
```

### Getter
The getters property is useful when we want to read something like a property, but in order to get the property some calculation must precede. So instead of calling the latest() method, we can simply access the returned value with the dot notation (account.latest).

A typical use case for a getter: We always want to return an uppercase version of a name, when the property is requested, while reserving the actual case for internal use.

### Setter
The setter property needs to take at least one argument. Again, the setter makes a method accessible just like a normal property. This allows us to add a item to the array by simply setting the latest property to a value, instead of needing to call the method.

A typical use case for a setter could be checking for validation when setting a name. The following example checks wether a space is included in the string that passed to the function. In case of a setter function and a constructor function trying to set the same property name, this will result in a RangeError, because the constructor function is calling the setter. Therefore it is necessary to create a new property name in the setter. The convention in order to do so, is to put a underscore in front of the property name inside the setter function.

```js
set fullName(name) {
    if(name.includes(' ')) {
        this._fullName = name;
    } else {
        alert('Given name is not a full name')
    }
}
```
The setter in this example is often combined with a getter, because we cannot access person.fullName, because this property does 'currently not exist (it is _fullName). Now when we access person.fullName, the getter function is called, which returns the validated fullName from the setter function.

```js
get fullName() {
    return this._fullName;
}
```


### Getter in a class

```js
class Person {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYeah = birthYear;
    }

    calcAge() {
        console.log(2037 - birthYear);
    }

    // Is the same as calcAge
    get age() {
        return 2037 - birthYear;
    }
}

const max = new Person('Max', 1991);
max.calcAge();
//OR using the get method
console.log(max.age);
``` 