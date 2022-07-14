# Destructuring
## Destructuring arrays

Destructuring is an ES6 feature for unpacking values from an array or an object into seperate variables. Destructuring is breaking down complex data structures into smaller data structures, like a variable.

1. Retrieving single values from an array:

        const arr = [2, 3, 4];

        const [x, y, z] = arr;
        console.log(x, y, z);
        // Do not forget to declare the variables using const or let
        // Original array is not affected, only unpacked

    To leave out an element in an array using this method we can simply skip the index of the array using a space like so:

    let [main, ,secondary] = arr

    This will set our the 'secondary' variable as the third item in the array: Second = 3;
<br>

2. Switching variables:
    To switch main and secondary without modern destructuring techniques we would do something like this:

        const temp = main;
        main = seconday;
        secondary = temp;

    But instead we are now able to this in a more concise way:

        [main, seconday] = [secondary, main ];

3. Retrieve two return values from a function:

        const restaurant = {
            starterMenu: ['Focaccia', 'Bruschetta', 'Garlic bread'],
            mainMenu: ['Pizza', 'Pasta', 'Risotto']
            order: function (starterIndex, mainIndex) {
                return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]],
            }
        }

        const [starterMeal, mainMeal] = restaurant.order(2, 0);
        console.log(starterMeal, mainMeal)  ==> output: Garlic bread, Pizza

4. Nested arrays and  nested destructuring:
    To retrieve a nested array from array we simply apply the method shown in 1., leaving out index[1] and treating the nested array as a single item:

        const nested = [2, 4, [5, 6]];
        const[i, ,j] = nested;
        console.log(i, j)   ==> output: 2, [5, 6]

    To retrieve the individual values inside the nested array we can apply destructuring inside of destructuring:

        const [i, , [j, k]] = nested;
        console.log(i, j, k)   ==> output: 2, 5, 6

5. Setting Default values
    We can set default values for variables while destructuring. This might be useful in cases we do not know the array and its length. For example when we get an array that is shorter than we might think, we try to unpack the array in positions that do not even exist and will get undefined as a result. A usecase can be if we get data from an API. To avoid that we can do:

        const [p=1, q=1, r=1] = [8,9];
        console.log(p, q, r)   ==> output: 8, 9, 1


## Destructuring objects

        const restaurant = {
            name : 'Classico Italiano',
            categories: ['Italian', 'Pizzeria', 'Organic'],
            starterMenu: ['Focaccia', 'Bruschetta', 'Garlic bread'],
            mainMenu: ['Pizza', 'Pasta', 'Risotto']
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

        restaurant.orderDelivery({
            time: '22:30',
            address: 'Somewhere Str. 22',
            mainIndex: 2,
            starterIndex: 2,
        })

1. Retrieving values from object with destructuring:

        const {name, openingHours, categories} = restaurant;

2. Renaming variables of respective keys:

        const {name: restaurantName, openingHours: hours, categories: tags} = restaurant;

3. Default values (in case of trying to read property, that does not exist on object; instead of undefined we want to get the default value):

        const {menu = [], starterMenu: starters = []} = restaurant;

4. Reassigning variables while destructuring objects:

        let a = 111;
        let b = 999;
        const obj = {a: 23, b: 7, c: 14};

        {a, b} = obj;   // SYNTAX ERROR: Javascript expects code block,
                        because of opening curly braces

        ({a, b} = obj)  // Put statement into parantheses

5. Nested object:

        const {fri: {open, close}} = openingHours;
        const {fri: {open: o, close: c}} = openingHours;

6. Destructuring inside a function:
    In this case we add the orderDelivery method to the restaurant object. Then we pass an object into that function, that holds time, address and the order (mainIndex,starterIndex). Inside of the function argument we want to destructure the passed in information and then print a string.
    We can even set default values inside of the argument.
    This use case often appears when handling with third party libraries and dealing with large amounts of parameters.

        restaurant.orderDelivery = function (starterIndex = 1, mainIndex = 0, time = '20:00', address){
            console.log(`Order received! ${this.starterMenu.starterIndex} and ${this.mainMenu.mainIndex} will be deliverd to ${address} at ${time}.`)
        }
    
        restaurant.orderDelivery({
        time: '22:30',
        address: 'Somewhere Str. 22',
        mainIndex: 2,
        starterIndex: 2,
        })