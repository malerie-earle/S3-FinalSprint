Project Title: Full Stack Web Application

Description: This project is a full-stack web application built with Node.js, Express.js, PostgreSQL, MongoDB, and EJS for server-side rendering. It implements various features including user authentication, customer management, search functionality across multiple databases, and password hashing for security.

Features:

User Authentication:

Users can sign up for an account.
Existing users can log in securely.
Session management is implemented using cookies.

Customer Management:

Users can view a list of all customers.
Customers can be searched, added, edited, and deleted.
Detailed customer information including accounts and addresses is displayed.

Search Functionality:

Users can search for products, customers, or other entities.
Search queries are executed in both PostgreSQL and MongoDB databases.
Results are aggregated and displayed to the user.

Password Hashing:

User passwords are securely hashed using bcrypt.
Hashed passwords are stored in the database for security.
Project Structure:

app.js: Entry point of the application, sets up Express.js server and middleware.
routes/: Contains route handlers for different endpoints:
index.js: Handles routes for the home page, login, signup, and other static pages.
customers.js: Manages CRUD operations for customers and user authentication.
search.js: Implements search functionality across databases.
services/: Contains business logic and database access layers:
pg.customers.dal.js: Data access layer for PostgreSQL database related to customers.
m.auth_db.js: MongoDB database connection and schema definition.
searchLogic.js: Functions for searching in PostgreSQL and MongoDB.
views/: EJS templates for rendering HTML pages:
Includes templates for login, signup, customer management, search results, etc.
public/: Static assets such as CSS, images, and client-side JavaScript files.
Setup Instructions:

Clone the repository: git clone <https://github.com/malerie-earle/S3-FinalSprint.git>
Install dependencies: npm install
Set up environment variables:
Define the MDBATLAS environment variable with your MongoDB Atlas connection string.
Set other necessary environment variables such as database names and collections.
Start the server: npm start
Access the application in your browser at http://localhost:3000
Testing:

Unit tests for various components such as route handlers, database functions, and search logic can be found in the tests/ directory.
Run tests using the command: npm test
Contributing:

Contributions are welcome! Fork the repository, make changes, and submit a pull request.
License: This project is licensed under the [Creative Commons].

Authors: Malerie Earle and Janeil Carroll