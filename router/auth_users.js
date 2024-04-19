const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
  let userwithname = users.filter(user => user.username === username);
  if (userwithname.length > 0) return true;
  else return false;
}

const authenticatedUser = (username, password) => {//return boolean
  let validUsers = users.filter(user => user.username === username && user.password === password);
  if (validUsers.length > 0) return true;
  else throw new Error(JSON.stringify({
    status: 401,
    error: "Error 401: User not authenticated!",
    message: "Invalid credentials !!!"
  }))
}

//only registered users can login
regd_users.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    await authenticatedUser(username, password) // check if valid credentials

    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = { accessToken, username }
    res.status(200).send("user successfully logged in");

  } catch (error) {
    const parsedError = JSON.parse(error.message);
    res.status(parsedError.status).json({ message: parsedError.error + " " + parsedError.message });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const user = req.session.authorization.username;
    if (books[isbn]) {
      let review = req.body.review;
      if (review)
        books[isbn].reviews[user] = review;
    }
    res.send(`${user} has reviewed book with isbn:${isbn}.`);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book data." });
  }
});

regd_users.delete("/auth/review/:isbn", async (req, res) => {
  try {
    const user = req.session.authorization['username'];
    const isbn = req.params.isbn;
    if (books[isbn]) {
      delete books[isbn].reviews[user];
    }
    res.send(`review of ${user} in book with ISBN:${isbn} is deleted`);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book data." });
  }
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
