# Sticky Navigation

Whenever a certain scroll position on the page is reached, we want the navigation to stick to the top of the viewport. In order to acheive this wil add a class named sticky to the nav container, which will set the position to fixed. Even though there is a more sophisticated way to acheive this, this example shows how to acheive this using the scroll event.

## Using Scroll Event

The scroll event is availabe on the window, not the document. Our created eventListener always will be actiavted as soon as we scroll on our website, which will create a large amount of events. This is way the scroll event is considered to be inefficient and bad for performance.

We want to make the navigation sticky as soon as certain scroll position is reached, in this case the first section. We cannot hardcode the value, because the value is relative to the viewport, hence we will calculate it dynamically. First we get the coordinates of the section with the getBoundingClientRect() method, which we will save in a variable outside of the eventListener. In our case we want to retreat the value which defines the difference to the top, hence we target the value that is saved under the 'top' key.

```js
const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', () => {
  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
```

## Using Introspection Observer API

A better way to acheive this feature is the use of the Introspection Observer API.

This API allows us to observe changes in the intersection (crossing, meeting) of a target eleement with another element or the document's viewport.

To use the introspection observer API we need to create a new instance of the IntersectionObserver constructor. We store the object in a variable and call the observe method on this object to observe a certain target. The IntersectionObserver takes two arguments, the first one being the callback and the second one being an object, which holds a selection of options.

Inside the options object we need to define a root property, which sets the root element which the traget element is intersecting. If we pass in null as a value, the current viewport will be selected. Secondly, the threshold property defines at which percentage of the target's visibility the observer callback should be executed. We can set multiple thresholds, which are then passed in as an array.

The callback function will be called each time the observed element is intersecting the root element if the threshold is exceeded. In our case, if the observed section1 element is intersecting the viewport more than 10%, the observerCallback inside the IntersectionObserver will be executed. This involves scrolling down, as well as scrolling up.

The callback takes to arguments: entries and the observer object itself. In our case we are just interested in the entries. The entries are an array of threshold entries. As soon our target element comes into the viewport, exceeding the threshold of 10%, an IntersectionObserverEntry object will be created. The same happens when the target element leaves the viewport range ,respecting the specified threshold, for the case of scrolling upwards or scrolling further down until less than 10% of the observed target element is visible.

Now we can create an array of thresholds for the threshold property. In this case the first index of 0 says that the callback should be triggered if the target moves completely out of view, as well as when it enters the view. The second index tells the observer to executed the callback as soon as more than 20% of the target intersect with the root.

```js
const observerCallback = function(entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  })
}

const observerOptions = {
  root: null,
  //threshold: .1,
  threshold: [0, .2],
}

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(section1);
```

## Example Introspection Observer

In case of the sticky navigation, we want the navigation to be displayed if the header element is out of view. Therefore we start by observing the header element.

Inside the IntersectionObserver we specify the stickyNav callback and set the options argument directly as an object-literal. We want the navigation to be displayed as sticky as soon as the header element is completely out of view, we therefore set the root to the viewport (root: null) and the threshold to 0. Since we only have one threshold we do not have to loop through the entries inside of the callback, but can get the first entry with destructuring the entries array.

On page load a new IntersectionObserverEntry will be created, with the property 'isIntersecting' to true and the 'intersectionRatio' at 1. If we scroll down and the header leaves the viewport an entry will be created with 'isIntersecting' set to false and the ratio at 0. We can use this to create a condition for when the class of 'sticky' should be added to the nav. So only if the header is NOT intersecting the viewport, we want the class to be added to the nav element, and if it is intersecting, we want the class to be removed.

For fine tuning the appearance of the sticky navigation we can make use of the rootMargin property inside the options object. Here we set the margin to the height of the navbar prepended by the minus sign, so the navbar will appear 90px before the new section begins or the header leaves the viewport.

Additionally, instead of hard-coding the 90px inside the options, we can dynamically calculate this value with the help of the getBoundingClientRect() method. We can call this method on the navigation element and retreat the height from the height property. We then store the value in a variable and can pass it inside a template literal inside the rootMargin.

```js
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
const [entry] = entries;
// console.log(entry);
if (!entry.isIntersecting) {
  nav.classList.add('sticky');
} else {
  nav.classList.remove('sticky');
}
};

const headerObserver = new IntersectionObserver(stickyNav, {
root: null,
threshold: 0,
// rootMargin: '-90px',
rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
```