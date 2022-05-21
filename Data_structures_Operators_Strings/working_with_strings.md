# Working with strings

Whenever we call a method on a string, Javascript will automatically convert that string primitve to a string-object with the same content. On this newly created object the string methods can be called. This process is called boxing. After process is done, the object will be converted back to a regular string primitve. Every string method returns a string primitve, even if called on a string-object.

All the following methods return a new string, because they do not mutate the original string, but return a substring. To be able to use a substring, we have to store it in a variable first.

    const airline = 'TAP Air Portugal';
    const plane = 'A320';

1. Get the index of a string just like in an array:

        plane[0];   ==> output 'A'
        or directly on a string
        'Max'[0]    ==> output 'M'

2. Get the length of a string:

        airline.length; ==> output: 16
        or directly on a string
        'Max'.length    ==> output 3

#### Index methods:

3. indexOf(): Get the position of a certain letter in a string (only first occurence):

        airline.indexOf('r')    ==> output: 6

4. lastIndexOf() : Same as indexOf, but counts last occurence

        airline.lastIndexOf('r')    ==> output: 10

#### Returning a new string:

5. slice(): Needs indexes as arguments, so it can be often useful to combine the slice method with the index methods:

        Extracting the first word.
        airline.slice(0, airline.indexOf(' '))  ==> output: 'TAP'

        Extracting the last word (+1 for getting rid of space)
        airline.slice(airline.lastIndexOf(' ') + 1)  ==> output: 'Portugal'


6. toLowerCase(): Transform all the characters to lower case
    <br>
7. toUpperCase(): Transform all the characters to upper case
    <br>
8. trim(): trims all the white space from a string before and after the string

        '   Hello world \n'.trim()  ==> output: 'Hello world'

    - trimStart(): trims whitespace only from the start (alias is trimLeft())
    - trimEnd(): trims whitespace only from the end (alias is trimRight())  

9. replace(): Replacing a part of a string, can be single characters or entire words. replace() only replaces the first occurence:

        const priceGB = '288,97£';
        const priceUS = priceGB.replace('£', '$').replace(',', '.'); ==> output: '288.97$'

    - replaceAll(): replaces all the occurences in the string with the given input
    - using regular expressions:
    We can use regular expressions to target every occurence in a string, which shall be replaced:

            const announcement ='All passengers come to boarding door 23. Boarding door 23!';

            announcement.replaceAll('door', 'gate')
            //OR
            announcement.replace(/door/g, 'gate');

10. padStart(): adds a string to the start of string so the specified total length is achieved

        'Go to gate 23!'.padStart(25, '+') => output: '+++++++++++Go to gate 23!'

11. padEnd(): same as padStarts() but appends the input to the end of the string

12. repeat(): This method returns a string repeated by times of the number input:

        const message = 'Bad weather...All Flights delayed... ';
        message.repeat(5)

#### Returning Booleans:

13. includes(): returns a boolean if a string contains the passed in string
    <br>
14. startsWith(): checks if a string starts with a certain phrase or character
    <br>
15. endsWith(): checks if a string ends with a certain phrase or character
    <br>

#### Split and Join:

16. split(): lets us split a string into parts, based on a divider string and returns an array

        'Herr+Max+Sommerfeld'.split('+')    ==> output: ['Herr', 'Max', 'Sommerfeld']

17. join(): lets us repack an array of strings back into one string:

        ['Herr', 'Max', 'Sommerfeld'].join(' ')    ==> output: 'Herr Max Sommerfeld'

#### Use cases:

**Example 1:** Capitalizing every word in the string passed into the function

    function capitalizeName(name) {
        const words = name.split(' ');
        const nameUpper = [];

        for(const word of words) {
            // nameUpper.push(word[0].toUpperCase() + word.slice(1));

            nameUpper.push(word.replace(word[0], word[0].toUpperCase()));
        }
        console.log(nameUpper.join(' '));
    }

    capitalizeName('jessica ann smith davis');

**Example 2:** In this example we want to hide the credit card numbers, except the four last digits. First we coerce the number to a string by adding an empty string to the number. Then we retrieve the last for digits with slice and a negativ index. Finally we prepend the * sign to the sliced digits. We pass in the length of the original string as the first argument of padStart, so the masked string has the same length as the original one.

    function maskCreditCard(number) {
        const str = number + '';
        const last = str.slice(-4);
        return last.padStart(str.length, '*')
    }

    console.log(maskCreditCard(12345678));