# Optional Chaining

The optional chaining operator (?.) enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.

Instead of causing an error (*'TypeError: Cannot read property 'x' of undefined'*) if a property is nullish(null or undefined), the expression short-circuits with a value of undefined.

This results in shorter and simpler expressions when accessing chained properties when the possibility exists that a reference may be missing. It can also be helpful while exploring the content of an object when there's no known guarantee as to which properties are required.

    //With optional chaining

    console.log(restaurant.openingHours.mon?.open)

    ==> only looks for open if everythig left of the operator exists (not null and not undefined),
    but if it does not exist, undefined will be returned immediately

    //Without optional chaining

    if (restaurant.openingHours && restaurant.openingHours.mon) {
        console.log(restaurant.openingHours.mon.open)
    }

    This can get quite messy with deeply nested object properties, only to avoid the error message.

    //Chaining:

    console.log(restaurant.openingHours?.mon?.open)

**Real world example:** In this example we want to check the opening hours from a let's say unkown object. We can avoid the error message using the optional chaining property and set a default value if the property does not exist. To avoid that saturday will be read as false, because the restaurant opens at 0 and 0 is a falsy value, we use the nullish coalescing operator (??). Now we can loop through the object and retrieve the values for the opening hours and simultaneously set the value to 'closed' for all the cases where the property does not exist.

    const restaurant = {
        name : 'Classico Italiano',
        openingHours: {
            thu: {
                open: 12,
                close: 22;
            }
            fri: {
                open: 11,
                close: 23,
            }
            sat: {
                open: 0,
                close: 24,
            }
        }
    }

    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']


    for (const day of days) {
        const open = restaurant.openingHours[day]?.open ?? 'closed';
        console.log(`On ${day}, we open at ${open`);
    }

**Optional Chaining and methods:**

    console.log( restaurant.order?.(0,1) ?? 'Method does not exist' )

**Optional Chaining and arrays:**

    const users = [
        {name: 'max'},
        {email: 'max@hello.com'}
    ];

    console.log(users[0]?.name ?? 'User array empty')