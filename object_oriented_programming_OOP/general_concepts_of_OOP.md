# Object-Oriented Programming (OOP)

## General concept

Object-oriented porgramming is a programming paradigm ("style of how the code is written") based on the concept of objects. We use objects to model or represent real world as well as abstract features. Real world features could be a user or a to-Do list, while abstract features are data structures or a HTML component.
Objects may contain data (properties) and code (methods). By using objects, we pack data and the corresponding behaviour into one block.

<img src="/images/oop_data_and_behaviour.png" width="150px" style="float: right; padding: 0 2rem">

In OOP, objects are self-contained pieces/ blocks of code and can be seen as small applications on their own. We then use objects as building blocks of our application and make them interact with one another. These interaction happen through a public interface (API). Basicall this interface is a collection of methods,which the code outside of the object cann access and use to communicate with the object.

OOP was developed with the goal of organizing code, to make it more flexible and easier to maintain. It helps to avoid "spaghetti code", which is code that is scattered across multiple functions or even in the global scope, without any structure. Today OOP is the most popular and most widely used programming paradigm in large scale software engineering, though it is not the only paradigm to fulfil this purpose, e.g. functional programming.

### Classes

In OOP we need a way to programatically create new objects from our code. In order to do so, in traditional OOP classes are introduced. **A class is like a blueprint from which we can create new objects**, based on the rules set in the class. Just like a blueprint in architecture, this blueprint is just the idea and basic framework of an object, but it is not an object because it is nothing tangible. We can simplify that a class does not hold "real-world" data, but it describes how data is organized inside an object. When we create an object from a class, we call this process instantiation. The newly created object is an instance of the class it was created from. This instance now holds "real" data, based on the framework given by the class. We can now create as many instances from this class as we need, which all can contain different data, but maintain the same functionality and order.

#### The 4 fundamental principles of OOP (How to design classes)

The following four principles can also be used outside of OOP, but are especially important to this paradigm of programming.

- **Abstraction:** Ignoring or hiding details which "do not matter", allowing us to get an overview perspective of the thing we are implementing, instead of dealing with low-level details which do not really matter in regards to our implementaion.
Example 1: A phone hiding all the configurations, which are essential to its functionality but do not really interest the user, reducing the interface to 3-4 buttons, the user can interact with.
Example 2: Taking the addEventListener method, we do not really know how this function works in detail, but in the outmost cases we do not have to. The low-level details have been abstracted away from us.
<br>
- **Encapsulation:** Keeping properties and methods private inside of the class, so they are not accessible from the outside, but only from inside the class. However, some of these methods can be exposed as a public interface (API). This concept helps us to prevent external code accidentally manipulating internal properties and states(state refers to an object's data), which is a frequent cause of many bugs.
<br>
- **Inheritance:** Making all properties and methods of a certain class available to a child class, forming a hierarchical relationship between classes. This allows us to reuse common logic and to model real-world relationships. ❤️
Example: An admin class inherits all the properties from a user class (login, logout, name, pw, etc.), since an admin is just a user with extended permissions. So the admin class is the child which inherits all the properties and functionality of its parent class, the user class, which then forms a hierarchy between these two classes. Of course, the child class then can have its own methods for example, which will extend the functionality of the class, making it more specific.
<br>
- **Polymorphism:** Simplified polymorphism means that a child class can overwrite a method it inherited from a parent class.

    ![oop polymorphism](/images/oop_polymorphism.png)