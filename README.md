# User Management API

A RESTful API for managing user data with complete CRUD operations built with Node.js, Express, and MongoDB.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running
- npm package manager

### Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm init -y 
npm install express mongoose dotenv helmet express-rate-limit
```

3. Create a .env file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017/userdb 
PORT=5050
NODE_ENV=development
```

4. Start the server:
```bash
npm start
```

The server will start on port 5050 (or the port specified in your .env file).

## API Documentation

### 1. Create User
  Endpoint: `POST http://localhost:5050/api/createUser`

  Request Body:
  ```json
  {
    "name":"Ravi Teja",
    "email":"ravi@example.com",
    "age":25
  }
  ```
  Success Response (201):
  ```json
  {
    "status": "success",
    "message": "User registered successfully",
    "data": {
        "name": "Ravi Teja",
        "email": "ravi@example.com",
        "age": 25,
        "_id": "67dc0777d514a50e36516599",
        "createdAt": "2025-03-20T12:17:59.568Z",
        "updatedAt": "2025-03-20T12:17:59.568Z",
        "__v": 0
    }
  }
  ```

### 2. Get all Users
  Endpoint: `GET http://localhost:5050/api/users`

  Success Response (201):
  ```json
  {
    "status": "success",
    "data": [
        {
            "_id": "67dc0777d514a50e36516599",
            "name": "Ravi Teja",
            "email": "ravi@example.com",
            "age": 25,
            "createdAt": "2025-03-20T12:17:59.568Z",
            "updatedAt": "2025-03-20T12:17:59.568Z",
            "__v": 0
        }
    ]
  }
  ```

### 3. update User
  Endpoint: `PUT http://localhost:5050/api/users/:userID(67dc0777d514a50e36516599)`

  Request Body:
  ```json
  {
    "name":"Ravi Teja",
    "email":"ravi@example.com",
    "age":23
  }
  ```
  Success Response (201):
  ```json
  {
    "status": "success",
    "message": "User updated successfully",
    "data": {
        "_id": "67dc0777d514a50e36516599",
        "name": "Ravi Teja",
        "email": "ravi@example.com",
        "age": 23,
        "createdAt": "2025-03-20T12:17:59.568Z",
        "updatedAt": "2025-03-20T12:19:06.019Z",
        "__v": 0
    }
  }
  ```

### 4. Get user by using ID
  Endpoint: `GET http://localhost:5050/api/users/:userID(67dc0777d514a50e36516599)`

  Success Response (201):
  ```json
  {
    "status": "success",
    "data": {
        "_id": "67dc0777d514a50e36516599",
        "name": "Ravi Teja",
        "email": "ravi@example.com",
        "age": 23,
        "createdAt": "2025-03-20T12:17:59.568Z",
        "updatedAt": "2025-03-20T12:19:06.019Z",
        "__v": 0
    }
  }
  ```

### 5. Delete User
  Endpoint: `DELETE http://localhost:5050/api/users/:userID(67dc0777d514a50e36516599)`

  Success Response (201):
  ```json
  {
    "status": "success",
    "message": "User deleted successfully"
  }
  ```


## Error Handling

The API implements comprehensive error handling:
- 400: Bad Request (Invalid input, duplicate email)
- 404: Not Found (User doesn't exist)
- 429: Too Many Requests (Rate limit exceeded)
- 500: Internal Server Error

## Security Features

1. Rate Limiting
   - 100 requests per 15 minutes per IP

2. Security Headers (via Helmet)
   - XSS Protection (Enabled explicitly)
   - Prevention of clickjacking (Frameguard set to 'deny')
   - Strict Transport Security (HSTS with maxAge of 1 year and subdomains included)

3. Input Validation
   - Email format validation
   - Required fields validation
   - Age range validation

