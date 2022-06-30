# Tabbed Component

In this example we want to create a tabbed component. If a button/tab is clicked, a different text area is shown. The HTML contains an active class, which we add and remove in order to change the appearance. The buttons also have an attribute named "data-tab" which contains a number. With this number we will dynamically target a class in the content property, in order to show the right content.

We again use event delegation, setting the eventListener on the parent element. After that select the closest parent element with the class name "operations_tab" in order to make it possible that when a span or p-tag inside the button is clicked, the button element is still selected. When the button element is clicked it will refer to itself.

If no matching parent element ca be found it will return null. If we click in the tabs container we will get null as a result. Therefore we can implement a guard clause, which will end the function immediately, if the user clicks the tabs container and the function will return null.

The tabs slightly move up in position when the class is active. In order to make the other tabs go down, we remove the class from all the tabs at first, before adding it to the tab that is being clicked.

In order to activate the respective content area when the button is clicked, we receive the information from the data-tab attribute in the HTML. We use the dataset attribute, which will select the html attribute data and tab do get the value of the attribute, because itis called data-tab. We can then target the right content area by dynamically selecting the right class using a template literal. After that we add the an activation class to the element, which will show the content. The active class contains a css display property that is not display:none.


```js
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
  // Getting the closest parent with specified class name
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if(!clicked) return;

  // Remove and add active state on button
  tabs.forEach(x => x.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active');

  // Remove active class from all the other elements
  tabsContent.forEach(x => x.classList.remove('operations__content--active'));
  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})