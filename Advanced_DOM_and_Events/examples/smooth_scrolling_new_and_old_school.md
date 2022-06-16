# Smooth Scrolling: New and Old School

### Old School:
First we need to get the coordinates of the element we want to scroll to. We do this with the <code>getBoundingClientRect()</code> method.

We call the <codescrollTo</code> method on the window object. Then we calculate the absolute position of the element by adding the <code>pageOffset</code> for the respective axis. This needs to be done, because our coordinates only return a relative value based on the distance to the top of the viewport. We retrieve the values from our coordinates for the axi with the .left and .top properties.

In order to enable smooth scrolling we can to this calculation inside of an object and get access to the behavior key, which we can set to smooth.

```js
// Smooth scrolling
btnScrollTo.addEventListener('click', function (e) {
  // Get coordinates of the section
  const s1coordinates = section1.getBoundingClientRect();

  // Old School Scrolling
  // Needs calculation/adding of pageOffset to determine absolute position of the section, otherwise it is just relative to the viewport
  window.scrollTo(s1coordinates.left + window.pageXOffset, s1coordinates.top + window.pageYOffset);

  // In order to enable smooth scrolling we wrap the calculation in a object and add the behavior key.
  window.scrollTo({
    left: s1coordinates.left + window.pageXOffset,
    top: s1coordinates.top + window.pageYOffset,
    behavior: 'smooth'
  })
});
```

### New School:
Inside of the event handler, we select our DOM element and call the <code>scrollIntoView></code> method on it. In the argument we create an object, access the behavior property and set it to smooth.

```js
  // New school way (works only in modern browsers)
  section1.scrollIntoView({ behavior: 'smooth' });
```

Other useful information can be accessed with the following properties and methods:

```js
  // We can get coordinates of the button / where the event happened.
  console.log(e.target.getBoundingClientRect());
  // We can get current scroll position in X and Y direction
  console.log(window.pageXOffset, window.pageYOffset);
  // We can read witdth and height of viewport
  console.log(
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
```