# Parsing Cookies

In our project we are storing the JWT tokens in a cookie and sending it to the browser. This means the browser automatically sends the cookie object with every request. In order to check if this object contains a valid token, we need to parse the cookie. For that, we can install a npm package called <code>cookie-parser</code>. First we need to simply call it in the global middleware.

```js
const cookieParser = require("cookie-parser");

app.use(cookieParser());
```

Now we need to configure our protect controller function. Until now we only checked if the headers of the request existed and contained a Bearer token. Now we also want to check for valid tokens in the cookies object in the request.

```js
if (
  req.headers.authorization &&
  req.headers.authorization.startsWith("Bearer")
) {
  token = req.headers.authorization.split(" ")[1];
} else if (req.cookies.jwt) {
  token = req.cookies.jwt;
}
```
