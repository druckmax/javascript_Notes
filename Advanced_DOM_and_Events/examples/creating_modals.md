# Creating modals

Modals are pop-up windows, that appear when a button is clicked, and disappear when a an exit-button is pressed, the user clicks outside of the modal or hits the escape key. A good practice involves adding and removing CSS classes via Javascript.

Firstly, we can create variables at the top of the script, that refer to our respective classes. This helps following the DRY-principle and makes our code more readable.

```js
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsShowModal = document.querySelectorAll('.show-modal');

/* =>  querySelectorAll is used in the last variable because there are multiple elements with the class of modal,
and otherwise only the first element would be selected */
```                                

Secondly, it is a good practice to create functions for actions, that will be carried out repeatedly. In our case, this includes opening the modal and closing it. Via the .classList method we can remove and add classes, as well as check wether a certain class is assigned. Here the class of 'hidden' is already assigned to the modal in CSS and by simply removing this class we can make the modal visible.

```js
const openModal = function () {
    modal.classList.remove('.hidden');
    overlay.classList.remove('.hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};
```

We then simply assign these functions to the elements that should carry out the action. For that, we can call out previously assigned functions as the second argument of the addEventListener. We also say, that this attaches an event handler.

```js
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
```

To include the feature of exiting the modal via pressing the escape key, we attach an global event handler to the document object. Doing this allows us to retrieve information, which is collected by the DOM in an object, each time a keystroke is exectued. Therefore we must pass in an argument to the function in the event handler. In this case we decided to call it 'e' for 'event'. To thin out the information provided to us, we add the .key method, which will only retrieve the pressed key-identifier, in our case 'Escape'.

```js
document.addEventListener('keydown', function (e) {
    console.log('A key was pressed');   ==> this shows us wether a key was pressed
    console.log(e);                     ==> This shows us all information about the keystroke
    console.log(e.key);                 ==> This only shows us the key-value of the pressed Key
```

Now that we've got the necessary information, we can build the function. This function tells the script, that if the escape key is pressed AND if the .modal does not contain the class 'hidden', we want to close the modal:

```js
    if (e.key === 'Escape') {
        if (!modal.classList.contains('hidden')) {
            closeModal();
        }
    }
```

A better and more concise way of writing this, is the following:

```js
    if(e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
```
