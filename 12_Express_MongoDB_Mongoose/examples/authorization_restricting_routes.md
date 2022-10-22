# Authorization

After we implemented authentication, it is time to implement authorization. We want only certain users to interact with our database for exmaple, which is why we need to authorize, basically saying give them permission, to do so. In other words we want to verify if a certain user has the rights to interact with a certain resource.

For that we need to build another middleware function, this time for restricting certain routes, for example the deleteTours route. Inside the deleteTours route we first need to pass in our protect middleware function. This will always be the first step, because we always need to check if the administrator or user is actually logged in.
After that we call middleware named 'restrictTo' which takes the role of the user as an argument, for example 'admin'.

```js
.delete(protect, restrictTo('admin'), deleteTour);
```

We need to make sure that a role field is defined in our user schema.

```js
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  }
```

Usually it is not possible to pass in arguments to a middleware function. But in our case we really need to. Therefore we need to build a wrapper function which is going to return the actual middleware function. The wrapped middleware function now gets access to the roles, which we pass in as an array using the spread operator, even after the function returned. This is a good example of a closure.

Now we check if the roles array we pass in as an argument contains the role of the current user trying to access the restricted route. If not, then we want to throw an permission error (403). We get access to the user's role, because our protect middleware runs first, in which we save the current user to the req.user property, which we now can make use of.

Remember to include the to object we pass into create, when creating a new user during signup.

```js
const user = await User.create({
  name: req.body.name,
  email: req.body.email,
  password: req.body.password,
  passwordConfirm: req.body.passwordConfirm,
  role: req.body.role,
});
```
