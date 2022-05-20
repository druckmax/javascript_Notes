# Looping Objects: Keys, Values and Entries

Even though objects are not iterable but enumerable, we can loop over them in an indirect way, targeting the keys, values or entries.

## Using for...of loop and Object methods

We can make parts of the object iterable with mutating it to an array. This can be done with Object methods:
- Object.keys(): creates an array of all the keys
- Object.values(): creates array of values
- Object.entries(): creates an array with the key value pairs inside an array

Examples:

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

**Example 1:** In this example we can retrieve the number of days the restaurant is opened from the length of the array we created from the object keys. We can then loop over the array and append the items to the end of our string.

    const properties = Object.keys(openingHours);
    console.log(properties) ==> output: ['thu, 'fri', 'sat']

    let openStr = `We are open on ${properties.length} days:`
    for (const day of properties) {
        openStr += `${day}, `;
    };

**Example 2:** In this example we take each key and value inside restaurant.openingHours and make an array out of it. Using the destructuring inside the for...of loop can be extremely powerful, since we can assign an individual variable for the key, and knowing that the value of the key is an object, we can destructure even further and assign a individual variable for the open and close property.

    const entries = Object.entries(openingHours);

    for (const [key, {open, close}]) of entries) {
        console.log(`On ${key} we open at ${open} and close at {close}.`);
    }