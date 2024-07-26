# Welcome! 
## Content Management APP

## Technologies Used
- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing


## Documentation with Swagger
Swagger documentation is available for the API. Follow these steps to run the server and access the documentation:


## Clone this repository.
- Install dependencies using npm install.

- Set up your environment variables in a .env file.
(
    - URL=mongodb://127.0.0.1:27017/database
    - KEY=jfoejg3489843jlfje
    - NODE_ENV=dev
    - SEED_DATABASE=true
)

- Start the server using npm run server.

- Sample Data will be automatically inserted into database when running the server. (default password : password)

- You should set SEED_DATABASE to false in .env file after running the server

- Access Swagger documentation at http://localhost:8080/docs.


## Authentication and Authorization
- Users can register and login to access the content management and rating system functionalities. 
- JWT tokens are used for authentication, and bcrypt is employed to hash passwords before storing them in the database.

## User Routes

Base Route: /users

- POST /register: Register a new user.

- POST /login: Login a user.


## Content Management Routes
Base Route: /contents

- GET /: Get a list of all contents.

- POST /add: Add a new content. Requires authorization.

- DELETE /:id: Delete a content by ID. Requires authentication and authorization.

- PUT /:id: Update a content by ID. Requires authentication and authorization.


## Rating System Routes
Base Route: /rates

- GET /content/:contentId: Get a list of rates for a specific content. Requires authorization.

- GET /user/:userId: Get a list of rates for a specific user. Requires authorization.

- POST /add: Add a new rate. Requires authorization.

- DELETE /:id: Delete a rate by ID. Requires authentication and authorization.

- PUT /:id: Update a rate by ID. Requires authentication and authorization.


## User Endpoints
Register a New User

- POST /users/register

- Register a new user by providing a name, email, and password in the request body.


Login User

- POST /users/login

- Login a registered user by providing their email and password in the request body.


## Content Endpoints
Get All Contents

- GET /contents

- Retrieve a list of all contents.

Add a New Content

- POST /contents/add

- Add a new content by providing the content details in the request body. Authentication is required.

Delete a Content

- DELETE /contents/delete/:id

- Delete a content by its ID. Requires authentication and authorization. Only the user who added the content can perform this action.

Update a Content

- PATCH /contents/update/:id

- Update a content by its ID. Requires authentication and authorization. Only the user who added the content can perform this action.


## Rating Endpoints
Get All Rates for a specific content

- GET /rates/content/:contentId

- Retrieve a list of all rates for a specific content. Requires authentication.

Get All Rates for a specific user

- GET /rates/user/:userId

- Retrieve a list of all rates for a specific user. Requires authentication.

Add a Rate

- POST /rates/add

- Add a rate by providing the content ID in the request body. Authentication is required.

Delete a Rate

- DELETE /rates/delete/:id

- Delete a rate by its ID. Requires authentication and authorization. Only the user who added the rate can perform this action.

Update a Rate

- PATCH /rates/update/:id

- Update a rate by its ID. Requires authentication and authorization. Only the user who added the content can perform this action.


## Ivan Petkovski

#
