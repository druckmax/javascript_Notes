# Menu fade animation

In this case we use mouseover on the parent element of all the items in the navigation bar, since the mouseover event does bubble up. Previously, we used the mouseenter event, which does not bubble up. We also need an eventListener for the state when the mouse leaves the designated area, which holds the oppositional mouse event to the mouseover or mouseenter event. When we use mouseover, the antagonist is mouseout, if we use mouseenter, it is mouseleave.

We also do not need the closest method when looking for the event target like before, because in this example we do not have any elements inside the target, which can be selected by accident, like \<span> or \<p>.

First we select the parent element of the nav__links and again use event delegation to capture the event. If the event matches a nav__link we navigate from the element where the event happens (event.target) to the closest parent element with the class of 'nav' and select all of the children. Therefore we select all the siblings of the element where the event happens. In the same manner we select the logo. The we loop through each of the nav__links and if lower the opacity for all the links that are not the nav__link where the event happens. Outside of the forEach loop we also lower the opacity of the image.

```js
 nav.addEventListener('mouseover', function (e) {
   if (e.target.matches('.nav__link')) {
     const link = e.target;
     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
     const logo = link.closest('.nav').querySelector('img');

     siblings.forEach(x => {
       if (x !== link) x.style.opacity = 0.5;
     });
     logo.style.opacity = 0.5;
   }
 });

 nav.addEventListener('mouseout', function (e) {
   if (e.target.matches('.nav__link')) {
     const link = e.target;
     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
     const logo = link.closest('.nav').querySelector('img');

     siblings.forEach(x => {
       if (x !== link) x.style.opacity = 1;
     });
     logo.style.opacity = 1;
   }
 });
 ```

## Refactoring
Instead of writing an eventHandler function for each event, we can refactor this code to become more DRY, since the only value that is changing is the opacity. Therefore we create a function that takes the event and the opacity as an argument and pass it to the eventListener as the eventHandler function. The problem arises that we cannot simply add the required arguments for the parameters of the function without calling the handleHover function in the event listener, which the eventListener will not accept. Therefore we have to wrap our handleHover function inside of another function, from where it can be called as soon as the required event happens.

```js
const handleHover = function (e, opacity) {
  if (e.target.matches('.nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(x => {
      if (x !== link) x.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
nav.addEventListener('mouseover', e => handleHover(e, 0.5));
nav.addEventListener('mouseout', e => handleHover(e, 1));
```