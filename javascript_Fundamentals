# Javascript: Fundamentals

## Type conversion
Manually transforming one data type into another.
Transforming a string into a number can be done with the 'Number'-function.
Transforming a number into a string can be done with the 'String'-function.

	const year = '1991';
	console.log(Number(year) + 18);

Transfroming a string that cannot be transformed into a number gives the output of NaN, which stands for 'Not a Number'. Checking it with typeof puts out that NaN still belongs to the data type number. In other words, it is still a number-type put an invalid one.

	console.log(Number('Max'));
	console.log(typeof NaN);

## Type coercion
Type coercion describes the automatic data type transformations of Javascript.
Concatenating strings and numbers will put out a a single string. This is because of the property of the + operator.

	console.log('I am ' + 30 + 'years old');

Subtracting numbers and strings though, will result in a valid calculation, if the strings can be transormed into valid numbers.
This is because the - operator converts strings to numbers.
The * and / operators also convert strings into numbers automatically.

	console.log('23' - '10' - 3);  ==> 13

But remember this:

	console.log('23' + '10' + 3);  ==> '23103'

-------------------------------------------------------

## Boolean

### Truthy and falsy
Working with boolean-values, there are only 5 falsy values, which are:
1. 0
2. ''
3. undefinded
4. null
5. NaN

Every other value is considered truthy.

### If/else and boolean
If/else statements always coerce data types into boolean values.
If = true, else = false.

	const money = 0;
	if(money) {
		console.log("This output is shown when true")
	} else {
		console.log("This output is shown when false");
	}

In this case the output of the else-statement is shown, because 0 is converted to a falsy value.

-------------------------------------------------------

## Statements and expressions
Statements and expressions in Javascript can be compared to spoken language, with statements being full sentences and expressions single words.
Furthermore, statements don't produce any values, while the main property of expressions is, that they do produce values.
Statements translate our actions into full sentences.

Expressions:

	3 + 4;
	1991;
	true && false && !false;

Statements:

	if (23>10) {
	const str = '23 is bigger';
	//content of str is again an expression
	}

-------------------------------------------------------

## Ternary operator / Conditional operator

It consists of three parts (=> ternary), which are condition, if and else.

	condition ? if : else;

The ternary or conditional operator can be used in exchange for an simple if/else statements and is, just like any other operator, an expression, therefore produces a value, therefore can be asigned to a variable.
The ternary operator can be used to conditionally create variables, as follows:

	const age = 23;

	const drink = age >= 18 ? 'wine' : 'soda';
	console.log(drink);

This is the same as:

	let drink2;

	if (age >= 18) {
		drink = 'wine';
	} else {
		drink = 'soda';
	}
	console.log(drink2);

Another adavantage of the ternary operator over the if/else statement is, that the variable does not have to be declared outside of an statement but can be included inside of the declaration of the variable.
This also means, that with the ternary operator we can have if/else statements inside of template literals:

	console.log(`I like to drink ${age >= 18 ? 'wine' : 'soda';}`);

-------------------------------------------------------------------------------------------

## Functions
There are three different function types which have different properties and are used in different contexts. What these differences are will be clarified in detail in the near future.

1. Function declaration
	Special propety: can be used before it is declared

		function calcAge(birthYear) {
			return 2040 - birthYear;
		};
2. Function expression
	Special property: stores a value in a variable

		const calcAge = function(birthYear) {
			return 2040 - birthYear;
		};
3. Arrow function
	Special property: quick way of writing, good for one-line functions, but has no "this" keyword_

		const calcAge = birthYear => 2040 - birthYear;

### Another example:

	function calcAge (birthYear, firstName) {
		const age = 2040 - birthYear;
		console.log (`${firstName} is ${age} years old`);
		return age;
	}
Functions need to be called and its value can be stored in a variable:

	const age = calcAge(1991, 'Max');

They can also be logger directly to the console:

	console.log(calcAge(1991, 'Max'));

-------------------------------------------------------------------------------------------

## Arrays

Arrays are data structures in Javascript. They can hold any value, including expressions, variables and other arrays. They are zero-based, meaning the first value in the array starts at 0. They are used for scenarios, where the order of  data is essential.

	const lastName = 'Sommerfeld';

	const calcAge = birthYear => 2022 - birthYear;

	const person = ['Max', lastName, 1991, calcAge(1991), anotherArray];

To retrieve a value at a specific position in the array we just select the index of the value:

	console.log(years[2]); => this will output the third value in the array

We can easily change values in the array:

	person[1] = 1996;

This is also possible, if we declared years via const. This is because only primitve values declared in const are immutable. An array is not a primitive value. It's content is therefore mutable. BUT, the array itself cannot be mutated, for example:

	const person = ['Max', 1991, ...]

	person = ['John', 1981, ...]	==> Not possible

	person[1] = 'John'; 		==> possible

