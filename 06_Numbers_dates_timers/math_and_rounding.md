# Math and Rounding

In Javascript we get access to a lot of different calculation options via the Math namespace.

1. Math.sqrt()  =>  calculate the sqare root of a number
                alternatively we can use x ** (1 / 2)
<br>

2. Math.max()   =>  retrieve the maximum value from a collection of values
                Math.max does type coercion, but not parsing
<br>

3. Math.min()   =>  same as Math.max but with minimum values
<br>

4. Math.random()=> generates a random number between 0 and 1

    Example for a general random number generator function:
    ```js
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min) +1) + min;
    ```
<br>

5. Math.trunc() => cut off the decimal part of a number
<br>

6. Math.round() => round to the nearest integer
<br>

7. Math.ceil() => round number up to nearest integer
<br>

8. Math.floor() => round down to nearest integer
<br>

9. Number.toFixed() => takes one argument, which is the decimal count to which the number should be rounded; RETURNS A STRING

