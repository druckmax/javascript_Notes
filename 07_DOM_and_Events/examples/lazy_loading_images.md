# Lazy Loading Images

Lazy Loading can be useful for improving the performance of our website. This technique loads an image not on pageLoad but as soon as we approach the position of the image on our website. Before the image is loaded, a placeholder is put in its place instead and is replaced as soon as we approach the image. This placeholder image is a very small, low-resolution image, that is being loaded when the page loads. In the HTML document the placeholder is selected in the standards src-attribute, while the real, high-resolution image will be referenced in the data-src attribute. In order to conceal the low quality of the placeholder we can use the CSS blur porperty.

Again, we can make use of ther Interection Observer API to implement this feature.
First we select all the images which have the attribute data-src. We loop through the returned node list of this selection, attaching the IntersectionObserver to observe every element in the list. We get the first entry of the entries array, because we only have one threshold defined in the options object. Only if the target is intersection our root, we want the src attribute be replaced with the data-src attribute. We implement a guard-clause, which returns the function if the target is not intersecting.

We cannot simply remove the class 'lazy-img' from the the target element, because on slower networks, the blur filter would be removed before the high-quality image is loaded. Therefore we would reveal the pixelated, low-quality image. This is why we attach an eventListener, which listens to the load-event, which the browser emits as soon as an image is loaded. Once the load event happened, we can then safely remove the blurry filter and reveal the high-quality image.

As a last step in the callback, we can stop observing the images when they completed loading.

Finally, we can declare a rootMargin in the options object, to start loading the images before the user actually reaches their position on the page. This way we can hide the fact that we use lazy loading from the user.

```js
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  else {
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', () =>
      entry.target.classList.remove('lazy-img')
    );
  }
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));
```