To select the last index without counting, we can make use of the .length property, which retrieves the length of the array. Because the .length property is NOT zero based, so it gives out the length of the array counting from 1, we simply subtract by 1 and we get the last index and can receive its corresponding value.

	console.log(person(person.length - 1);

### Methods

Methods are pre-built functions in Javascript, some of which can be directly applied to our arrays:

- .push-method: The push method adds elements to the end of an array:

	 	person.push('hometown');

- .unshift-method: Adds an element to the start of the array: 

		person.unshift('value');

- .pop-method: Removes the last element of the array. Does not need declaration in its parentheses.

		person.pop();

- .shift-method: Removes fist element of an array. Does not need declaration in its parentheses.

		person.shift();

- .indexOf-method: Retrieves the position of an specific element in an array.
			If an element is not inside of the array, indexOf will return -1 as an value.

		person.indexOf('Max');	==> returns: 0;
		person.indexOf('Till');	==> return: -1;
	
- .includes-method: Retrieves wether an element is inside of an array and returns a boolean-value.
			Important: The .includes-method uses strict equality (===).

		person.includes('Max');	==> returns true
		person.includes('Till');	==> returns false
	
-------------------------------------------------------------------------------------------

## Objects
An object is another type of data structure. It can hold any type of expression, including arrays, other objects and function-expressions. One of the main differences to arrays is, that objects hold key-value pairs.
Each of the keys is also called a property. This means, that, unlike arrays, it doesn't matter in which order the values are listed. Therefore objects are used for more unstructured data.
The following way to create a object, by writing it manually ourselves and in curly brackets, is called the 'object literal syntax':

	const Max = {
		fName: 'Max',
		lName: 'Sommerfeld',
		birthYear: 1991,
		friends: [array of friends]
	};

There are two ways of getting a property from an object:

1. Dot-notation

		max.fName

2. Brackets-notation:

	 	max['fName']

	- The bracket-notation allows us to put any expression inside of the brackets:
	
					const nameKey = 'Name';
					console.log(max['first' + nameKey]);
					console.log(max['last' + nameKey]);

	This is also called a computed property.
	
Another example for the use of bracket-notation:

	const = interestedIN = prompt ('What do you want to know? Choose between firstName, lastName, birthYear, friends');

	console.log(max.interestedIn);
	// This will not work because there is no property called interestedIn in the object.
	// The property needs to be computed first, this is why we are using the bracket-notation in this case:

	console.log(max[interestedIn]);

Adding new property-value pairs to the object:

	max.location = 'Leipzig';
	max['country'] = 'Germany';

### Object methods

We can include function-expressions into objects with a slight variation in syntax (see below. A function, that is connected to a specific object is called a method.

	const max = {
		fName: 'Max',
		lName: 'Sommerfeld',
		birthYear: 1991,
		friends: [array of friends],
		hasDriversLicense: true
		
		calcAge: function(birthYear) {
				return 2022 - birthYear;
				}
	};
	console.log(max.calcAge(1991));		==> calling the function with dot-notation
	console.log(max.['calcAge'](1991));	==> calling the function with bracket-notation

### Introducing the this-keyword

To avoid mistakes and following the DRY principle, it is not ideal to input the value in the calcAge function every time.
Instead we can make us of the .this-keyword inside of the object, since we alread have a value that is declared to the birthYear property. The .this-keyword basically sets the scope to the current object. So "this.birthYear" == max.birthYear.

	calcAge: function() {
	return 2022 - this.birthYear
	}

	console.log(max.calcAge());
	console.log(max.calcAge());
	console.log(max.calcAge());

If we need to receive the value on multiple occasions like above, the calcAge function needs to run everytime, which is not ideal, because bigger functions will slow down the script. But we can create a new property inside of the function, that will be added to the object, which then can be called later in the script. So the function only has to run once.
BUT remember, that it has to run once, before wie can retrieve the values with max.age!

	calcAge: function() {
	this.age = 2022 - this.birthYear;
	return this.age;
	}
	
	console.log(max.age);

-------------------------------------------------------------------------------------------

## Loops

A loop is called a control structure, just like an if/else-statement.

### for-loop

In the first statement, the loop is initalized, one time before the execution of the block.
The second statement defines the condition.
(If i is less or equal than 10 (=== true) then run the code block, else (===false) stop.)
The third statement runs everytime the block is executed, in this case i is increased by 1.

	for(let i = 1; i >= 10, i++ )

#### for-loop and arrays

For-loops are very useful to loop through arrays and either retrieve or write data to them.

	const years = [1991, 2007, 1969, 2010];
	const ages = [];	==> creating an empty array, to which we can write our data

	for (let i = 0; i < years.length; i##) {
		ages.push(2022 - years[i]);
		}
		
Looping backwards through array.

	for (let i = years.length-1; i >= 0; i--) {};

#### Continue and break statement

The continue-statement breaks/stops a iteration ,if a specified condition occurs, and continues with the next one.
For example, we only want to retrieve strings from an array:

	for (let i=0; i < array.length; i++) {
		if ( typeof array[i] !== 'string') continue;
	}

The break-statement breaks and jumps out of the loop, if a specified condition occurs.
For example, we want the loop to be terminated if a number occurs.

	for (let i=0; i < array.length; i++) {
		if ( typeof array[i] === 'number ') break;
	}

#### Loops inside loops

Loops can be placed inside loops. In this example, there are three exercises, in which the repition-count is supposed to reach 5.

	for (let exercise = 1; exercise <=3; exercise++) {
		console.log(`Exercise No.${exercise}`);
	
		for let (rep = 1; rep <= 5; rep##) {
		console.log(`Exercise No.${exercise} repition No.${rep}`);
		}
	}

### while-loop

While-loops do not need a counter variable.Their use case is best in situations, in which we do not know how many times the loop needs to run. The following example creates a random number between 1 and 6 and while this number is not 6 the loop repeats logging the number to the console. If the number 6 is generated, the loop stops.

	let dice = Math.trunc(Math.random() * 6)+ 1;

	while (dice !== 6) {
		console.log(`You rolled a ${dice}`);
		let dice = Math.trunc(Math.random() * 6)+ 1;
		if (dice === 6) console.log(`Loop is about to end...`);
	}