# Closures

A closure is not a feature that is specifically used in Javascript, we do not create them manually. They simply arise in certain situations and we should know how to recognize them. This means we cannot access closed-over variables explicitly, because a closure is NOT a tangible Javascript object.

*Closures exist, because a function always has access to the variable environment(VE) of the execution context in which it was created, even after that execution context is no longer in the call stack. Concluding, a closure is the variable environment attached to the function, just as it was at the time and place the function was created.*

**Formal:** A closure is the closed-over variable environment of the execution context in which a function was created, even after that execution context is gone.

**Practical:** A closure gives a function access to all the variables of its parent function, even after that parent function has returned. The function keeps a reference to its outer scope, which preserves the scope chain throughout time. *Closures remember the outer function scope even after creation time.*

**Analogy:** A closure makes sure that a function does not lose connection to variables that existed at the functions's "birth place".

<img src="/images/closure_birth_place_analogy.png" width="300px">

**Informal:** A closure is like a backpack which a function carries around wherever it goes. This backpack has all the variables that were present in the environment in which the function was created.

<img src="/images/closure_backpack_analogy.png" width="230px">

----

### Practical Example:

```javascript
const secureBooking = function() {
    let passengerCount = 0;

    return functon() {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
};

const booker = secureBooking();
```
**Analysis of the processes in the Javascript engine:**

1. In this example our code is running in the global execution context. In there we currently only have the secureBooking function. We can now say that the global scope contains secureBooking.
2. When secureBooking is actually executed, a new execution context is put on top of the global exectuion context in the call stack. Remember: each exectuion context has its own variable environment, which includes all the local variables. In this case it only contains the passengerCount. This variable environment is also the scope of the function. Of course this variable environment also has access to all the variables from its parent scopes, because of lexical scoping.
3. In the next step a new function is returned, which is then stored in the booker variable. Now, the global context (scope and EC) also contains the booker variable.
4. Since the secureBooking function returns, its execution context pops off the call stack and disappears. The function has done its job and has now finished execution.

```javascript
booker() ==> // output: 1 passengers
booker() ==> // output: 2 passengers
booker() ==> // output: 3 passengers
```

5. Now we call the function three times and as a result we see, that the booker function was able to increase the passengerCount to 3. The question arises how this is possible? How can the booker function update the passengerCount variable, which is defined in the secureBooking function, which already has finished executing? This means the execution context is no longer on the call stack. But the inner function is still able to update that variable which already disappeared and should no longer exist.
6. The machanism which makes this possible is called a **closure**. Closures basically make a function remember the variables which existed at the functions "birth place". In this case we can see the secureBooking function as the "birth place" of the inner function.

![engine before closure happens](/images/closures_engine_before_closure_happens.png)

7. The picture above is the state inside the engine just before the closures happens. Now we are calling the booker function, which is located on the global scope.

![engine as closure happens](/images/closures_engine_as_closure_happens.png)

8. The first thing that happens, that a new exectuion context is created and put on top of the call stack. The variable environment of this context is empty, simply because there are no variables declared in this function. Regarding the scope chain, booker is simply a child scope of the global scope.

9. But how will the booker function access the passengerCount variable, since it's nowhere to be found in the scope chain or variable environment? The secret is, that any function always has access to the variable environment of the execution context, in which the function was created. In case of booker, it was "born" in the execution context of its parent function secureBooking.

![engine as closure happens](/images/closures_engine_as_closure_happens_02.png)

10. Therefore the booker function will get access to this variable environment which contained the passengerCount variable. This is how the function will be able to read and manipulate the passengerCount variable. **THIS CONNECTION IS CALLED A CLOSURE**.

11. We can say that the booker function closed over its parent scope or its parent variable environment. This also includes all function arguments(even though we do not have any in this example). This attached or closed-over variable environment stays with the function and is carred around by it forever.

![engine as closure happens](/images/closures_engine_as_closure_happens_03.png)

12. What happens now with execution of the booker function is, that the function attempts to increase the passengerCount. However, this variable is not in the curent scope. So Javascript will immediately look to the closure and can find the variable there. This is done **EVEN BEFORE** looking in the scope chain. If there was a global passengerCount variable, Javascript would still use the one in the closure.
**The closure as priority over the scope chain**.

----

**Tip:** We can check and see closures with <code>console.dir(booker)</code>, which lists, beneath other information, all the scopes that can be accessed by the booker function. But we cannot access those properties, which are wrapped in <code>[[]]</code> inside the <code>console.dir</code>, form our code.

----
### Change of closures

Closurs do not necessarily only happen when a function is returning a function. Closures can be changed as a function variable is reassigned. In this example we set declare f on the global scope. Then we assign f to a function inside g. So in this case f closes over the variable environment of g. After that we reassign another function to f inside the h function. After calling the h function the closure changes and now closes over the variable environment of the h function.

```javascript
let f;

const g = function(){
    const a = 23;
    f = function(){
        console.log(a * 2)
    }
};

const h = function(){
    const b =777;
    f = function(){
        console.log(b * 2)
    }
},

g();
f();    // output: 46;

//Re-assigning f function
h();
f();    // output: 1554;
```