# Selecting, Creating and Deleting elements

#### Selecting

```js
//document.documentElement
document.head // selects the <head>
document.body // selects the <body>

// selects an element by an query string'(#id,''.class','html-tag')
// returns the first element it can find
document.querySelector() 

// Selects all elements that match the query-string
// Returns a node list
document.querySelectorAll()

document.getElementById('id') // selects an element by the specified id

// Selects all elements with specified tag name
/* Returns an HTML-Collection, also called live-collection,
because it automatically updates when DOM changes */
document.getElementsByTagName('tag-name');

// Selects all elements with specified class name
// Returns HTML collection
document.getElementsByClassName('class-name');
```

#### Creating

```js
/* Takes the position as an arguemt:

"beforebegin" - Before the element
"afterbegin" - Inside the element, before its first child
"beforeend" - Inside the element, after its last child
"afterend" - After the elemnt

The text is parsed as HTML and inserted into the tree.
*/
Element.insertAdjacentHTML(position, text);

// Creates a div element and stores it in variable
// The element is just created and not in the DOM yet
const message = document.createElement('div');

// Adds a class to the newly created div element
message.classList.add('class-name')
// Inserts text to div
message.textContent = "Lorem ipsum..."
// Inserts HTML into element
message.innerHTML = '<button class="btn">Click</button>';
```

#### Insert

```js
const header = document.querySelector('header');

// Inserting message before the header element as a sibling
header.before(message);

// Inserting our element as the first child of the header
header.prepend(message);

// Inserting as the last child
header.append(message);

// Inserting after element as a sibling
header.after(message);
```

Prepend() and append() cannot be used at the same time for the same element. Since our message element is now a live element in the DOM it cannot be at multiple places at once, since a DOM element is uniqe. But this also means that we can use prepend and append to move existing elements inside the DOM.

If we wanted to message to appear in multiple places we first need to clone the message. This can be done with cloneNode.

```js
header.append(message.cloneNode(true));
```
