# Building a Slider Component

At first the different slides lay on top  top of each other in absolute position. So the first thing to do is to establish the initial state of the slides, namely being side by side using the transfrom property. We do this programmatically in Javascript, since we want the values to be dynamic, depending on which slide is currently selected. We select all the slides and the slider container. The content of the slides is irrelevant in our case.

#### goToSlide() function
We calculate the translate value with multiplying 100 with the current index and adding % as the unit. This will give us our initial state. We set up a curSlide counter which will indicate the slide which is currently selected. To change the tranform values of all the slides when the next slide is selected, we loop through the slides again and subtract the curSlide value from the current index of the slide in the loop. So the different values in the curSlide counter will result in:

```js
curSlide = 1: -100%, 0%, 100%, 200%
curSlide = 2: -200%, -100%, 0%, 100%
curSlide = 3: -300%, -200%, -100%, 0%
```

#### nextSlide() and prevSlide() functions
In order to stop this action at the last slide, we define the maximum number of slides by reading the length of the nodeList. If the curSlide counter reaches the value of maxSlide, we reset curSlide back to 0. The reversed logic is applied to the left button, so if the curSlide is 0 and the button is left button is clicked, set the curSlide to the last slide. Otherwise decrement the curSlide by 1.

#### document.addEventListener('keydown', ...)
In order to being able to navigate the slider with the left and right arrow keys, we must attach an eventListener to the document. Only on the document object key-events will be accessible. If the current event has the key of the desired keyboard key, we call the respective function.

#### createDots() function
For the feature of the dots, which indicate the current position of the slider, we create a function called createDots. Inside of the function we create a div with the class of 'dots' in the HTML and select it in JS. We then loop through the slides and insert the HTML for the button for each slide. We can dynamically set the data-slide attribute by passing in the index of the current slide.

#### Functionality of the dots, dotContainer.eventListener()
We then add an eventListener to the dotContainer using event delegation to add functionality to each of the dots. We check if the event target (where the event is happening) has a class of .dots__dot, then we retrieve the value from the data-slide attribute and call the goToSlide function with this value passed in as the argument.

#### activateDot() function
For the dots to indicate which slide currently is shown, we add a active class to the dot which represents the currently shown slide. Therefore we create a activeDot function, whcih takes a number, that represents the current slide as an argument, and in which we loop over our .dots__dot elements, which we created in the createDots function. At first we remove the '--active' class from every element, in order to then add it to the right slide. We determine the right slide by making use of the data-slide attribute we set on the HTML element. We can now get the right element by dynamically selecting the element which data-slide value matches the current slide. We now pass in the this function in every other function and eventListener which manipulates the display of the slide, basically everywhere where the goToSlide function is called as well.

#### init() function
A clean way to organize the necessary functions, which need to be called right away (goToSlide, createDots, activateDots), we can create an init function, which holds the functions needed for initialization. We then immediately call this function.

#### Function wrapping
With the aim of not polluting the global namespace, we can create a wrapper function, which holds all variable declarations and functions. This way variable and function names do not interfere with the global scope, but are encapsulated in their own scope.

```js
const slider = function() {

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length - 1;

// Functions
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);

// Go to next slide
const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

// Go to previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

// Create Dots
const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></<button>`
    );
  });
};
// Activate Dot Indictator
const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

// Init
const init = function() {
  // Set initial states by calling goToSlide function with 0 as argument
  goToSlide(0);
  createDots();
  activateDot(curSlide);
};
init();

// Event Listeners
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

// Change slides with left and right arrow key
document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowLeft') prevSlide();
  // if(e.key === 'ArrowRight') nextSlide();
  // Short circuting: instead of an if clause we can also write:
  e.key === 'ArrowRight' && nextSlide();
});
// Functionality of the dots
dotContainer.addEventListener('click', e => {
  if (e.target.matches('.dots__dot')) {
    // const slide = e.target.dataset.slide
    // Using destructuring to get the value
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
}
slider();
```