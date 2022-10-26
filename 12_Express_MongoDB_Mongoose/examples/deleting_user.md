# Deleting a User

We want to implement an functionality that allows the user to delete his/her account from our application. But in reality we do not want to delete the account just yet, in case he/she wants to reactivate it. Therefore we can simply set a new field called 'active' on our userSchema and set it to false, if a user wants to delete/deactivate the account.

```js
// On userSchema
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
//

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
```

When implementing this do not forget to add a query middleware that filters out all the in-active users, if you wish to. For this we can simply add a pre hook that gets triggered on every event starting with 'find' (find, findOne, findById, etc.) and filters out the in-active accounts. Note that we need to add <code>{$ne: false}</code> to account for user documents in our collection that do might have the active field yet. If we simply search for <code>active: true</code> we would get only the users for which the active field is actively set to true.

```js
userSchema.pre(/^find/, function (next) {
  // this points to current query
  this.find({ active: { $ne: false } });
  next();
});
```
