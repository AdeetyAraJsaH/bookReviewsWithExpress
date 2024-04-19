const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/api/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }))

app.use("/customer/auth", async function auth(req, res, next) {
  try {
    if (req.session.authorization) {
      token = req.session.authorization['accessToken'];
      jwt.verify(token, "access", (err, user) => {
        if (!err) {
          console.log(user);
          req.user = user;
          next();
        }
        else {
          res.status(403).json({ message: "User not authenticated" })
        }
      });
    }
  } catch (error) {
    res.status(403).json({ message: "User not logged in" })
  }


});

const PORT = process.env.PORT || 3000;

app.use("/api/customer", customer_routes);
app.use("/api", genl_routes);

app.listen(PORT, () => console.log(`Server is running at PORT:${PORT}`));
