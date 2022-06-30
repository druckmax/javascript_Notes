# Page Navigation Using Event Delegation

In order to implement smooth scrolling for page navigation, we can attach an event handler to every link that is pointing to another section. Of course, this is not very efficient.

```js
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();

    // Get attribute from href
    const id = this.getAttribute('href');
    // This will give absoulte URL
    // const id2 = this.href;
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
```
A better way is to use event delegation. We use the fact that events bubble up, so we put an eventListener on a common parent of the nav__link.

 1. Add eventListener to common parent element
 2. Determine what element originated the event with event.target

 In order to match only the elements we are interested in we use match(). In this case we do not want to target clicks that happen on the nav__links container, but only on the anchor elements. Therefore we check for the nav__link class, that is given to the anchor elements. An alternative to matches can be e.target.classList.contains('nav__link')

```js
document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault()
  console.log(e.target); // outputs the element that was clicked

  if(e.target.matches('.nav__link')) {
    console.log('LINK');
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
})
```