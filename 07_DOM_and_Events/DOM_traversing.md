# DOM Traversing

DOM traversing is the navigation through the DOM tree, meaning we can select an element based on the position of another element. This useful for cases in which we need to select an element relative to the position of another element, e.g. a direct child or parent element, or if we do not know the structure of the DOM at runtime.

Firstly, we could call the querySelector method on the a specific element, which will then return all the matching elements, which are children of the parent element.

```js
const h1 = document.querySelector('h1');
```

### Going downwards: children
```js
h1.querySelectorAll('.children_of_h1')

h1.childNodes // returns a nodeList: selecting everything that is a node and a child of h1, including coments, text etc.

h1.children // returns a HTMLCollection: selecting only HTML elements

h1.firstElementChild // returns the first HTML element that is a child of h1

h1.lastElementChild // returns the last HTML element that is a child of h1
```

### Going upwards: parents

```js
h1.parentNode // returns direct parent node of h1
h1.parentElement // returns parent HTML element of h1

h1.closest('.header') // selecting the closest parent element of the h1 element which has the .header class
// closest() can be seen as the opposite of querySelector, while both receive a query selector string. querySelector() looks for children elements, while closest() looks for parents.
```

### Going sideways: siblings
In Javascript we can only select direct siblings, the next sibling and the previous one.
```js
// HTML elements
h1.previousElementSibling // returns previous sibling. If there is none, it returns null
h1.nextElementSibling // returns the next sibling.

// Nodes
h1.previousSibling
h1.nextSibling
```
If we need to get all the siblings, we can move to the parent element and select all the children from there.
```js
h1.parentElement.children
```