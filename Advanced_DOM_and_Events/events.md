# Events

An event is basically a signal, which is genereated by a certain DOM node. A signal means that something has happened, for example a click or the movement of the cursor. We can then list and react to these events using eventListeners, which track the information of the event. Inside the eventListener we can handle the event with the eventHandler function. But no matter if we listen the event or not, if the user clicks something, this event will always be recognized and generated.

## Types of events

Javascript offers a great variety of different types of events. Events that are frequently used and very important are mouse events and keyboard events.

**Mouseenter:** The mouseenter event is comparable to the :hover pseudo-class, meaning it is activated whenever the user hovers over a certain element.

```js
const h1 = document.querySelector('h1');

h1.addEventListener('mouseenter', function(e) {
  alert('addEventListener: Great! You are reading the heading!');
})

// Using the onEvent property:
h1.onmouseenter = function(e) {
  alert('mouseenter: Great! Your are reading the heading!');
}
```

Events can be handled in different ways, which do not include an eventListener, as shown in the examples below. For every event listed in the MDN reference, there is also a onEvent property, which is not used so much anymore in modern Javascript.
One of the reasons for that is, that the eventListener allows us to add multiple eventHandlers to the same event and the onEvent property does not.
More importantly, an eventHandler can be removed from an event, if it is not needed anymore. This does not need to happen right after execution of the event handler inside of the event handler function, but can added anywhere in the code.

```js
// Removing an event handler
// event handler needs to be a named function first
const alertH1 = function(e) {
  alert('addEventListener: Great! You are reading the heading!');

  h1.removeEventListener('mouseenter', alertH1);
}

h1.addEventListener('mouseenter', alertH1)

// Removing eventHandler after certain time, outside of eventHandler function
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
```

## Event Phases: Bubbling and Capturing

![DOM_event_phases](/images/DOM_capture_target_bubbling.png)

When a user clicks on an element, a link for example, an event is being generated, however not on the element itself, but the root of the document. From there the event "travels" down through the DOM tree to the target element, which is called the **capturing phase**. In this process it will pass through all the parent elements of the target element.

As soon as the event reaches its target, the **target phase** begins. Now events can be handled at the target, for example using eventListeners.

After reaching the target, the event climbs back up the DOM tree to the root, which is called **bubbling phase**. We say that events bubble up from the target back to the document's root, passing through all the parent elements.

This whole process is important to understand, because as the event bubbles through the DOM tree back to the root, it is as if the event happens on every parent element of the target. This means that if we attach another event listener to a parent element, it is like we handled the same event twice, once at the parent and another time at the target.

By default, events can only be handled in the target and bubbling phase, but it is also possible for eventListeners to listen for events in the capturing phase instead.

While most of the events follow this procedure, not all events necessarily need to go through these three phases, some of them are just created on the target.

Capturing and Bubbling can also be described as the propagation of an event; events propagating from one place to another.

#### Bubbling illustration:

In this example we generate a random color for three parent-child related elements, nav__link, nav__link container, navbar.

Setting another random background color to the parent of the nav_link, we can see that the click event on the link is also affecting the event handler of the parent element. This is because of bubbling, meaning the event basically happens on every parent element during this phase. Of course, when clicking in the parent element, the color if the child elements does not change, since the event did not travel further than its target.

We can check where the event happened with e.target. This does not return the element to which the eventHandler is attached. This proves that all the eventHandlers above really handle the exact same event, when the anchor tag is clicked.

If we want to work with the element to which the eventHandler is attached we can use the currentTarget property. The currentTarget is the same as the this keyword inside of the eventHandler function.

Although it is not a good practice, in case we do not want an event to trigger the event handlers of the parent elements, we can stop the propagation with e.stopPropagation().

If we want to change the default behaviour of eventListeners, which is catching events in the bubbling phase, and change it to catching events in the capturing phase, we pass in true as a third argument for the eventListener. In our example we will get the result, but when we look at the console, we will see that the order has changed. The eventHandler for the navbar is executed first, which makes sene, since the event is being generated in the root of the document, and has climb down the DOM tree to the target, where it first encounters the navbar element.

```js
// Create random color for bubbling illustration
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)},${randomInt(0, 255)})`;

// Attach event handlers to nav link and its parents
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target); // returns the a element
  console.log(e.currentTarget); // returns the a element(the element the handler is attached to)
  console.log(e.currentTarget === this); // true

  // Stop propagation: BAD PRACTICE
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINKS', e.target); // also returns the a element
  console.log(e.currentTarget); // returns the links container
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target); // also returns the a element
  console.log(e.currentTarget); // returns the navabar
  // setting to catching events while capturing
}, true);
```