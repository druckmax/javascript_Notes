# Spread operator vs. rest pattern

## Spread operator

The spread operator in general is used for retreiving individual values from inside of an object.
The spread operator works similar to destructuring, because it helps to get single values out of an object, which we otherwise had to write individually, seperated by commas. The difference is, that the spread operator takes all the values from an object and it also does not create new variables.

	const arr = [7,8,9];

	console.log(arr);	==> output [7 8 9]
	console.log(...arr);	==> output 7 8 9

We can only use the spread operator when building an array or passing an array/multiple values to a function.

	const str = 'Max';
	console.log(`${...str} Sommerfeld`)	==> THIS WILL NOT WORK

The spread operator is used for merging arrays into an new array. Instead of accessing the individual indexes of the array one by one to merge it into the new array, we can do as follows:

	const newArr = [1, 2,...arr] ==> output [1, 2, 7, 8, 9]

Practical usecase, creating a new menu from the main menu and adding items to it:

	const restaurant = {
		mainMenu: ['Pizza', 'Pasta', 'Risotto'],
	};

	const newMenu = [...restaurant.mainMenu, 'Gnocci'];

The spread operator is often used to create shallow copies of arrays:

	const mainMenuCopy = [...restaurant.mainMenu];

Joining several arrays:

	const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

Applying spread on strings, retrieving all the individual letters of the string:

	const str = 'Max';
	const letters = [...str, ' ', 'S.'];
	console.log(letters) ==> output: ['M', 'a', 'x',' ', 'S.']
        
## Rest pattern

The spread operator and the rest pattern share the same syntax, but the rest pattern does the opposite of the spread operator. It is collecting multiple elements and packing it into an array.
While the spread operator is expanding an object, the rest pattern is compressing.

1. Spread syntax, because on right side of = :

		const arr = [1, 2, ...[3, 4]]; 
		console.log(arr); ==> output [1, 2, 3, 4]

2. Rest syntax, because on left side of = :

		const [a, b, ...others] = [1, 2, 3, 4, 5];
		console.log(a, b, others) ==> output [1, 2, [3, 4, 5]]

We can use the rest pattern syntax if we do not know how many arguments are going to be passed into a function. In this case we are talking about a rest parameter. The rest paramter takes the incoming values and packs them into an array.

	const add = function(...numbers) {
		console.log(numbers);
	}

	add(2,3)	==> [2, 3]
	add(5,3,7,2)	==> [5,3,7,2]
