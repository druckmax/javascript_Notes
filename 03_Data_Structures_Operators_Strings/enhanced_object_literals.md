# Enhanced Object Literals

ES6 intoduces a new concise way to write object literals. Firstly, we are given a more concise way to include external object variables inside of another object, without repeating the same name for the key and value property.

    const openingHours =
                thu: {
                    open: 12,
                    close: 22;
                }
                fri: {
                    open: 11,
                    close: 23,
                }

    const restaurant = {
        //Before ES6
        openingHours = openingHours

        //Now
        openingHours
    }

Similar to this, we can shorten our syntax for object methods, leaving out the function keyword:

    const restaurant = {
        //Before ES6
        order: function (x,y){},

        //NOW
        order(x,y){}}
    }

Finally we can now compute/calculate variable names. So instead of hardcoding the object keys, we can put forward any expression written with the bracket notation.

     const weekdays = ['Mo', 'Tue', Wed']

         const openingHours =
                [weekdays[0]]: {
                    open: 12,
                    close: 22;
                }
                [weekdays[1]]: {
                    open: 11,
                    close: 23,
                }
                [`day${2-5}`]: {
                    open: 'closed',
                    close: 'closed',
                }