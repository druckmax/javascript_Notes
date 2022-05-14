# Short circuiting ( && and ||)

Logical operators can USE any data type, return ANY data type and can do short-circuiting or also called short-circuit evaluation.
In general we can use the || operator to set default values and the && operator check for a property and then return the second part of the operation, basically replacing a simple if-statement.

## Logical || operator

In case of the || operator, short-circuiting means, that if the first value is a truthy value, it will immediatly reutrn this first true value and stop the evaluation, so the following values will be ignored.

	console.log(3 || 'Max');	==> output: 3

If no value retruns truthy, the last value will be returned.

	console.log(undefined || null)	==> output: null

Practical examples:
Wen want to retreive the number of guests from the restaurant object and store it in a variable. But in case we cannot do that or the property does not exist, we want to set a default value.

	const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;	==> output: 10

In this case we can take advantage of the short-circuiting of the || operator.

	const guests 2 = restaurant.numGuests || 10;	==> output: 10

IMPORTANT: Note that this solution works only for truthy numGuests values. If we want to return that the number of guests is 0, this will return 10, because 0 is a falsy value. A solution for this would be the nullish coalescing operator (??).

## Nullish coalescing operator (??)

The nullish coalescing operator works with the idea of nullish values instead of falsy ones. Nullish values are: null and undefined (NOT 0 or ''). Note that 0 and '' are treated like truthy value in this case. So the ?? operator only short-circuits if a value returns null or undefined.

	restaurant.numGuests = 0;
	const guests3 = restaurant.numGuests || 10;	==> output: 10

	const guestsFIX = restaurant.numGuests ?? 10;	==> output: 10


## Logical && operator

In case of the && operate, short-circuiting means, that if the first value is a falsy value, it will immediately return this first falsy value and stop the evaluation, so the following values will be ignored. If the first evaluation returns truthy, the && operator continues its evaluation until the end or a falsy value is reached, which then will be returned.

	console.log(0 && 'Jonas')	==> output: 0

Practical example:
Let's pretent we don't know if the function order.Pizza exists in the restaurant object. But in case it does, we want to pass in two values.

	if(restaurant.orderPizza) {
		restaurant.orderPizza('mushrooms', 'spinach');
	}

Many times we can use the && operator to avoid using an if-else statement, if all we want to do is to check if an property or value exists.
In this case the && operator will short-circuit if the restaurant.orderPizza function does not exists.

	restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
