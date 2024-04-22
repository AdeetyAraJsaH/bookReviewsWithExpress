// const express = require('express');
import {Router} from 'express'
// let books = require("./booksdb.js");
import books from './booksdb.js';
// let isValid = require("./auth_users.js").isValid;
import { isValid } from './auth_users.js';
// let users = require("./auth_users.js").users;
import { users } from './auth_users.js';

export const public_users =Router();

async function getBooksByAuthor(authorName) {// use async-await
  const filteredBooks = {};
  for (const key in books) {
    if (books[key].author === authorName) {
      filteredBooks[key] = books[key];
    }
  }
  return filteredBooks;
}

async function getBooksByTitle(title) {// use async-await
  const filteredBooks = {};
  for (const key in books) {
    if (books[key].title === title) {
      filteredBooks[key] = books[key];
    }
  }
  return filteredBooks;
}

public_users.post("/register", async (req, res) => {// use async-await
  try {
    
    const username = req.body.username;
    const password = req.body.password;
    // console.log(`got ${username} and ${password}`)

    if (username && password) {
      if (!isValid(username)) {
        users.push({ "username": username, "password": password })
        return res.status(200).json({ message: "User successfully registered." })
      } else {
        return res.status(404).json({ message: "User already exists!" })
      }
    } else {
      throw new Error("Oops! Something went wrong. Please check your input.");
    }
  } catch (error) {
    res.status(404).send({ message: `Unable to register !!!`, error: `${error.message}` });
  }

});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {// use async-await
  try {
    res.status(200).send(JSON.stringify(books));
  } catch (error) {
    res.status(500).json({ message: "Error fetching book data." });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) { // use async-await
  try {
    const isbn = req.params.isbn;
    res.status(200).send(books[isbn]);

  } catch (error) {
    res.status(500).json({ message: "Error fetching book data." });
  }
});

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {// use async-await
  try {
    const specifiedAuthor = req.params.author;
    const booksByAuthor = await getBooksByAuthor(specifiedAuthor);
    if (booksByAuthor) {
      res.status(200).send(JSON.stringify(booksByAuthor));
    } else {
      res.status(200).send(JSON.stringify({}));
    }

  } catch (error) {
    res.status(500).json({ message: "Error fetching book data." });
  }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {// use async-await
  try {
    const specifiedTitle = req.params.title;
    const booksByTitle = await getBooksByTitle(specifiedTitle);
    if (booksByTitle) {
      res.status(200).send(JSON.stringify(booksByTitle));
    } else {
      res.status(200).send(JSON.stringify({}));
    }

  } catch (error) {
    res.status(500).json({ message: "Error fetching book data." });
  }
});

//  Get book review
public_users.get('/review/:isbn', async function (req, res) {// use async-await
  try {
    const isbn = req.params.isbn;
    if (books[isbn])
      res.status(200).send(JSON.stringify(books[isbn].review));
    else
      res.status(208).json({ message: "There is no book with specified ISBN " })
  } catch (error) {
    res.status(500).json({ message: "Error fetching book data." });
  }
});

// export default public_users;
