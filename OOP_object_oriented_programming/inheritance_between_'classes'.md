# Inheritance between 'classes' in JS

Previously we explored how objects can delegate behaviour to their prototype or can inherit methods via its prototype, defined in its constructor's prototype property.
Now we want to implement the concept of "traditional" OOP into Javascript, namely the inheritance between classes, and not just prototypal inheritance between instances and a prototype property. We will use 'class' terminology from here on, simply because it makes it a bit easier to understand, even though "real" classes do not exist in JS.

In the following example we will create a new Student class and make it inherit properties from the Person class, hence Person will be the parent and Student will be the child. This is useful, because the Student class is basically a sub-type of the Person class. All the properties and methods from the Person class also apply to the Student class, but Student is a more specified version of Person, which makes it an ideal child class for the Parent class.

![inheritance_classes](/images/oop_inheritance_classes.png)

## Constructor functions

If we want a constructor function to inherit properties and methods from another constructor function, we need to call the parent function inside the child constructor function with the call method. This is necessary, so we can set the this keyword manually to the new "sub-class". Just calling the parent constructor does not work, because in a regular function call the this keyword is set to undefined.
Afterwards we manually have to set the \_\_proto\_\_ of Student.prototype to Person.prototype. In order to create this connection we will use the Object.create() method, since binding prototype manually is exactly what Object.create() does. Now the Student.prototype object is now an object which inherits from Person.prototype. This connection needs to be made before we add any more methods. to the Student.prototype, because Object.create() will return an empty object. It is this empty object we can then add further methods to. If this order is not obtained, Object.create() will simply overwrite any method, which was written beforehand.

```js
const Person = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};
Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
};

const Student = function(firstName, birthYear, course) {
    Person.call(this, firstName, birthYear)
    this.course = course;
}

//Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function() {
    console.log(`My name is ${this.firstname} and I study ${this.cours}`);
}

const mike = new Student('Max', 1991, 'Web Development');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__) // contains introduce method ==> Student.prototype object
console.log(mike.__proto__.__proto__) // contains the calcAge method ==> Person.prototype object
```

![inheritance constructor](/images/oop_inheritance_constructor_functions.png)

We cannot simply set Student.prototype = Person.porototype, because we do not want the Student.prototype to be exactly the same prototype property as the Person.prototype. This would not create a prototype chain and inheritance. Any methods added to child would also be availabe on the parent. We only want the children to inherit methods and properties from the parent and not vice versa.

![bad example inheritance](/images/oop_bad_example_inheritance.png)

## ES6 classes

To achieve inheritance between ES6 classes we need to ingredients, which are the extends keyword and the super function. The super function is basically calling the constructor function of the parent class. This means we do net need to Object.call the parent object here, but the super function needs to come first as it is also responsible for setting the this keyword in the sub-class.

```js
class PersonCL {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYeah = birthYear;
    }

    calcAge() {
        console.log(2037 - birthYear);
    }
}

class StudentCL extends PersonCL {
    constructor(firstName, birthYear, course)
    super(firstName, birthYear);
    this.course = course;

    introduce() {
        console.log(`My name is ${this.firstName} and I study ${this.course}.`);
    }
}

const max = new StudentCl('Max', 1991, 'Web Development');

max.introduce() // access methods of the sub-class
max.calcAge()   // access methods of the parent class
```

In case we are not adding new parameters to the subclass we can even omit the constructor and super function and create a sub-class with the extends keyword only.

```js
class StudentCL extends PersonCL {
}

const martha = new StudentCL('Martha', 2012);
```

## Object.create

Using the Object.create method, we can simply create a new StudentProto object from the PersonProto object. Now StudentProto inherits from PersonProto and establishes a prototype chain. Thereore, a newly created object from the StudentProto will inherit all properties and methods from the PersonProto prototype as well.
Afterwards, when adding an extended init method for the StudentProto, we can make use of the init method in PersonProto by calling this method with call(), where we will set the this keyword and the properties from the parent Proto Object. We can simply add more parameters after this.

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

const StudentProto = Object.create(PersonProto);
StudentProto.init = function(firstName, birthYearh, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}

const max = Object.create(PersonProto);     //has PersonProto as prototype
const till = Object.create(StudentProto)    // has StudentProto as prototype