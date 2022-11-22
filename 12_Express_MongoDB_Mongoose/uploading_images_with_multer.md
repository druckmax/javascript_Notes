# Uploading Images with Multer

Multer is a very popular middleware to handle multi part form data, that allows us to upload files from a form. In this example we will allow the users to update and upload their own photos on the /updateMe route.

First we install the multer package and define a variable called upload, which wil call the multer function. We define an options object, which takes the destination where the uploaded images should be stored. When omitting the destination object, multer will automatically store the data in memory, which we do not want in this case.

In the next step we need to create a middleware function that we can put into the /updateMe route. So before our updateMe controller function we can pass in <code>upload.single('photo')</code>, 'photo' being the field in the form that is going to handle the uploading of the image. The .single method is called because we only need to upload one file at a time. The middleware will now copy the file to the destination that we specified. Also this middleware will put information about the file on the request object, which can be accessed via <code>req.file</code>.

One important note is that we cannot access the information about the file on <code>req.body</code>, because our body parser is not able to handle files. So our uploaded images cannot be found anywhere in the body of the request, which is the main reason why we need to use a package like multer.

```js
const upload = multer({ dest: "public/img/users" });

router.route("/updateMe").patch(upload.single("photo"), updateMe);
```

## Using multer storage

In order to further configure multer to our needs, we create a multer storage and a multer filter.

For disk storage we call <code>multer.diskStorage</code> and define a couple of options. The first one is the destination, which instead of a simple path takes a callback function, which has access to the current request and file and to another callback function. This last callback function can be compared to the next function in Express. But to avoid confusion with Express middleware, a common convention is to call it <code>cb</code>.

To define the destination we need to call that callback function. The first argument represents an error, which we can set to null, so nothing happens when an error occurs. The next argument will take the actual destination, where we want to store our images.

Next we want to give our image a unique filename, which is why we set the filename property. This is important so that we make sure that we do not create two files with the same name. Therefore we a string which consists of user, user ID, current timestamp and the extension.

First we need to extract the information about the file from the uploaded file. We can find the extension of the file in the mimetype property, which looks like <code>'mime/jpeg'</code>. This is why we extract the extension by simply the string by the dash and selecting the second item of the returned array.

```js
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/users");
  },
  filename: (req, file, cb) => {
    // user-userID-timestamp-extension
    const extension = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${extension}`);
  },
});
```

## Using multer filter

The main goal of this function is to test whether the uploaded file is an image. If it is, then we pass in true to the nested callback function of the filter function. If not we can create a new App Error in the first argument of the filter function and set false as a second argument.

Of course you can upload any type of file with multer, in this example we are only intereated in images.

```js
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Please upload only images", 400), false);
  }
};
```

When using multer storage and filter, we need to change our upload variable and set storage to our previously defined multerStorage and also set the fileFilter property, which we point to our multer filter.

```js
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");
```

## Resizing images

Everywhere in our user interface we assume that the uploaded images are squares, so we can display them like circles. In the real world users are rarely going to updload images which have a square form. This is why we need to resize the images and make them to have square shape.

For that we implement yet another middleware which will take care of the actual image processing and will be placed after the image uploading middleware in the /updateMe route.

This means that at this point we already have the file property on our request if there was a valid image upload. If not, we need to create a guard close in our function and simply go the next middleware in the stack.

For the actual resizing we use a package called sharp, which is a popular image processing library for NodeJS and really shines through resizing images in a simple way. Now, when doing image processing like this directly after uploading the file, it is always best to not save the file to disk immediately, but to store it in memory first before saving the final result. For that we need to get rid of our <code>multer.diskStorage</code> function and create a <code>multer.memoryStorage</code> function. This way the image will be stored as a buffer in memory and will be accessible via <code>req.file.buffer</code>.

```js
const multerStorage = multer.memoryStorage();
```

In our middleware function we can call the sharp function, which takes the previously mentioned buffer via <code>req.file.buffer</code> and will create an object onto which we can chain other methods. The first one is the <code>.resize</code> method, which will take the width and height the image should be resized to. This will crop the image so that it cover the entire 500x500 square, we set for our speciic case. The resize method offers an options object, in which we can define the way the image should be resized. For example the default behaviour for the fit option is 'crop', but we could define other options like 'filled' or 'contain'.

In the next step we want to always convert all uploaded images to .jpeg. For that we use the <code>.toFormat</code> method and set it to jpeg.

In order to compress the file and slighty reduce the quality for storage saving purposes, we can now call the <code>.jpeg</code> method and set an object with the quality property set to 90, which stands for an image quality of 90%.

As a last step we now want to write our processed file to disk and for that we use the <code>.toFile</code> method, which will need the entire path to the file. We also need to manually set the file name, because when an image is saved into memory as a buffer, the filename will not get set. This is why we save our filename we constructed in the previous multerStorage to the request under <code>req.file.filename</code>. Note that we can set the extension in the filename to simply .jpeg, because we can be sure that the file will always be in the jpeg format, because of the <code>.toFormat</code> method.

```js
exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/users/${req.file.filename}`);

  next();
};
```
