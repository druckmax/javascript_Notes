# Default parameters

Setting default parameters can be useful, if we do not know whether an argument will be passed into a function or not. Before ES6 we used the short circuiting of the logical operators to set default parameters.

    function createBooking (flight, passengers, price) {
        passengers = passengers || 1;
        price = price || 199;
        ...
    }

Since ES6 we can do this in a more concise way by setting the default value directly in the argument of the function:

    function createBooking (flight, passengers = 1, price = 199 ) {}

We can set any expression as a default value, even targeting other arguments. It is important to note that Javascript processes the arguments in order, so we cannot target a following argument before it is declared in the function:

        function createBooking (flight, passengers = 1; price = 199 * passengers) {}
        //WORKING

        function createBooking (flight, price = 199 * passengers, passengers = 1) {}
        //NOT WORKING

Of course the defaults will be overwritten, when a respective value is passed into the function. But we cannot simpy skip an argument. In this example we want to leave the value of passengers as the default value but want to specify the price:

    createBooking('LH123', 1000)    ==> not working! Price will be set to default

    createBooking('LH123',, 1000)    ==> Syntax error!

But we can set the argument we want to skip as undefined, so the function will take over the default value.

    createBooking('LH123', undefined, 1000)    ==> WORKS!

