# Maps

A map is a new data structure, that we can use to map values to keys, similar to objects. The big difference to objects is, that the map keys can have any type instead of only strings like in objects. This means we can even have arrays, objects or ohter maps as a key. A simple way for using maps is to create an empty maps first and then add the key-value pairs with the set method, which adds the pairs to the map.

    const newMap = new Map();
    //newMap.set(key, value)

    newMap.set('name', 'Max')
    newMap.set(true, 'isAdult')

    console.log(newMap) => output: Map(2){'name'=>'Max', true=>'isAdult'}

The set method not only adds something to the map, but also returns the updated map. This means we can chain the set method

    newMap.set('hobbies', ['coding','music']).set('age', 30);

In order to read data from a map, we use the get method:

    newMap.get('name')  ==> output: 'Max'
    newMap.get(true)  ==> output: 'isAdult'

We can also use the has method to check if a map contains a certain property.

    newMap.has('name')  ==> true

We can use the delete method to delete properties based on their key:

    newMap.delete('name');

Just like sets, maps also have the size property, to retrieve the length of a map:

    newMap.size

To remove all the elements from a map, we can use clear:

    newMap.clear()

**Example:** In this example we have a map containing opening hours for a restaurant. We can now take advantage of the fact that we can pass in any data type as a key in a map. So we compare a given time inside of the get method to the open and close values and get either true or false. This will then retrieve the value, that is paired with the boolean key inside of the map. In this case we will get a string that tells the user if the restaurant is currently open or closed.

    const rest = new Map();

    rest
        .set('open', 11)
        .set('close', 23)
        .set(true, 'We are open')
        .set(false, 'We are closes')

    const time = 21;

    rest.get(time > rest.get('open') && time < rest.get('closed'))

**Example: Set arrays or objects as map keys**

    rest.set([1,2], 'Test');

    rest.get([1,2]) ==> undefined

This is not working, because the two arrays are not the same object in the heap. In order to refer to the same object as a key, we need to do something like this:

    const arr = [1,2];
    rest.set(arr, 'Test');

    rest.get(arr) => 'Test'

## Convert objects to maps:

Another way for creating maps is to set an array inside the parantheses of the map constructor, and add key-value pairs in their own arrays. When programmatically adding new properties to a map, though, the set method is preferred.

    const question = new Map([
        ['question', 'what is best programming language?'],
        [1, 'C'],
        [2, 'java'],
        [3, 'javascript'],
        ['correct', 3],
        [true, 'Correct:)!'],
        [false, 'Try again!']
    ]);

The above structure represents the structure we can get from calling the Object.entries() method. This means, that there is an easy way for converting objects to maps.

    const hoursMap = new Map(Object.entries(openingHours));

## Convert a map to an array( Object.entries() )

If we want to convert a map to an array, containing key-value pairs as arrays, we can simply unpack the map with the spread operator.

    const arrFromMap = [...question]

## Maps: Iteration

Maps are also iterables, so the for and for...of loop are also available.

    console.log(question.get('question'));

    for(const [key, value] of question) {
        if(typeof key === 'number') {
            console.log(`Answer ${key}: ${value}`);
        }
    }

    const answer = Number(prompt('Your answer'));

Again, we can use the power of boolean values as keys. In this case we set a comparison between the correct answer and the returned value of the user prompt. If this returns true the value which belongs to the true keys will be displayed, otherwise we get the respective value of the false key.

    console.log(question.get(question.get('correct') === answer)) 

## Map methods:

Just like with objects, we can use the same methods we use for objects to retrieve keys, values or entries. But the map methods return a map iterator, so they are best packed into an array, again using the spread operator.

    console.log([...map)]); // THE SAME AS map.entries()

    console.log([...map.keys()]);
    console.log([...map.values()]);