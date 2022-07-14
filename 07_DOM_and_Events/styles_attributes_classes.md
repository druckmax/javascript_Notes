# Styles, Attributes and Classes

### Styles

#### Setting styles

In order to set a style we need to get the element and access the style property with the dot notation, followed by the CSS property. Remember to to use the camelCase syntax, e.g. backgroundColor instead of background-color.

Styles inserted by Javascript will be set as inline styles in the HTML element and therefore overwrite styles written in an external CSS file. This also means we cannot read the values of CSS properties, if they are not written as inline-style.

```js
// We reuse the cookie message element here, we create in lesson about selecting
message.style.backgroundColor = "#37383d";
message.style.width = "120%";
```

##### Setting Custom Properties / CSS Variables

We can change custom properties we defined ourselves in the root of our CSS, for example our color variables, with the setProperty method. The method's first argument is the property/variable we want to change and the second argument is the value. In this case we first have to select the whole HTML document with documentElement.

```js
document.documentElement.style.setProperty('--color-primary', 'orangered');
```

#### Getting styles

In order to get the value of a CSS property we can use the **getComputedStyle()** method. The method will return all the CSS properties that are applied on the element. We can then simply select the property we want to access with the dot notation.

```js
getComputedStyle(message).color; //returns the CSS color property's value
```

### Attributes

We can also access the attributes of an HTML element directly with the dot notation, for example the 'src' or 'alt' in an img element. Reading these attributes works only for standard attributes that are expected on a given HTML element. We can not define our own attributes and read them in the following way.

```js
const logo = document.querySelector('.nav-logo');

// Reading
logo.src  // get value of src attribute (absolute version)
logo.alt  // get the alt text of the attribute
logo.className  // gets the value of the classes attribute

// Writing
logo.alt = 'New alt text';
```

If we want to read values of custom attributes set by ourselves, we can use the getAttribute method.
If we want to write custom properties on an element we can use the setAttribute method.

```js
logo.getAttribute('designer');  // returns value of custom designer attribute
logo.getAttribute('src')    // returns value of src attribute (relative version)
logo.setAttribute('company', 'name');
```

**Be Careful with Links:**
When we access a src attribute with the dot notation we will retrieve the absolute value or version. With the getAttribute method we will receive the relative version. In the following example we put a hash in the src attribute to navigate to top of the page. Notice the different outputs:

```js
homeButton.src    // returns http:127.0.0.1:8080/#
homeButton.getAttribute('src'); // output: '#';
```

#### Data Attributes

Data attributes are a special kind of attributes, because they are stored in the dataset property and can be accessed in this way. We can use the dataset property on the element, followed by the rest of the attributes name, written in camelCase:

```html
<img src="..." class="logo" data-version-number="3.0">
```
```js
logo.dataset.versionNumber    // output '3.0';
```

### Classes

Javascript offers a variety of methods to interact with HTML classes. We call the methods on the classList propety of the HTML element. We can pass multiple classes as arguments to the methods.

```js
logo.classList.add('class', 'class2') // adds the class
logo.classList.remove('class')    // removes the class
logo.classList.toogle('class')    // toggles(adds and removes) the class
logo.classList.contains('class')  // checks for class, returns boolean
```

It is also possible to set classes via the className property. But this is not recommended as it overwrites all the existing classes of the element.

```js
// NOT recommended
logo.className = 'class';
```