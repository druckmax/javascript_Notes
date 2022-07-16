# Reveal Sections on Scroll

Revealing the sections as we scroll down with a upward-transforming and fading-in animation, can be also be acheived by using the IntersectionObserver. We use the observer to remove a 'section--hidden' class from the section elements, which set the opacity to 0 and a transform downwards, as soon as we approach those sections in the viewport. When removing this class the opacity will be set to 1 and the transform to 0.

It is important to note, that it is not recommended to already implement the hidden class in the HTML, since some people deactivate Javascript in their browsers and therefore would not be able to see the content. This is why we will add the '--hidden' class with Javascript.

In order to use the same observer for all the section, we select all the sections and store them in a node list. We can then loop over this node list with forEach and attach the sectionObserver to observe each of the elements inside the node list. Also, this is where we add the '--hidden' class to every section element in the list.

Again we seet the root element inside the options object to the viewport (null) and the threshold to a value larger than 0, in order for the animation to appear a little bit before the section is reached completely.

In the callback we get the entry of the entries array with destructuring. Now we make use of the target property inside the entry object, since we want to only reveal the section which triggered the IntersectionObserver, and not all of them. So we remove the '--hidden' class from the target's classList only. We now set a condition so that this operation is only executed when the target is intersecting the root. This is necessary, since the IntersectionObserver creates an entry on pageLoad by default. We create a guard-clause by returning the function immediately if the isIntersecting property returns false.

Additionally we can make the observer stop observing the target element by using the unobserve method, which will be benefital for performance. This way we can stop the observer from creating entry objects once the function has been executed, since we only want the animation to be triggered once. 

```js
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  else entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});
```