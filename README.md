# Book Reviews Backend API

This project provides a backend API for managing book reviews. Users can register, log in, and perform various actions based on their roles.

## Features

1. **Authentication and Authorization**:
    - Users can register with their email and password.
    - Upon successful registration, a JWT token is provided for subsequent authentication.
    - Only authorized users (with valid tokens) can edit or update and delete book reviews.

2. **Endpoints**:
    - `/api/register` (POST): Register a new user.
    - `/api/customer/login` (POST): Log in with email and password to obtain a JWT token.
    - `/api` (GET): Get a list of all books (accessible to all users).
    - `/api/:isbn` (GET): Get details of a specific book by ISBN (accessible to all users).
    - `/api/reviews/:isbn` (GET): Get reviews of a book with isbn(accessible to all users).
    - `/api/customer/auth/review/:isbn` (PUT): Update a review (only authorized users).
    - `/api/customer/auth/review/:isbn` (DELETE): Delete a review (only authorized users).

3. **Middleware**:
    - `authMiddleware`: Validates JWT token and sets `req.user` if valid.
    - `authorize`: Checks if the user is authorized to edit reviews.

## Setup

1. Clone this repository.
2. Install dependencies: `npm install`.
3. Set up your environment variables (e.g., JWT secret).
4. Run the server: `npm start`.

## Usage

1. Register a new user using `/api/register`.
2. Log in with the registered credentials using `/api/customer/login`.
3. Use the obtained JWT token for subsequent requests.
4. Access book details using `/api` and `/api/isbn/:isbn`.
5. View reviews using `/api/review/:isbn`.
6. Authorized users can update reviews using `/api/customer/auth/review/:isbn`.

## Security Considerations

1. **Hash Passwords**: Store hashed passwords in the database.
2. **JWT Secret**: Keep the JWT secret secure and never expose it publicly.
3. **Rate Limiting**: Implement rate limiting to prevent abuse.
4. **Validation**: Validate user input to prevent SQL injection and other attacks.


# Happy coding! 🚀