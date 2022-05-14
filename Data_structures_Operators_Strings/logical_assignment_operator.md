# Logical Assignment Operators

## Logical OR Assignment Operator

This operator assign a value to variable if that current variable is falsy.

Practical examples:
Let's pretend we are getting the restaurants objects from an API and now we want to get the values from the objects that have the numGuests property, but in case they don't we want to set a default value.

    const rest1 = {
        name: 'Capri',
        numGuests: 20,
    };

    const rest2 = {
        name: 'La Piazza',
        owner: 'Giovanni',
    };

Until this point we are able to write it like this:

    rest1.numGuests = rest1.numGuests || 10;    ==> output: 20
    rest2.numGuests = rest2.numGuests || 10;    ==> output: 10

Introducing the OR assignment operator we are now able to write in a more concise way:

    rest1.numGuests ||= 10;    ==> output: 20
    rest2.numGuests ||= 10;    ==> output: 10

## Logical Nullish Assignment Operator

In the previous example we encounter the problem, that if the numGuests is set to 0, we set the default value to that property, even if we want to retrieve the value 0. This is because 0 is falsy value. Instead we can use the Nullish Coalescing operator. To write it in a more concise way we can use the logical nullish assignment opartor.

    rest.numGuests = 0;
    rest2.numGuests ||= 10;    ==> output: 10
    rest2.numGuests ??= 10;    ==> output: 0

## Logical AND assignment operator

Practical example:
We want to anonymize the owner value of the restaurant object.

    rest2.owner = rest2.owner && '<ANONYMOUS>';
    //Using the logical and operator
    rest2.owener && = '<ANONYMOUS>';