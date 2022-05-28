# Javascript Behind The Scenes

## Overview


1. **High-level:**
   This means, that we do not have to manage the computer's resources, e.g memory or CPU, manually. So called abstractions help us to reduce complexity and hides technical complexity behind a simpler interface.
   This makes the language more dev-friendly, but also sacrifices simplification for reduced speed.
   <br>
2. **Garbage-collected:**
   One of the most important tools that takes over the task of memory management is garbage-collection. It is an algorithm inside the Javascript engines, that removes not used objects and keeps everything nice and tidy. 💪
   <br>
3. **Interpreted or just-in-time compiled (JIT) language:**
   Every programm needs to be compiled to machine code, in order to be executed by the computer. In Javascript this happens in the Javascript engine.
   <br>
4. **Multi-paradigm:**
   A paradigm is a distinct set of concept or thought patterns. Multi-paradigm in the case of Javascript means, that there are multiple approaches on how to write your code and define your own code style.
   Three popular paradigms are:
   <br>
   1. **Procedural**
   => what we've been doing so far: linear structure of code and functions in between
   2. **Object-oriented programming (OOP)**
   3. **Functional Programming (FP)**
      <br>
5. **Prototype-based object oriented:**
   Almost everyting in Javascript is an object, except for primitive values. Arrays for example are objects which we can use pre-built methods on. This is because of prototypal inheritance. We create arrays from a array-blueprint or template, which is called the prototype, which includes all the pre-built functionalities, that then can be inherited by our array. This is very oversimplified.
   <br>
6. **First class functions:**
   This means that functions can be treated just like variables. We can put functions into functions and return functions from other functions.
   <br>
7. **Dynamic:**
   Dynamic in this case means dynamically typed. We don't manually assign data-types to variables in Javascript, unlike many other programming languages. Also the data-type of variables can easily be changed, when we reassign those variables, which basically is what dynamically-typed means.
   <br>
8. **Single-threaded:**
   Javscript only runs in a single CPU-thread, so it only can do one thing at a time. The **concurrency model** defines how the Javascript engines handles multiple tasks happening at the same time. To achieve **non-blocking behaviour** during long-running tasks for example, the concurrency model dictates putting this long-running tasks inside of an **event loop**, executing them in the 'background' and putting them back in the main thread once they are finished. This is a huge oversimplifcation.

## Javascript engine and runtime

#### Javascript engine:

The Javascript-engine is a program, that executes javascript code. Every browser has its own engine, but the most well known is Google's V8-engine, which also powers node.js.

Every Javscript-engine contains a **call stack** and a **heap**.
A **call stack** is where our code is exectued, using something called execution contexts.
The **heap** is an unstructured memory pool, that stores all the objects the application needs.

#### Compilation vs. interpretation vs. JIT-compilation:

1. **Compilation**:
   - Includes two steps.
   - Converts entire code into machine code at once and writes it to a binary file.
   - This file can be executed by the computer at any time.
2. **Interpretation**:
   - An interpreter runs through the source code and executes it line by line.
   - This process involves only one step.
   - The compilation happens right before its execution.
   - Javscript used to be a purely interpreted language. Interpreted languages have the disadvantage, that they are much slower than compiled languages.
3. **JIT-compilation** (just-in-time-compilation):
   - Modern Javascrip-engines use a mix of compilation and interpretation.
   - This means, that the entire code is converted to machine code at once and then executed immediately.
   - Like in regular compilation, there are two steps involved, but there is no binary file created.
   - This results in a great advantage in speed over the interpreted method.

#### JIT-compilation in more detail but still oversimplified:

1. **Parsing**: The first step of modern javascript compilation, as the code enters the engine, is called parsing.
   This means reading the code. During the process the code is parsed into a data structure called 'Abstract Syntax Tree" (AST), which is an complete representation of our code inside of the Javascript-engine. Each line is splitted into parts, which contain all the information, that is important to the language and then saved in the tree in a structured way. This step also checks if there are any syntax errors. The resulting tree will later be used to create the machine code.
   **IMPORTANT: The AST has nothing to do with the DOM-Tree!**
2. **Compilation**: The next step is the compilation, in which all the information from the AST is used to create the machine code.
3. **Execution**: Immediatly after the compilation the code is executed.

A special characteristic of JIT-compilation is, that Javascript at first generates an unoptimized machine code to start the execution as fast as possible. During execution, this code is then repeatedly optimized and recompiled.

All the above steps happen in abstractions, meaning they run in special threads we cannot access from our code, while our code is exectued in the call stack.

#### Javascript runtime:

The Javascript runtime is the environment in which our code runs, for example our browser. This browser includes:
1. **Javascript Engine**
2. **Web-API's**: DOM, Timers, Fetch API, etc...
   Web-API's are functionalities provided to the engine, but are not part of the Javascript-language.
   Web-API's are only accessible on the *window* object.
3. **Callback queue**: click, timer, data, ...
   For example we attach event handler functions to DOM-elements like a button to react to certain events.
   These event-handler-functions are also called callback-functions.
   As the event (click) happens, the event-handler-function will be called. After that the event-handler function is put in the callback queue. When the call stack is empty, the event-handler function is passed to the stack, so that it can be executed. This happens through the **event loop**.
   Short: The event loop takes event-handler functions from the callback queue and puts them in the call stack.
   The event loop is essential for Javascripts's non-blocking concurrency model!

Of course, Javascript can also run outside of the browser environment, for example in **node.js**.
It is pretty similar, but in node.js we do not have access to the functionalites of the Web-API'S, because they are provided by the browser. Instead we have access to something called **C++ bindings** and **thread pool**.

